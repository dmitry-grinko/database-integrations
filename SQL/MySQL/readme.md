# MySQL

## Prerequisites

Install MySQL client:

### On macOS:
```bash
brew install mysql-client
```

### On Ubuntu/Debian:
```bash
sudo apt-get update
sudo apt-get install mysql-client
```

### On CentOS/RHEL:
```bash
sudo yum install mysql
```

## Usage

1. Copy `.env.example` to `.env` and configure:
   - MYSQL_ROOT_PASSWORD is required
   - MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD are used by init.sql

2. Create `my.cnf` from `my.cnf.example` and update with your credentials
   - Make sure to set proper permissions: `chmod 600 my.cnf`

3. Build and run:
```bash
docker build -t mysql .
docker run -d --name mysql -p 3306:3306 --env-file .env mysql
```

4. Connect to MySQL:
```bash
mysql --defaults-file=my.cnf
```
To exit the MySQL client, type `exit` or press Ctrl+D

## Troubleshooting

If you can't connect, check:
- Container is running: `docker ps | grep mysql`
- Container logs: `docker logs mysql`
- Port 3306 is not used by another process
- `.env` file has MYSQL_ROOT_PASSWORD set

Note: Both `.env` and `my.cnf` files contain sensitive information and are ignored by git.

