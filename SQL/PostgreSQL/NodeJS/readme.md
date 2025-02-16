# Node.js PostgreSQL CRUD API

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
   - Copy `.env.example` to `.env`
   - Update the values in `.env` to match your PostgreSQL configuration

3. Make sure PostgreSQL is running:
   - If using Docker: `docker ps | grep postgres`
   - If local PostgreSQL: `psql --version`

4. Start the application:
```bash
npm start
```

## Environment Variables

- `DB_HOST`: PostgreSQL host (default: localhost)
- `DB_USER`: PostgreSQL username (default: postgres)
- `DB_PASSWORD`: PostgreSQL password
- `DB_NAME`: Database name (default: mydb)
- `DB_PORT`: PostgreSQL port (default: 5432)
- `PORT`: API server port (default: 3000)

## API Endpoints

- POST /api/items - Create a new item
- GET /api/items - Get all items
- GET /api/items/:id - Get a single item
- PUT /api/items/:id - Update an item
- DELETE /api/items/:id - Delete an item

## Troubleshooting

If you can't connect to PostgreSQL:
1. Check if PostgreSQL is running
2. Verify credentials in .env file
3. Make sure the database exists
4. Check connection errors:
   - ENOTFOUND: Check your DB_HOST setting
   - ECONNREFUSED: Make sure PostgreSQL is running and accessible
   - 28P01: Invalid password
   - 3D000: Database does not exist
