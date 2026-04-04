
# backend/app/Dockerfile

FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Cambiamos el WORKDIR a la raíz del contenedor
WORKDIR /code 

RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos todo el contenido de 'backend/' a '/code/'
COPY . .

EXPOSE 8000

# Cambiamos el comando para que apunte correctamente
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]