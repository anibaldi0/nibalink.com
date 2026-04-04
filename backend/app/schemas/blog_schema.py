# backend/app/schemas/blog.py

from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ErrorPostBase(BaseModel):
    title: str
    error_payload: Optional[str] = None
    solution: Optional[str] = None
    stack_trace: Optional[str] = None

class ErrorPostCreate(ErrorPostBase):
    pass

class ErrorPost(ErrorPostBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
