# PostgreSQL

## Prerequisites

Install PostgreSQL client:

### On macOS:
```bash
brew install postgresql
```

### On Ubuntu/Debian:
```bash
sudo apt-get update
sudo apt-get install postgresql-client
```

### On CentOS/RHEL:
```bash
sudo yum install postgresql
```

## Usage

1. Copy `.env.example` to `.env` and configure:
   - POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB are required
   - POSTGRES_PORT is optional, defaults to 5432

2. Build and run:
```bash
docker build -t postgres .
docker run -d --name postgres -p 5432:5432 --env-file .env postgres
```

3. Connect to PostgreSQL:
```bash
psql -h localhost -U postgres -d mydb
```

## Troubleshooting

If you can't connect, check:
- Container is running: `docker ps | grep postgres`
- Container logs: `docker logs postgres`
- Port 5432 is not used by another process
- `.env` file has POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB set
