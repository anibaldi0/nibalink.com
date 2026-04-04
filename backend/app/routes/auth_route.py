# backend/app/routes/auth_route.py

"""
FILE: backend/app/routes/auth_route.py
DESCRIPTION: Router para la autenticacion del administrador de Nibalink.
             Permite obtener el token necesario para realizar operaciones CRUD.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user_model import User
from app.utils.auth_util import verify_password, create_access_token

router = APIRouter(prefix="/auth", tags=["Security"])

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """
    Endpoint de acceso para Anibal. 
    Verifica credenciales y devuelve el JWT.
    """
    user = db.query(User).filter(User.email_user == form_data.username).first()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales incorrectas, Ninja.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user.email_user})
    return {"access_token": access_token, "token_type": "bearer"}
