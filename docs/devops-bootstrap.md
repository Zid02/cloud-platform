# DevOps Bootstrap Guide

## Prerequisites
- Docker Desktop installed and running
- AWS CLI configured (`aws configure`)
- GitHub repo with secrets:
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `AWS_REGION`
  - `AWS_ACCOUNT_ID`

## Local quick start
1. Start backend:
   - `cd backend`
   - `npm run dev`
2. Build and run full stack:
   - `cd ..`
   - `docker compose up --build`
3. Open:
   - Backend: `http://localhost:4000/api/health`
   - Frontend: `http://localhost:8080`

## GitHub CI/CD
- On push to `main`, two workflows run:
   - `ci.yml` (backend lint/test)
   - `deploy.yml` (build/push backend image, terraform apply, frontend sync, CloudFront invalidation)

## AWS deployment flow
1. Ensure AWS credentials are set in GitHub secrets.
2. Push code to `main`.
3. Monitor Actions run and wait for `terraform apply` completion.
4. The output in logs includes `app_url` (backend) and `frontend_url` (CloudFront).

## Terraform notes
- Terraform configuration is in `infra/`.
- Deploy uses default VPC and public subnets.
- Frontend is deployed to S3 and served through CloudFront.
- CloudFront forwards `/api/*` requests to the backend ALB.
- Update `infra/variables.tf` defaults as needed.
