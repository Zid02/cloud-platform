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
