const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Create PostgreSQL pool with retry logic
const createPool = () => {
  return new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'mydb',
    port: process.env.DB_PORT || 5432,
    // Add connection timeout
    connectionTimeoutMillis: 10000
  });
};

const connectWithRetry = async () => {
  const pool = createPool();

  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL database');
    client.release();
    return pool;
  } catch (err) {
    console.error('Error connecting to PostgreSQL database:', err);
    if (err.code === 'ENOTFOUND') {
      console.error(`Cannot resolve hostname "${process.env.DB_HOST}". Make sure PostgreSQL is running and the host is correct.`);
    } else if (err.code === 'ECONNREFUSED') {
      console.error(`Connection refused. Make sure PostgreSQL is running on ${process.env.DB_HOST}:${process.env.DB_PORT || 5432}`);
    }
    console.log('Retrying in 5 seconds...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    return connectWithRetry();
  }
};

(async () => {
  try {
    const pool = await connectWithRetry();
    
    // Handle pool errors
    pool.on('error', (err) => {
      console.error('Unexpected database error:', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Lost connection to PostgreSQL. Reconnecting...');
        connectWithRetry();
      } else {
        console.error('Fatal database error:', err);
        process.exit(1);
      }
    });

    // Import and use routes AFTER pool is connected
    const routes = require('./routes')(pool);
    app.use('/api', routes);

    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: 'Something went wrong!' });
    });

    // Start the server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
})();
