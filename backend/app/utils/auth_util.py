# backend/app/utils/auth_util.py
import os
from datetime import datetime, timedelta
from typing import Optional
from jose import jwt
from passlib.context import CryptContext

# Cargamos variables
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))

if not SECRET_KEY:
    raise RuntimeError("ERROR: SECRET_KEY no detectada.")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# --- FUNCIONES QUE FALTABAN ---

def hash_password(password: str) -> str:
    """Hashea la password para guardarla segura en la DB."""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Compara password en plano con el hash de la DB."""
    return pwd_context.verify(plain_password, hashed_password)

# ------------------------------

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)