
# backend/app/routes/metrics_route.py

import psutil
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.metrics_model import SystemMetric
from pydantic import BaseModel
from datetime import datetime

router = APIRouter(prefix="/metrics", tags=["System Metrics"])

class MetricSchema(BaseModel):
    id_metrics: int
    cpu_usage_metrics: float
    ram_usage_metrics: float
    timestamp_metrics: datetime
    class Config:
        from_attributes = True

@router.get("/current")
def get_current_metrics():
    """Captura instantánea de hardware."""
    return {
        "cpu_usage_metrics": psutil.cpu_percent(interval=None),
        "ram_usage_metrics": psutil.virtual_memory().percent,
        "timestamp_metrics": datetime.utcnow()
    }

@router.get("/history", response_model=List[MetricSchema])
def get_metrics_history(db: Session = Depends(get_db)):
    """Últimos 20 registros para la gráfica del Frontend."""
    return db.query(SystemMetric).order_by(SystemMetric.timestamp_metrics.desc()).limit(20).all()