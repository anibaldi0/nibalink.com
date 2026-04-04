# backend/app/main.py

# 1. Librerias estandar de Python
import asyncio
from contextlib import asynccontextmanager

# 2. Librerias de terceros (instalar con pip)
import psutil
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# 3. Tu codigo local (app)
# Primero la base de datos
from app.database import engine, Base, SessionLocal

# Segundo los modelos (IMPORTANTE: Importar antes que los routers para que Base los vea)
from app.models import blog_model, metrics_model, site_model

# Tercero los routers
from app.routes.blog_route import router as blog_router
from app.routes.metrics_route import router as metrics_router
from app.routes.services_route import router as services_router
from app.routes.auth_route import router as auth_router

# --- INICIALIZACION DE DB ---
# Esto crea las tablas en Postgres basandose en los modelos importados arriba
Base.metadata.create_all(bind=engine)

# --- WORKER NINJA DE METRICAS ---
async def log_metrics_worker():
    """
    Tarea persistente que corre en un hilo separado del event loop principal.
    No bloquea la API mientras captura datos del hardware.
    """
    print("Worker de metricas iniciado...")
    while True:
        db = SessionLocal()
        try:
            # Captura de hardware
            cpu = psutil.cpu_percent(interval=1)
            ram = psutil.virtual_memory().percent
            
            new_metric = metrics_model.SystemMetric(
                cpu_usage_metrics=cpu,
                ram_usage_metrics=ram
            )
            db.add(new_metric)
            db.commit()
        except Exception as e:
            print(f"Error en worker: {e}")
            db.rollback()
        finally:
            db.close()
        
        # Espera 5 minutos
        await asyncio.sleep(300)

# --- GESTION DE CICLO DE VIDA (LIFESPAN) ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Al arrancar
    worker_task = asyncio.create_task(log_metrics_worker())
    yield
    # Al apagar
    worker_task.cancel()

# --- INSTANCIA DE API ---
app = FastAPI(title="nibalink API", lifespan=lifespan)

# --- CONFIGURACION DE CORS ---
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- REGISTRO DE RUTAS ---
app.include_router(blog_router)
app.include_router(metrics_router)
app.include_router(services_router)
app.include_router(auth_router)

@app.get("/")
def read_root():
    return {
        "status": "nibalink Online", 
        "database": "Synced", 
        "cors": "enabled",
        "arch": "ARM/Ampere Optimized"
    }