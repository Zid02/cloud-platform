aws_region = "us-east-1"
app_name = "cloud-platform"
ecr_repository_name = "cloud-platform-backend"
container_port = 4000
desired_count = 1
frontend_bucket_name = ""
image_uri = "<account-id>.dkr.ecr.us-east-1.amazonaws.com/cloud-platform-backend:<tag>"

# Database
db_instance_class = "db.t3.micro"
db_name = "cloudplatform"
db_username = "postgres"
db_password = "Aurora@06"
