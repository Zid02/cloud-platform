output "app_url" {
  description = "HTTP URL for the deployed app"
  value       = "http://${aws_lb.app.dns_name}"
}

output "ecr_repository" {
  description = "ECR repository URI"
  value       = aws_ecr_repository.app.repository_url
}
