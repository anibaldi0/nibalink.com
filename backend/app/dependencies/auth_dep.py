# backend/app/dependencies/auth_dep.py

"""
FILE: backend/app/dependencies/auth_dep.py
DESCRIPTION: Interceptor de seguridad para proteger rutas privadas.
             Valida la autenticidad del Token JWT antes de permitir 
             operaciones de escritura en la DB.
"""

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from app.utils.auth_util import SECRET_KEY, ALGORITHM

# Esto le dice a Swagger que busque el boton "Authorize" arriba a la derecha
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

def get_current_admin(token: str = Depends(oauth2_scheme)):
    """
    Dependencia para proteger endpoints. 
    Si el token es invalido o expiro, lanza un 401.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="No podes pasar, Ninja. Token invalido o inexistente.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        return email
    except JWTError:
        raise credentials_exception
