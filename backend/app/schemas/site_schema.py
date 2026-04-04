# backend/app/schemas/site_schema.py

"""
FILE: backend/app/schemas/site_schema.py
DESCRIPTION: Data Transfer Objects (DTO) y reglas de validacion para Sitios.
             Define como se reciben los datos del Frontend y como se envian 
             desde la API (Serializacion/Deserializacion).

ESPECIFICACIONES:
- Utiliza Pydantic para tipado estricto.
- Valida formatos de URL y estados booleanos.
- Config: from_attributes = True para compatibilidad con modelos de SQLAlchemy.
"""

from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SiteBase(BaseModel):
    site_name: str
    url: str
    is_active: Optional[bool] = True

class SiteCreate(SiteBase):
    pass

class SiteResponse(SiteBase):
    id_site: int
    last_status: str
    last_check: Optional[datetime] = None 
    created_at: datetime

    class Config:
        from_attributes = True