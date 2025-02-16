FROM mariadb:latest

# Copy custom configuration if needed
COPY my.cnf /etc/mysql/conf.d/

# Copy initialization scripts
COPY init.sql /docker-entrypoint-initdb.d/

# Expose MariaDB port
EXPOSE 3306