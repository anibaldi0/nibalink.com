
# backend/app/routes/blog_route.py

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.blog_model import ErrorPost as ErrorModel  
from app.schemas.blog_schema import ErrorPost, ErrorPostCreate 

router = APIRouter(prefix="/blog", tags=["Cajón de Errores"])

@router.post("/", response_model=ErrorPost)
def create_error_entry(error: ErrorPostCreate, db: Session = Depends(get_db)):
    db_error = ErrorModel(**error.model_dump())
    db.add(db_error)
    db.commit()
    db.refresh(db_error)
    return db_error

@router.get("/", response_model=List[ErrorPost])
def get_errors(db: Session = Depends(get_db)):
    return db.query(ErrorModel).all()