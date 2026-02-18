## 👨‍💻 Developer

**Murtuza Developer**  
📧 murtuzadeveloper@gmail.com  
📱 +92 306 0824762
---

#  https://www.ecom.io/
# This Assesment given by ecom and fraud company

# Merchant Transaction System
A full-stack application built with **NestJS (Backend)** and **Next.js (Frontend)**, integrated with PostgreSQL, Redis, and RabbitMQ using Docker Compose.
---

## 🎥 Deployment & Running Guide
Watch the full deployment explanation and running guide here:  
https://www.youtube.com/watch?v=fcwJsIGJbEQ
---

## 🐳 Prerequisite

- Install **Docker Desktop for Windows**
- Make sure Docker Desktop is running before executing commands
---

## 🚀 Run the Project (Docker - Recommended)

Open **PowerShell** in the project root folder (`merchant_sys`) and run:
docker compose up --build
This single command will automatically:
- Download PostgreSQL, Redis, and RabbitMQ images
- Build the Backend (NestJS)
- Build the Frontend (Next.js)
- Start all 5 services
Connect everything via Docker network

## 🔁 Running Again (Without Rebuilding Everything)
If you are running the project multiple times:
- docker compose build --no-cache
- docker compose up
---

## 🌐 Access the Application
Open Docker Desktop
- Go to Containers
- Find merchant_sys
- Make sure web services are running
Then open:
Frontend with Backend:	
- http://localhost:3001/login
Other Services:
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000
- RabbitMQ Management: http://localhost:15672   (Username: guest, Password: guest)
---

## 🛠 Tech Stack
Backend
- NestJS (TypeScript)
- TypeORM
- PostgreSQL

Frontend
- Next.js (React)
- Vanilla CSS Modules

Infrastructure
- Docker Compose
- Redis
- RabbitMQ
---

## ✨ Features
Merchant Authentication
- Register
- Login (JWT-based)
- Password hashing using bcrypt
Transactions
- Create Transactions
- Paginated Listing
- Protected Routes
- Merchant-level data isolation
Background Jobs
- Event publishing using RabbitMQ
Caching
- Redis caching for transaction lists
---

## 🏗 Security & Architecture
Clean Architecture
- Domain → Application → Infrastructure
Security
- bcrypt password hashing
- JWT authentication
- DTO validation
Data Isolation
- Merchants can only access their own transactions
---

## 📈 Production Improvements (Scaling & Security)
If running at scale in production:
1️⃣ Architecture & Performance
Database
- PostgreSQL read replicas
- Connection pooling (PgBouncer)
- Schema migrations
Caching Strategy
- Event-driven cache invalidation (CDC/events)
Microservices
- Extract Transactions module as separate service
- Communication via gRPC or RabbitMQ
Load Balancing
- Multiple API & Frontend instances
- Nginx or AWS ALB
- Kubernetes deployment
2️⃣ Security Improvements
Use Vault or AWS Secrets Manager instead of .env
Distributed Rate Limiting (Redis-based)
PCI-DSS compliance (if handling real card data)
Observability stack:
- Open Telemetry
- Prometheus
- Grafana
---

## 📄 License
All Rights Reserved © Murtuza Developer
---
