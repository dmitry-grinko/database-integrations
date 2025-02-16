const express = require('express');
const mariadb = require('mariadb');
const dotenv = require('dotenv');
const routes = require('./routes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create database connection pool
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
  connectTimeout: 20000,
  acquireTimeout: 20000,
  trace: true,
  debug: true
});

// Test database connection
pool.getConnection()
  .then(conn => {
    console.log('Database connection established');
    console.log('Connection info:', {
      threadId: conn.threadId,
      info: conn.info
    });
    conn.release();
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    console.error('Environment variables:', {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME
    });
  });

// Make pool available globally
app.locals.pool = pool;

// Routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
