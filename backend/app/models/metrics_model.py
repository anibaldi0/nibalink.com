
# backend/app/models/metrics_model.py

from sqlalchemy import Column, Integer, Float, DateTime
from datetime import datetime
from app.database import Base

class SystemMetric(Base):
    __tablename__ = "metrics_system"

    id_metrics = Column(Integer, primary_key=True, index=True)
    cpu_usage_metrics = Column(Float, nullable=False)
    ram_usage_metrics = Column(Float, nullable=False)
    timestamp_metrics = Column(DateTime, default=datetime.utcnow)
