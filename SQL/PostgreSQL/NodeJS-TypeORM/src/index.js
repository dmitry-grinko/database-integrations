require('reflect-metadata'); // This should be the first import
const express = require('express');
const { DataSource } = require('typeorm');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config(); // Let dotenv find the .env file in the project root

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Create TypeORM DataSource
const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '', // Add empty string as fallback
    database: process.env.DB_NAME || 'mydb',
    entities: [__dirname + "/entities/**/*.js"], // Updated entities path
    synchronize: process.env.NODE_ENV !== 'production', // Don't use in production!
    logging: process.env.NODE_ENV !== 'production',
    connectTimeoutMS: 10000,
    retryAttempts: 10,
    retryDelay: 5000,
});

// Add event listeners to the DataSource
AppDataSource.setOptions({
    subscribers: [],
    listeners: {
        becameConnected: () => {
            console.log('Database connection established');
        },
        disconnected: () => {
            console.log('Database connection lost');
        }
    }
});

const initializeDB = async () => {
    // Validate database credentials before attempting connection
    if (!process.env.DB_PASSWORD) {
        console.error('Database password is not set. Please check your .env file and ensure DB_PASSWORD is configured.');
        process.exit(1);
    }

    try {
        await AppDataSource.initialize();
        console.log('Connected to PostgreSQL database using TypeORM');
        return AppDataSource;
    } catch (err) {
        console.error('Error connecting to PostgreSQL database:', err);
        if (err.code === 'ENOTFOUND') {
            console.error(`Cannot resolve hostname "${process.env.DB_HOST}". Make sure PostgreSQL is running and the host is correct.`);
        } else if (err.code === 'ECONNREFUSED') {
            console.error(`Connection refused. Make sure PostgreSQL is running on ${process.env.DB_HOST}:${process.env.DB_PORT || 5432}`);
        } else if (err.message.includes('SASL')) {
            console.error('Authentication failed. Please check your database username and password in the .env file.');
        }
        process.exit(1);
    }
};

(async () => {
    try {
        const dataSource = await initializeDB();

        // Remove the incorrect event listener code and replace with proper connection handling
        dataSource.isInitialized && console.log('Database connection is ready');

        // Import and use routes AFTER database is connected
        const routes = require('./routes')(dataSource);
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