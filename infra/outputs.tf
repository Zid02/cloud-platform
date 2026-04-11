output "app_url" {
  description = "HTTP URL for the deployed app"
  value       = "http://${aws_lb.app.dns_name}"
}

output "ecr_repository" {
  description = "ECR repository URI"
  value       = local.ecr_repository_url
}

output "frontend_bucket_name" {
  description = "S3 bucket name for frontend assets"
  value       = aws_s3_bucket.frontend.bucket
}

output "frontend_url" {
  description = "CloudFront URL for the deployed frontend"
  value       = "https://${aws_cloudfront_distribution.frontend.domain_name}"
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID used for invalidations"
  value       = aws_cloudfront_distribution.frontend.id
}
