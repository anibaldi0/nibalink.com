# backend/app/scripts/cleanup_metrics.py

"""
FILE: backend/app/scripts/cleanup_metrics.py
DESCRIPTION: Script de mantenimiento preventivo. 
             Elimina metricas antiguas para evitar el crecimiento excesivo de la DB.
"""

import sys
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

# Path setup para encontrar el modulo app
sys.path.append(os.getcwd())
load_dotenv()

from app.database import SessionLocal
from app.models.metrics_model import Metric # Asegurate que este sea el nombre de tu modelo

def purge_old_metrics(days_to_keep=7):
    db = SessionLocal()
    try:
        # Calculamos el limite de tiempo
        limit_date = datetime.now() - timedelta(days=days_to_keep)
        
        print(f"[{datetime.now()}] Iniciando purga de metricas anteriores a: {limit_date}")
        
        # Filtramos y borramos
        # Asumiendo que tu campo se llama timestamp_metrics
        query = db.query(Metric).filter(Metric.timestamp_metrics < limit_date)
        count = query.count()
        
        query.delete(synchronize_session=False)
        db.commit()
        
        print(f"EXITO: Se eliminaron {count} registros antiguos.")
        
    except Exception as e:
        print(f"ERROR durante la purga: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    # Podes pasarle por argumento cuantos dias queres guardar
    purge_old_metrics(days_to_keep=7)
