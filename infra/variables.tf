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
