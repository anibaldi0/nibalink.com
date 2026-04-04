# backend/app/scripts/seed_script.py

"""
FILE: backend/app/scripts/seed_script.py
DESCRIPTION: Script de recuperacion de desastres y inicializacion.
             Resetea la cuenta de administrador a valores por defecto.
"""

import sys
import os
from dotenv import load_dotenv

# Agregamos el path para que encuentre el modulo 'app'
sys.path.append(os.getcwd())

# Cargamos las variables
load_dotenv()

from app.database import SessionLocal
from app.models.user_model import User
from app.utils.auth_util import hash_password

def reset_admin():
    db = SessionLocal()
    try:
        print("Iniciando reseteo de administrador...")
        
        # 1. Limpiamos usuarios existentes (o solo el admin)
        db.query(User).delete()
        
        # 2. Creamos el usuario semilla
        # IMPORTANTE: Cambia esto apenas loguees
        admin_nick = os.getenv("ADMIN_NICK", "admin")
        admin_pass = os.getenv("ADMIN_PASS", "admin")
        
        new_admin = User(
            email_user=admin_nick,
            hashed_password=hash_password(admin_pass),
            is_verified=True
        )
        
        db.add(new_admin)
        db.commit()
        print(f"EXITO: Usuario resetado.")
        print(f"Email: {admin_nick}")
        print(f"Pass: {admin_pass}")
        print(f"RECORDATORIO: Cambia la pass desde el Dashboard inmediatamente.")
        
    except Exception as e:
        print(f"ERROR: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    reset_admin()
