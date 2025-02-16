const express = require('express');
const Redis = require('redis');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Create Redis client
const client = Redis.createClient({
    url: 'redis://localhost:6379'
});

// Connect to Redis
(async () => {
    await client.connect();
})();

// Handle Redis errors
client.on('error', err => console.log('Redis Client Error', err));

// Use routes
app.use('/api', routes(client));

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
