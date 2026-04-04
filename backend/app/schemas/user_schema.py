# backend/app/schemas/user_schema.py

"""
FILE: backend/app/schemas/user_schema.py
DESCRIPTION: Validacion de datos para el registro y autenticacion de usuarios.
"""

from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    email_user: EmailStr

class UserCreate(UserBase):
    password_user: str # Contrasena en plano que recibimos (luego se hashea)

class UserResponse(UserBase):
    id_user: int
    is_verified: bool
    created_at: datetime

    class Config:
        from_attributes = True
