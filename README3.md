
# Geo Processor - Microservices Ecosystem

A monorepo application for geographic point processing built with FastAPI (Python), NestJS (TypeScript), and Next.js (React). This project demonstrates a microservices architecture with Redis caching and Docker containerization.

## 🎯 Assessment Requirements Fulfilled
This project implements all requirements from the candidate assessment:

## ✅ Python Service (FastAPI)

## Contenido
- **Endpoint**: `POST /process-points` for processing latitude/longitude points
- **Input Validation**: Returns 400 Bad Request for invalid/missing data
- **Geographic Calculations:**
- - `north` = maximum latitude
- - `south` = minimum latitude
- - `east` = maximum longitude
- - `west` = minimum longitude
- - `centroid` = average of all coordinates
- `Response Format`: Proper JSON with centroid and bounds
- `Error Handling`: Clear error messages with appropriate HTTP status codes

---

## ✅ NestJS API

- **Request Forwarding**: Proxies requests to Python service
- **Input Validation**: Validates input using class-validator
- **Caching**: Implements Redis caching for performance optimization
- **Error Handling**: Comprehensive error handling and logging


### ✅ Next.js Frontend

- **User Interface**: Form for coordinate submission
- **Visualization**: Map display showing bounding box and centroid
- **Real-time Processing**: Immediate feedback on calculations

## 🏗️ Architecture

- **Python Service**: FastAPI microservice for geographic calculations
- **NestJS API**: Gateway with validation and Redis caching
- **Next.js Frontend**: React-based web interface with map visualization
- **Redis**: Cache and message broker

## 📋 Requirements
- Docker and Docker Compose (recommended)
- Node.js 18+ and Python 3.11+ (for local development)

## 🚀 Quick Start with Docker (Recommended)
```bash
# Clone the repository
git clone https://github.com/Uzumy14/geo-processor-monorepo.git
cd geo-processor-monorepo

# Start all services
docker compose up --build

# Or run in detached mode
docker compose up -d --build
```
Services will be available at:

- **Python Service**: http://localhost:8000
- **NestJS API**: http://localhost:3001
- **Next.js Frontend**: http://localhost:3000
- **Redis**: localhost:6379

## 📡 API Endpoints

## Python Service (Direct)
```bash
curl -X POST http://localhost:8000/process-points \
  -H "Content-Type: application/json" \
  -d '{
    "points": [
      {"lat": 40.7128, "lng": -74.0060},
      {"lat": 34.0522, "lng": -118.2437}
    ]
  }'
```
## NestJS API (With Caching)
```bash
curl -X POST http://localhost:3001/api/process-points \
  -H "Content-Type: application/json" \
  -d '{
    "points": [
      {"lat": 40.7128, "lng": -74.0060},
      {"lat": 34.0522, "lng": -118.2437}
    ]
  }'
```

## 🧪 Running Tests

## Docker Approach
```bash
# Test Python service
docker compose run --rm python-service pytest -v

# Test NestJS API
docker compose run --rm nestjs-api npm run test
```

## Local Development Approach
```bash
# Python service tests
cd python-service
python -m pytest -v

# NestJS tests
cd nestjs-api
npm test
```

## 🔧 Local Development (Without Docker)

## 1. Python Service
```bash
cd python-service
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## 2. NestJS API
```bash
cd nestjs-api
npm install
npm run start:dev
```

## 3. Next.js Frontend
```bash
cd next-frontend
npm install
NEXT_PUBLIC_API_URL=http://localhost:3001 npm run dev
```

## 📁 Project Structure
```bash
geo-processor-monorepo/
├── python-service/          # FastAPI geographic service
│   ├── app/
│   │   ├── main.py         # FastAPI application
│   │   ├── schemas.py      # Pydantic models
│   │   ├── service.py      # Business logic
│   │   └── __init__.py
│   ├── tests/
│   │   ├── test_app.py     # API endpoint tests
│   │   └── test_geo.py     # Geographic logic tests
│   ├── Dockerfile
│   ├── requirements.txt
│   └── pytest.ini
├── nestjs-api/              # NestJS gateway API
│   ├── src/
│   │   ├── main.ts         # Application entry point
│   │   ├── app.module.ts   # Root module
│   │   ├── app.controller.ts # Main controller
│   │   ├── dto/
│   │   │   └── process-points.dto.ts
│   │   ├── geo.service.ts  # Python service client
│   │   └── cache.service.ts # Redis caching
│   ├── test/
│   │   ├── app.controller.spec.ts
│   │   └── app.spec.ts
│   ├── Dockerfile
│   ├── jest.config.js
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
├── next-frontend/           # React frontend
│   ├── app/
│   │   ├── layout.jsx
│   │   └── page.jsx
│   ├── components/
│   │   └── MapView.tsx
│   ├── Dockerfile
│   ├── .env.local
│   ├── config.js
│   ├── next.config.js
│   └── package.json
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 🎯 Implementation Details

## Python Service Features
- **FastAPI + Pydantic**: Automatic validation and serialization
- **Mathematical Operations**: Uses Python's built-in min(), max(), and sum()
- **Stateless Design**: No internal caching (handled by NestJS layer)
- **Error Responses**: Clear 400 Bad Request messages for invalid inputs
- **Well-documented**: Comprehensive function signatures and error handling

## Example Error Responses
```json
{
  "message": "Validation failed",
  "error": "Points array cannot be empty",
  "statusCode": 400
}
```

## Success Response Format
```json
{
  "centroid": {
    "lat": 37.3825,
    "lng": -96.12485
  },
  "bounds": {
    "north": 40.7128,
    "south": 34.0522,
    "east": -74.006,
    "west": -118.2437
  }
}
```

## 🔄 Environment Variables

## Python Service
```env
PYTHON_URL=http://localhost:8000
```

## NestJS API
```env
REDIS_URL=redis://redis:6379
PYTHON_SERVICE_URL=http://python-service:8000
PORT=3001
```

## Next.js Frontend
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🚨 Error Handling
The application provides clear error messages for:

- Invalid input data (400 Bad Request)
- Empty points array (400 Bad Request)
- Service unavailability (503 Service Unavailable)
- Validation errors (422 Unprocessable Entity)

## 🚨 Error Handling

- The application provides clear error messages for:
- Invalid input data (400 Bad Request)
- Empty points array (400 Bad Request)
- Service unavailability (503 Service Unavailable)
- Validation errors (422 Unprocessable Entity)

## 🛠️ Development Commands
```bash
# Build and start all services
docker compose up --build

# View logs
docker compose logs

# Run specific service tests
docker compose run --rm python-service pytest -v
docker compose run --rm nestjs-api npm test

# Stop services
docker compose down

# Remove volumes and cleanup
docker compose down -v
```

## 📝 Decision Rationale

## Monorepo Approach Selected Because:

- Simplified dependency management: Shared configuration across services
- Easier cross-service development: Single repository for all components
- Unified testing: Consistent testing approach across all services
- CI/CD pipeline: Streamlined deployment process

## Technology Choices Justification:

- FastAPI: High-performance with automatic docs and validation
- NestJS: Enterprise-grade framework with built-in TypeScript support
- Next.js: Excellent developer experience and React integration
- Redis: High-performance caching solution
- Docker: Consistent environment across development and production

## 🔮 Future Enhancements

- Authentication and authorization
- Rate limiting
- Advanced caching strategies
- Metrics and monitoring
- Load testing
- CI/CD pipeline
- Kubernetes deployment

## 📄 License
This project is created as part of a technical assessment.

## 💡 Support
For questions or issues, please check the service logs:
```bash
docker compose logs python-service
docker compose logs nestjs-api
docker compose logs redis
```
Or open an issue in the GitHub repository.