variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
  default     = "us-east-1"
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "cloud-platform"
}

variable "ecr_repository_name" {
  description = "ECR repository name used by the backend image"
  type        = string
  default     = "cloud-platform-backend"
}

variable "container_port" {
  description = "Which container port the app listens on"
  type        = number
  default     = 4000
}

variable "image_uri" {
  description = "ECR image URI with tag for app container"
  type        = string
}

variable "desired_count" {
  description = "ECS desired count"
  type        = number
  default     = 1
}

variable "frontend_bucket_name" {
  description = "Optional custom S3 bucket name for frontend assets"
  type        = string
  default     = ""
}

variable "db_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t3.micro"
}

variable "db_name" {
  description = "Database name"
  type        = string
  default     = "cloudplatform"
}

variable "db_username" {
  description = "Database master username"
  type        = string
  default     = "postgres"
}

variable "db_password" {
  description = "Database master password"
  type        = string
  sensitive   = true
}
