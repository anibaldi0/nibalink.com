
# backend/app/database.py

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Esta URL la saca de lo que pusimos en el docker-compose.yml
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://nibal_admin:nibal_pass@db:5432/nibalink_db")

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()