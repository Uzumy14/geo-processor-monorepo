
# Geo Processor - Monorepo

Proyecto de evaluación: microservicio geo + API + frontend.

## Contenido
- `python-service`: FastAPI service que calcula centroid y bounds.
- `nestjs-api`: API que valida, cachea y reenvía a Python.
- `next-frontend`: Frontend Next.js para ingresar coordenadas y visualizar en mapa.
- `docker-compose.yml`: Levanta todo (incluye Redis para cache).

---

## Requisitos previos (qué instalar antes de correr el proyecto)

A continuación se listan instrucciones para **Ubuntu/Debian** y notas para **Mac/Windows**. Si usas Docker Desktop en Mac/Windows, no necesitas instalar `docker` con apt; instala Docker Desktop desde su página oficial.

### 1) Git
```bash
# Ubuntu / Debian
sudo apt update
sudo apt install -y git
```

### 2) Docker & Docker Compose
- **Recomendado**: Docker Desktop (Windows / Mac). Descárgalo e instálalo desde la web oficial de Docker.
- **Ubuntu / Debian (ejemplo simplificado)**:
```bash
# Instala dependencias, agrega repo oficial, instala docker
sudo apt update
sudo apt install -y ca-certificates curl gnupg lsb-release
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \

  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Añade tu usuario al grupo docker (cierra sesión o reinicia la sesión después)
sudo usermod -aG docker $USER
```

> Nota: En la mayoría de setups modernos `docker compose` viene integrado. También puede usar `docker-compose` (la versión clásica).

### 3) Node.js & npm (para NestJS y Next.js)
Instala Node.js 18 o 20 (recomendado 20.x):
```bash
# Instalador oficial (ejemplo para Debian/Ubuntu usando NodeSource)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v
```

### 4) Python 3.11+ y pip (para el microservicio FastAPI)
```bash
sudo apt update
sudo apt install -y python3.11 python3.11-venv python3-pip
python3.11 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
```

---

## Estructura del repositorio
```
geo-processor-monorepo/
├─ python-service/
│  ├─ node_modules/
│  ├─ app/
│  │  ├─ main.py
│  │  ├─ schemas.py
│  │  ├─ service.py
│  │  └─ __init__.py
│  ├─ tests/
│  │  └─ test_app.py
│  │  └─ test_geo.py
│  ├─ Dockerfile
│  ├─ requirements.txt
│  └─ pytest.ini
├─ nestjs-api/
│  ├─ src/
│  │  ├─ main.ts
│  │  ├─ app.module.ts
│  │  ├─ app.controller.ts
│  │  ├─ dto/process-points.dto.ts
│  │  ├─ geo.service.ts
│  │  └─ cache.service.ts
│  ├─ test/
│  │  └─ app.controller.spec.ts
│  │  └─ app.spec.ts
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ jest.config.js
│  ├─ tsconfig.json
│  └─ Dockerfile
├─ next-frontend/
│  ├─ app/
│  │  ├─ layout.jsx
│  │  └─ page.jsx
│  ├─ components/
│  │  └─ MapView.tsx
│  ├─ .env.local
│  ├─ config.js
│  ├─ next.config.js
│  ├─ package.json
│  └─ Dockerfile
├─ .gitignore
├─ docker-compose.yml
└─ README.md
```

---

## Ejecutar todo rápidamente (recomendado: Docker Compose)
Desde la raíz del repo:

```bash
docker compose up --build
```

Esto levantará:
- Python FastAPI en `http://localhost:8000` (endpoint `POST /process-points`)
- NestJS API en `http://localhost:3001` (endpoint `POST /api/process-points`)
- Next.js frontend en `http://localhost:3000`

Para levantar en segundo plano:
```bash
docker compose up -d --build
```

Para detener y eliminar contenedores:
```bash
docker compose down
```

---

## Ejecutar los servicios localmente sin Docker (desarrollo / pruebas)

### 1) Python service (FastAPI)
```bash
cd python-service
python -m venv .venv
source .venv/bin/activate         
# Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

- Prueba rápida con `curl`:
```bash
curl.exe -X POST http://localhost:8000/process-points -H "Content-Type: application/json" -d '{"points":[{"lat":40.7128,"lng":-74.0060},{"lat":34.0522,"lng":-118.2437}] }'
```
- Prueba rápida con `Invoke-RestMethod`:
```bash
Invoke-RestMethod -Uri "http://localhost:8000/process-points" `
  -Method POST `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{"points":[{"lat":40.7128,"lng":-74.0060},{"lat":34.0522,"lng":-118.2437}]}'
```

### 2) NestJS API
```bash
cd nestjs-api
npm install
# En desarrollo con auto-reload
npm run start:dev
```
- Asegúrate de que `PYTHON_URL` apunte al servicio Python si lo ejecutas fuera de Docker (por defecto `http://localhost:8000/process-points`).
- Prueba con `curl`:
```bash
curl.exe -X POST http://localhost:3001/api/process-points -H "Content-Type: application/json" -d '{"points":[{"lat":40.7128,"lng":-74.0060},{"lat":34.0522,"lng":-118.2437}] }'
```

- Prueba con `Invoke-RestMethod`:
```bash
Invoke-RestMethod -Uri "http://localhost:3001/api/process-points" `
  -Method POST `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{"points":[{"lat":40.7128,"lng":-74.0060},{"lat":34.0522,"lng":-118.2437}]}'
```

### 3) Next.js frontend
```bash
cd next-frontend
npm install
# Define la variable de entorno para apuntar a tu API (si corres nestjs localmente)
export NEXT_PUBLIC_API_URL=http://localhost:3001
npm run dev
# Abre http://localhost:3000 en tu navegador
```

---

## Tests unitarios

### Python (pytest) con Docker
```bash
docker compose run --rm python-service pytest -v
```

### Python (pytest) localmente
```bash
cd python-service
source .venv/bin/activate
pip install -r requirements.txt
pytest -q
```

### NestJS (jest) con Docker
```bash
docker compose run --rm nestjs-api npm test
```

### NestJS (jest) localmente
```bash
cd nestjs-api
npm install
npm test
```

---

## Notas y recomendaciones
- Para pruebas rápidas y repetir ejecuciones, Docker Compose es la forma más sencilla y reproduce exactamente el entorno.
- El `nestjs-api` incluye un mecanismo de cache que intenta usar Redis y si no está disponible cae a una cache en memoria (útil para desarrollo local sin Redis).

---

## Archivos y ejemplos claves

- `python-service/app/main.py` : FastAPI + endpoint `POST /process-points`.
- `nestjs-api/src/app.controller.ts` : expone `POST /api/process-points` al frontend.
- `next-frontend/app/page.jsx` : UI simple con Leaflet para visualizar puntos, centroid y bounding box.

---
