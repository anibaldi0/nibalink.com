# backend/app/models/user_model.py

"""
FILE: backend/app/models/user_model.py
DESCRIPTION: Modelo de persistencia para la gestion de usuarios y seguridad.
             Almacena credenciales hasheadas y estados de verificacion de email.
"""

from sqlalchemy import Column, Integer, String, Boolean, DateTime
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id_user = Column(Integer, primary_key=True, index=True)
    email_user = Column(String(150), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    # Control de verificacion por Resend
    is_verified = Column(Boolean, default=False)
    verification_code = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)