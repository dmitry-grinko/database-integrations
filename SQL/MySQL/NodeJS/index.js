const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Create MySQL connection with retry logic
const connectWithRetry = () => {
  const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'mydb',
    port: process.env.DB_PORT || 3306,
    // Add connection timeout
    connectTimeout: 10000
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      if (err.code === 'ENOTFOUND') {
        console.error(`Cannot resolve hostname "${process.env.DB_HOST}". Make sure MySQL is running and the host is correct.`);
      } else if (err.code === 'ECONNREFUSED') {
        console.error(`Connection refused. Make sure MySQL is running on ${process.env.DB_HOST}:${process.env.DB_PORT || 3306}`);
      }
      console.log('Retrying in 5 seconds...');
      setTimeout(connectWithRetry, 5000);
      return;
    }
    console.log('Connected to MySQL database');
  });

  connection.on('error', (err) => {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('Lost connection to MySQL. Reconnecting...');
      connectWithRetry();
    } else if (!err.fatal) {
      // Handle non-fatal errors
      console.error('Non-fatal database error:', err);
    } else {
      console.error('Fatal database error:', err);
      process.exit(1); // Exit on fatal errors
    }
  });

  return connection;
};

const connection = connectWithRetry();

// Import and use routes
const routes = require('./routes')(connection);
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
