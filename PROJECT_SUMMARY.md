# Cloud Platform - Project Summary

> **Last Updated:** April 20, 2026  
> **Repository:** https://github.com/Zid02/cloud-platform

---

## 📋 Project Overview

A full-stack cloud platform with React frontend, Express backend, PostgreSQL database, deployed on AWS using ECS Fargate, CloudFront, and Terraform.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        AWS Cloud                                │
│  ┌─────────────┐    ┌─────────────┐    ┌──────────────────┐   │
│  │ CloudFront  │───▶│     ALB     │───▶│  ECS Fargate     │   │
│  │   (CDN)     │    │  (Router)   │    │  (Backend)       │   │
│  └─────────────┘    └─────────────┘    └────────┬─────────┘   │
│       │                                          │             │
│       ▼                                          ▼             │
│  ┌─────────────┐                      ┌──────────────────┐    │
│  │     S3      │                      │   RDS PostgreSQL │    │
│  │ (Frontend)  │                      │    (Database)    │    │
│  └─────────────┘                      └──────────────────┘    │
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐                           │
│  │CloudWatch   │    │ Secrets Mgr │                           │
│  │ (Logging)   │    │ (Password)  │                           │
│  └─────────────┘    └─────────────┘                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
cloud-platform/
├── .github/
│   └── workflows/
│       ├── ci.yml          # Lint & test on PR/push
│       └── deploy.yml      # Full CI/CD to AWS
├── backend/
│   ├── src/
│   │   ├── app.js          # Express app with PostgreSQL
│   │   └── server.js       # Server entry point
│   ├── package.json        # Dependencies (express, pg)
│   ├── Dockerfile          # Node.js container
│   └── vitest.config.js    # Test configuration
├── frontend/
│   ├── src/
│   │   ├── main.jsx        # React entry
│   │   ├── App.jsx         # Main component
│   │   └── index.css       # Styles
│   ├── index.html          # HTML template
│   ├── package.json        # Dependencies (react, vite)
│   ├── vite.config.js      # Vite configuration
│   └── Dockerfile          # Multi-stage build (Vite → Nginx)
├── infra/
│   ├── main.tf             # AWS resources (ECS, RDS, ALB, etc.)
│   ├── variables.tf        # Terraform variables
│   ├── outputs.tf          # Deployment outputs
│   ├── provider.tf         # AWS provider config
│   └── terraform.tfvars    # Environment values
├── docker-compose.yml      # Local development stack
└── README.md               # Project documentation
```

---

## ✅ What Was Built

### 1. Backend (Express + PostgreSQL)
- **Endpoints:**
  - `GET /api/health` — Health check with DB status
  - `GET /api/hello` — Test endpoint
  - `GET /api/db-version` — PostgreSQL version
- **Database:** PostgreSQL 16 with connection pooling via `pg` package
- **Testing:** Vitest with coverage

### 2. Frontend (React + Vite)
- Modern React 18 application
- Displays application status, environment, database connection
- API endpoints documentation
- Styled with custom CSS (dark theme)
- Multi-stage Docker build (Vite → Nginx)

### 3. Local Development (Docker Compose)
```bash
docker-compose up --build
```
- Backend: http://localhost:4000
- Frontend: http://localhost:8080
- Database: localhost:5432

### 4. AWS Infrastructure (Terraform)
| Resource | Purpose |
|----------|---------|
| ECS Cluster | Container orchestration |
| ECS Task Definition | Container configuration |
| ECS Service | Running tasks |
| Application Load Balancer | Traffic routing |
| RDS PostgreSQL | Database |
| Secrets Manager | DB password storage |
| S3 Bucket | Frontend static files |
| CloudFront | CDN for frontend + API |
| CloudWatch Log Group | Container logs |
| CloudWatch Alarms | Monitoring alerts |

### 5. CI/CD (GitHub Actions)
- **CI Pipeline (`ci.yml`):**
  - Runs on push to `main`/`develop` and PRs
  - Lints backend code

- **Deploy Pipeline (`deploy.yml`):**
  - Runs on push to `main`
  - Installs deps, lints, tests
  - Builds Docker image
  - Pushes to ECR
  - Runs Terraform apply
  - Syncs frontend to S3
  - Invalidates CloudFront cache

### 6. Monitoring (CloudWatch)
- **Log Group:** `/ecs/cloud-platform` (7-day retention)
- **Alarms:**
  - ECS CPU > 80%
  - ECS Memory > 80%
  - ALB unhealthy targets
  - RDS CPU > 80%
  - RDS connections > 80

---

## 🚀 How to Deploy

### Prerequisites
1. AWS Account with credentials
2. GitHub repository with secrets configured

### GitHub Secrets Required
| Secret | Value |
|--------|-------|
| `AWS_ACCESS_KEY_ID` | IAM user with permissions |
| `AWS_SECRET_ACCESS_KEY` | IAM user secret |
| `AWS_REGION` | e.g., `us-east-1` |
| `DB_PASSWORD` | Strong password for RDS |

### Deployment Steps
```bash
# 1. Clone and configure
git clone https://github.com/Zid02/cloud-platform.git
cd cloud-platform

# 2. Update terraform.tfvars with your values
cp infra/terraform.tfvars.example infra/terraform.tfvars
# Edit infra/terraform.tfvars

# 3. Push to main (triggers deploy)
git add -A
git commit -m "Initial deployment"
git push origin main
```

### View Deployment
- **GitHub Actions:** https://github.com/Zid02/cloud-platform/actions
- **AWS Console:**
  - ECS: https://console.aws.amazon.com/ecs
  - RDS: https://console.aws.amazon.com/rds
  - CloudFront: https://console.aws.amazon.com/cloudfront
  - CloudWatch: https://console.aws.amazon.com/cloudwatch

---

## 🔗 Useful Links

| Service | URL |
|---------|-----|
| GitHub Repository | https://github.com/Zid02/cloud-platform |
| GitHub Actions | https://github.com/Zid02/cloud-platform/actions |
| AWS Console | https://console.aws.amazon.com |
| ECS Clusters | https://console.aws.amazon.com/ecs |
| RDS Databases | https://console.aws.amazon.com/rds |
| CloudFront | https://console.aws.amazon.com/cloudfront |
| CloudWatch Logs | https://console.aws.amazon.com/cloudwatch |
| ECR Repositories | https://console.aws.amazon.com/ecr |

---

## 📊 Current Status

| Component | Status |
|-----------|--------|
| Backend (Express + pg) | ✅ Ready |
| Frontend (React + Vite) | ✅ Ready |
| PostgreSQL (Local + RDS) | ✅ Ready |
| Docker Compose | ✅ Ready |
| Terraform (AWS) | ✅ Ready |
| CI/CD (GitHub Actions) | ✅ Ready |
| Monitoring (CloudWatch) | ✅ Ready |

---

## 🔄 Next Steps (Optional)

1. **Add more API endpoints** — CRUD operations for data
2. **Add authentication** — JWT or OAuth
3. **Add HTTPS** — ACM certificate for CloudFront
4. **Add more alarms** — Error rates, response times
5. **Add CI for frontend** — Lint, test React app
6. **Add Terraform backend** — S3 state storage

---

## 📝 Commands Reference

```bash
# Local development
docker-compose up --build

# Run backend tests
cd backend && npm test

# Lint backend
cd backend && npm run lint

# Build frontend
cd frontend && npm run build

# Terraform
cd infra
terraform init
terraform plan
terraform apply -var-file=terraform.tfvars
terraform output
```

---

*Generated on April 20, 2026*