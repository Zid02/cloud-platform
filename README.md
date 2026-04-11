# Cloud Platform

## Run locally with Docker Compose

1. Build and start services:
```bash
docker compose up -d --build
```

2. Confirm services:
- Backend: http://localhost:4000/api/hello
- Frontend: http://localhost:8080

3. Stop services:
```bash
docker compose down
```

## Project structure
- `backend/`: Express Node backend
- `frontend/`: Static HTML served by Nginx
- `docker-compose.yml`: Compose service definitions

## CI/CD overview
- `ci.yml`: runs backend lint and tests on pushes/PRs to `main` and `develop`.
- `deploy.yml`: on push to `main`, builds/pushes backend image to ECR, applies Terraform, uploads frontend assets to S3, and invalidates CloudFront.

## Cloud deployment architecture
- Backend: ECS Fargate service behind an ALB.
- Frontend: static assets in S3 behind CloudFront.
- API routing: CloudFront routes `/api/*` to the backend ALB origin.
