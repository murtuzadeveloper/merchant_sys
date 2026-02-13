#Alright Reserved developer by murtuzadeveloper@gmail.com contact +923060824762

# Youtube Video for Deployment unsderstanding and how to run https://www.youtube.com/watch?v=fcwJsIGJbEQ

# Install Docker Desktop for Windows and ensure it is running.

# docker compose up --build run in merchant_sys open powershell to the project folder
This single command will automatically:

# This command is good when are you running more then one time
docker compose build --no-cache
docker compose up

Download the necessary database (PostgreSQL), Redis, and RabbitMQ images.
Build your Backend (NestJS) and Frontend (Next.js) applications from source.
Start all 5 services and network them together.

# Then you have to open Docker Desktop inside container you can see merchant_sys open that an run web services
Then open this URL for run Frontend with Backend
http://localhost:3001/login

# Merchant Transaction System

A full-stack application with NestJS backend and Next.js frontend, integrated with PostgreSQL, Redis, and RabbitMQ via Docker Compose.

## Tech Stack
- **Backend:** NestJS (TypeScript), TypeORM, PostgreSQL
- **Frontend:** Next.js (React), Vanilla CSS modules
- **Infrastructure:** Docker Compose, Redis, RabbitMQ

## Prerequisites
- Docker & Docker Compose
- Node.js (for local development outside Docker)

## Getting Started

### 1. Environment Setup
The project comes with default environment variables in `docker-compose.yml` and `.env` files.
- Backend: `backend/.env`
- Frontend: `frontend/.env.local`

### 2. Run with Docker (Recommended)
To start the entire system (Database, Redis, RabbitMQ, Backend API, Frontend):

```bash
docker compose up --build
```

- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:3000
- **RabbitMQ Management:** http://localhost:15672 (User: guest, Pass: guest)

### 3. Local Development (Optional) I dont prefer to use take so much time and manual efforts
If you prefer running services locally without Docker for the app code:

**Backend:**
```bash
cd backend
npm install
npm run start:dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
*Note: You still need Postgres/Redis/RabbitMQ running (e.g., via Docker).*

## Features
- **Merchant Auth:** Register, Login (JWT)
- **Transactions:** Create, List (Paginated, Protected)
- **Background Jobs:** Event publishing via RabbitMQ
- **Caching:** Redis for transaction lists

## Security & Architecture
- **Clean Architecture:** Domain -> Application -> Infrastructure layers.
- **Security:** Passwords hashed with bcrypt, JWT for auth, DTO validation.
- **Isolation:** Merchants can only see their own transactions.

## Production Improvements (Scaling & Security)
If running this system at scale in production, I would implement:

1.  **Architecture & Performance:**
    -   **Database:** Implement read replicas for PostgreSQL and connection pooling (e.g., PgBouncer). Use database migrations for schema management.
    -   **Caching Strategy:** Enhance Redis caching with sophisticated invalidation patterns (e.g., CDC/events) instead of simple TTL or pattern deletion.
    -   **Microservices:** Extract the `Transactions` module into a dedicated microservice if load demands it, communicating via gRPC or RabbitMQ.
    -   **Load Balancing:** Run multiple instances of API and Frontend behind a Load Balancer (Nginx/AWS ALB) via Kubernetes Config.

2.  **Security:**
    -   **Secrets Management:** Use Vault or AWS Secrets Manager instead of .env files.
    -   **Rate Limiting:** Implement distributed rate limiting using Redis at the gateway level (e.g., Nginx or NestJS Throttler with Redis store).
    -   **Compliance:** Ensure PCI-DSS compliance if handling real card data (tokenization).
    -   **Monitoring:** Integrate OpenTelemetry, Prometheus, and Grafana for observability.
