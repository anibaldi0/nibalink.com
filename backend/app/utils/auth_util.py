# backend/app/utils/auth_util.py

"""
FILE: backend/app/utils/auth_util.py
DESCRIPTION: Utilidades de seguridad para el Dashboard de Nibalink.
             Maneja el hasheo de contrasenas (bcrypt) y la generacion 
             de tokens JWT para el acceso de Admin.
"""

import os
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext

# Configuracion de seguridad mediante variables de entorno
# En tu .env de la Dell u Oracle: SECRET_KEY=tu_clave_muy_larga
SECRET_KEY = os.getenv("SECRET_KEY", "CLAVE_TEMPORAL_CAMBIAME_EN_PRODUCCION")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 horas de validez

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    """Transforma contrasena plana en hash seguro."""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Compara contrasena ingresada con el hash de la DB."""
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    """Genera un JWT para que el Frontend de Nibalink mantenga la sesion."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt