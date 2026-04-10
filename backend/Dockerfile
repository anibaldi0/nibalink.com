# backend/Dockerfile
FROM python:3.12-slim

# Evita archivos .pyc y asegura que los logs fluyan en tiempo real
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
# Seteamos el path para que el contenedor encuentre el modulo 'app'
ENV PYTHONPATH=/code

WORKDIR /code

# Instalamos solo la libreria de ejecucion para PostgreSQL (Runtime)
RUN apt-get update && apt-get install -y \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*

# Instalamos dependencias (asegurate que en requirements.txt este psycopg2-binary)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos el codigo fuente (carpeta app y scripts)
COPY . .

EXPOSE 8000

# Ejecucion con Uvicorn (Host 0.0.0.0 es vital en Docker)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]