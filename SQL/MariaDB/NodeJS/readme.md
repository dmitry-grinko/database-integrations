# NodeJS MariaDB Integration

This directory contains the NodeJS application that integrates with MariaDB. The application provides a RESTful API interface for database operations.


## Prerequisites

- Node.js (v14 or higher)
- MariaDB (running in Docker as described in parent directory)
- npm or yarn package manager

## Setup

1. Install dependencies:
```bash
npm install express mariadb dotenv
```

2. Configure environment variables:
Create a `.env` file with the following variables:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=your_database
PORT=3000
```

## Running the Application

Start the application:
```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3000).

## API Endpoints

The application exposes REST endpoints defined in `routes.js`. See the routes file for specific endpoint documentation.

## Database Connection

The application uses the official `mariadb` package to connect to MariaDB. Connection is established using a connection pool for better performance and resource management.

Example connection code from our implementation:
```javascript
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
  connectTimeout: 20000,
  acquireTimeout: 20000
});
```

Connection pool configuration:
- `connectionLimit`: Maximum number of connections in the pool (default: 5)
- `connectTimeout`: Timeout for establishing new connections (20 seconds)
- `acquireTimeout`: Timeout for acquiring a connection from the pool (20 seconds)

## Error Handling

The application implements error handling for:
- Database connection failures with detailed logging
- Invalid requests
- Missing resources
- Server errors through Express middleware

## Development

The application includes debugging features:
- Connection tracing
- Debug mode for detailed logging
- Environment variable validation

## Testing

Before running the application, you can verify the database connection:
```bash
npm start
```
The application will log connection status and details on startup.

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## Related Documentation

- For MariaDB setup and configuration, see the readme in the parent directory
- [MariaDB Node.js Connector Documentation](https://mariadb.com/kb/en/nodejs-connection-api/)
- [Express.js Documentation](https://expressjs.com/)
