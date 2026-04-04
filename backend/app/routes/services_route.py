# backend/app/routes/services_route.py

"""
FILE: backend/app/routes/services_route.py
DESCRIPTION: API Endpoints protegidos para la gestion de sitios.
             Usa inyeccion de dependencias para asegurar que solo el Admin
             pueda modificar la base de datos.
"""

import httpx
import asyncio
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.site_model import MonitoredSite
from app.schemas.site_schema import SiteCreate, SiteResponse
from app.dependencies.auth_dep import get_current_admin

router = APIRouter(prefix="/services", tags=["Web Monitor"])

# --- Logica de Verificacion Asincrona ---

async def check_site_health(url: str):
    """Realiza una peticion GET y mide el tiempo de respuesta."""
    async with httpx.AsyncClient() as client:
        try:
            start_time = asyncio.get_event_loop().time()
            headers = {"User-Agent": "NibalinkMonitor/1.0"}
            response = await client.get(url, timeout=3.0, follow_redirects=True, headers=headers)
            end_time = asyncio.get_event_loop().time()
            
            if response.status_code < 400:
                return "online", round(end_time - start_time, 3)
            return "offline", 0.0
        except Exception:
            return "offline", 0.0

# --- Endpoints Protegidos (Solo Admin) ---

@router.post("/", response_model=SiteResponse)
def create_site(
    site: SiteCreate, 
    db: Session = Depends(get_db), 
    admin_email: str = Depends(get_current_admin)
):
    """Agrega un nuevo sitio. Requiere Token JWT."""
    existing = db.query(MonitoredSite).filter(MonitoredSite.url == site.url).first()
    if existing:
        raise HTTPException(status_code=400, detail="La URL ya esta registrada")
    
    db_site = MonitoredSite(**site.model_dump())
    db.add(db_site)
    db.commit()
    db.refresh(db_site)
    return db_site

@router.delete("/{site_id}")
def delete_site(
    site_id: int, 
    db: Session = Depends(get_db), 
    admin_email: str = Depends(get_current_admin)
):
    """Elimina un sitio. Requiere Token JWT."""
    db_site = db.query(MonitoredSite).filter(MonitoredSite.id_site == site_id).first()
    if not db_site:
        raise HTTPException(status_code=404, detail="Sitio no encontrado")
    
    db.delete(db_site)
    db.commit()
    return {"detail": f"Sitio {site_id} eliminado correctamente"}

# --- Endpoints Publicos (Cualquiera puede verlos) ---

@router.get("/status")
async def get_web_status(db: Session = Depends(get_db)):
    """Trae los sitios de la DB y chequea su estado en tiempo real."""
    sites = db.query(MonitoredSite).filter(MonitoredSite.is_active == True).all()
    if not sites:
        return []

    tasks = [check_site_health(site.url) for site in sites]
    responses = await asyncio.gather(*tasks)

    results = []
    for i, (status, r_time) in enumerate(responses):
        results.append({
            "id_site": sites[i].id_site,
            "site_name": sites[i].site_name,
            "url": sites[i].url,
            "status": status,
            "response_time": r_time,
            "last_status": status,
            "last_check": sites[i].last_check,
            "created_at": sites[i].created_at
        })
    return results

@router.get("/", response_model=List[SiteResponse])
def read_sites(db: Session = Depends(get_db)):
    """Lista todos los sitios configurados (Publico)."""
    return db.query(MonitoredSite).all()