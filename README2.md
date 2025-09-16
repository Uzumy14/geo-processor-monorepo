Geo Processor - Microservices Ecosystem
A monorepo application for geographic point processing built with FastAPI (Python), NestJS (TypeScript), and Next.js (React). This project demonstrates a microservices architecture with Redis caching and Docker containerization.

🏗️ Architecture
Python Service: FastAPI microservice for geographic calculations

NestJS API: Gateway with validation and Redis caching

Next.js Frontend: React-based web interface with map visualization

Redis: Cache and message broker

📋 Requirements
Docker and Docker Compose (recommended)

OR Node.js 18+ and Python 3.11+ (for local development)

🚀 Quick Start with Docker (Recommended)
bash
# Clone the repository
git clone https://github.com/your-username/geo-processor-monorepo.git
cd geo-processor-monorepo

# Start all services
docker compose up --build

# Or run in detached mode
docker compose up -d --build
Services will be available at:

Python Service: http://localhost:8000

NestJS API: http://localhost:3001

Next.js Frontend: http://localhost:3000

Redis: localhost:6379

📡 API Endpoints
Python Service (Direct)
bash
curl -X POST http://localhost:8000/process-points \
  -H "Content-Type: application/json" \
  -d '{
    "points": [
      {"lat": 40.7128, "lng": -74.0060},
      {"lat": 34.0522, "lng": -118.2437}
    ]
  }'
NestJS API (With Caching)
bash
curl -X POST http://localhost:3001/api/process-points \
  -H "Content-Type: application/json" \
  -d '{
    "points": [
      {"lat": 40.7128, "lng": -74.0060},
      {"lat": 34.0522, "lng": -118.2437}
    ]
  }'
🧪 Running Tests
Docker Approach
bash
# Test Python service
docker compose run --rm python-service pytest -v

# Test NestJS API
docker compose run --rm nestjs-api npm run test
Local Development Approach
bash
# Python service tests
cd python-service
python -m pytest -v

# NestJS tests
cd nestjs-api
npm test
🔧 Local Development (Without Docker)
1. Python Service
bash
cd python-service
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
2. NestJS API
bash
cd nestjs-api
npm install
npm run start:dev
3. Next.js Frontend
bash
cd next-frontend
npm install
NEXT_PUBLIC_API_URL=http://localhost:3001 npm run dev
📁 Project Structure
text
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
🎯 Features Implemented
✅ Python Service (FastAPI)
REST endpoint for geographic processing

Input validation with Pydantic

Geographic calculations (centroid and bounds)

Proper error handling with HTTP status codes

✅ NestJS API
Request validation with class-validator

Redis caching for performance optimization

Error handling and logging

Microservice communication

✅ Next.js Frontend
Interactive map visualization with Leaflet

Coordinate input form

Real-time results display

Responsive design

✅ Infrastructure
Docker containerization

Redis caching layer

Comprehensive test coverage

Environment configuration

🔄 Environment Variables
Python Service
env
PYTHON_URL=http://localhost:8000
NestJS API
env
REDIS_URL=redis://redis:6379
PYTHON_SERVICE_URL=http://python-service:8000
PORT=3001
Next.js Frontend
env
NEXT_PUBLIC_API_URL=http://localhost:3001
🚨 Error Handling
The application provides clear error messages for:

Invalid input data (400 Bad Request)

Empty points array (400 Bad Request)

Service unavailability (503 Service Unavailable)

Validation errors (422 Unprocessable Entity)

📊 Performance Features
Redis Caching: Redundant computation for identical requests

Input Validation: Prevents invalid data processing

Error Fallbacks: Graceful degradation when services are unavailable

Containerization: Consistent environments across development and production

🤝 API Response Format
Success Response
json
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
Error Response
json
{
  "message": "Validation failed",
  "error": "Points array cannot be empty",
  "statusCode": 400
}
🛠️ Development Commands
bash
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
📝 Decision Rationale
Monorepo Approach
Simplified dependency management

Shared configuration and tooling

Easier cross-service development

Unified testing and CI/CD pipeline

Technology Choices
FastAPI: High-performance Python framework with automatic docs

NestJS: Enterprise-grade Node.js framework with TypeScript

Next.js: React framework with excellent developer experience

Redis: High-performance caching solution

Docker: Consistent environment across development and deployment

🔮 Future Enhancements
Authentication and authorization

Rate limiting

Advanced caching strategies

Metrics and monitoring

Load testing

CI/CD pipeline

Kubernetes deployment

📄 License
This project is created as part of a technical assessment.

💡 Support
For questions or issues, please check the service logs:

bash
docker compose logs python-service
docker compose logs nestjs-api
docker compose logs redis
Or open an issue in the GitHub repository.