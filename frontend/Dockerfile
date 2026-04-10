# frontend/Dockerfile

# --- ETAPA 1: BUILD ---
FROM node:20-slim AS build
WORKDIR /app

# CAPTURA DE VARIABLE DE ENTORNO
# Docker Compose le pasara el valor de tu .env a este ARG
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Instalacion de dependencias
COPY package*.json ./
RUN npm install

# Copia de codigo y compilacion (Aqui se "suelda" la URL de la API)
COPY . .
RUN npm run build

# --- ETAPA 2: PRODUCCION (NGINX) ---
FROM nginx:alpine

# Copiamos los archivos estaticos generados en la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Configuracion de Nginx para manejar rutas de React (SPA) sin dar 404
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
    # Opcional: Proxy para la API si no usas Cloudflare Tunnel para el puerto 8000 \
    location /api/ { \
        proxy_pass http://nibalink_backend:8000/; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]