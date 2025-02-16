# Use official MySQL image as base
FROM mysql:8

# Environment variables will be loaded from .env file when running the container
# using docker run --env-file .env

# Custom MySQL configuration if needed
COPY my.cnf /etc/mysql/conf.d/

# Expose MySQL port
EXPOSE 3306

# Add bind-address configuration
CMD ["mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci", "--bind-address=0.0.0.0"]

COPY init.sql /docker-entrypoint-initdb.d/
