# backend/app/scripts/seed_script.py

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
        
        # 1. Limpiamos usuarios existentes
        db.query(User).delete()
        
        # 2. Obtenemos credenciales del entorno
        admin_nick = os.getenv("ADMIN_NICK", "admin")
        admin_pass = os.getenv("ADMIN_PASS", "admin")
        
        new_admin = User(
            email_user=admin_nick,
            hashed_password=hash_password(admin_pass),
            is_verified=True
        )
        
        db.add(new_admin)
        db.commit()
        
        # --- SALIDA SEGURA EN TERMINAL ---
        print("-" * 30)
        print("EXITO: Base de datos sincronizada.")
        print(f"Admin User: {admin_nick}")
        # Ocultamos la pass. Si es 'admin', mostramos aviso de peligro.
        if admin_pass == "admin":
            print("Password: [ DEFAULT / PELIGRO ]")
        else:
            print("Password: [ CONFIGURADA EN .ENV ]")
        print("-" * 30)
        print("RECORDATORIO: Verifica el acceso en nibalink.com/login")
        
    except Exception as e:
        print(f"ERROR: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    reset_admin()