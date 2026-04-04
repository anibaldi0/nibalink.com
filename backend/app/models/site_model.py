# backend/app/models/site_model.py

"""
FILE: backend/app/models/site_model.py
DESCRIPTION: Definicion de persistencia para el monitoreo de activos web.
             Contiene la estructura de tablas para registrar dominios y el 
             historico de latencia/uptime (logs).
             
ESPECIFICACIONES:
- MonitoredSite: Almacena la configuracion y el ultimo estado conocido.
- SiteCheckLog: Tabla de series temporales para graficas de rendimiento.
- Integrado con SQLAlchemy para migraciones automaticas en PostgreSQL.
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float
from datetime import datetime
from app.database import Base

class MonitoredSite(Base):
    __tablename__ = "monitored_sites"

    id_site = Column(Integer, primary_key=True, index=True)
    site_name = Column(String(100), nullable=False)
    url = Column(String(255), nullable=False, unique=True)
    is_active = Column(Boolean, default=True)
    # Guardamos el ultimo estado conocido para no saturar con pings si no es necesario
    last_status = Column(String(20), default="unknown") 
    last_check = Column(DateTime, default=datetime.utcnow)
    created_at = Column(DateTime, default=datetime.utcnow)

class SiteCheckLog(Base):
    """Tabla para historial de uptime y latencia (Graficos futuros)"""
    __tablename__ = "site_check_logs"

    id_log = Column(Integer, primary_key=True, index=True)
    site_id = Column(Integer, index=True)
    status_code = Column(Integer)
    response_time = Column(Float) # Latencia en segundos
    checked_at = Column(DateTime, default=datetime.utcnow)
