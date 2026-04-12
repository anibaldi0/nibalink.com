
# scripts/deploy_nibalink.sh

#!/bin/bash

# DESCRIPCION: Script de automatizacion para el despliegue de la landing page Nibalink.
# ACCIONES: Sincroniza repositorio, construye imagen Docker (ARM/x86), reinicia servicio y limpia excedentes.
# AUTOR: Nibalink Sysadmin System

# Abortar el script si ocurre cualquier error durante la ejecucion
set -e

# Obtener la ruta del directorio donde reside el script y subir un nivel a la raiz del proyecto
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "--- Iniciando proceso de despliegue en: $(pwd) ---"

# 1. Sincronizacion de codigo
echo "Paso 1: Sincronizando con repositorio remoto..."
# git pull origin main

# 2. Construccion de la imagen
# Se usa --no-cache para asegurar que el build de produccion sea limpio
echo "Paso 2: Construyendo imagen Docker para nibalink-services-landing..."
docker compose build --no-cache nibalink-services-landing

# 3. Reinicio del contenedor
echo "Paso 3: Levantando contenedor en modo detach..."
docker compose up -d nibalink-services-landing

# 4. Higiene del sistema
# Elimina imagenes huerfanas para no agotar el almacenamiento de la instancia Oracle
echo "Paso 4: Limpiando imagenes antiguas y huerfanas..."
docker image prune -f

# 5. Verificacion de salud (Health Check)
echo "Paso 5: Verificando estado del servicio..."
CONTAINER_NAME="nibalink_services_container"
STATUS=$(docker inspect -f '{{.State.Running}}' $CONTAINER_NAME 2>/dev/null || echo "false")

if [ "$STATUS" == "true" ]; then
    echo "------------------------------------------------"
    echo "--- DESPLIEGUE EXITOSO: Nibalink esta online ---"
    echo "------------------------------------------------"
else
    echo "------------------------------------------------"
    echo "--- ERROR: El contenedor no pudo iniciar     ---"
    echo "------------------------------------------------"
    exit 1
fi
