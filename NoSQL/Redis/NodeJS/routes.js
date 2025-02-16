const express = require('express');
const router = express.Router();

module.exports = (client) => {
    // Health check
    router.get('/health', (req, res) => {
        res.json({ status: 'OK' });
    });

    // Basic key-value operations
    router.post('/set', async (req, res) => {
        try {
            const { key, value } = req.body;
            await client.set(key, value);
            res.json({ message: 'Value set successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.get('/get/:key', async (req, res) => {
        try {
            const value = await client.get(req.params.key);
            if (value === null) {
                return res.status(404).json({ message: 'Key not found' });
            }
            res.json({ value });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Counter operations
    router.post('/counter/:key/increment', async (req, res) => {
        try {
            const { amount = 1 } = req.body;
            const value = await client.incrBy(req.params.key, amount);
            res.json({ value });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // List operations
    router.post('/list/:key', async (req, res) => {
        try {
            const { values } = req.body;
            await client.lPush(req.params.key, values);
            res.json({ message: 'Values added to list' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.get('/list/:key', async (req, res) => {
        try {
            const list = await client.lRange(req.params.key, 0, -1);
            res.json({ list });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Hash operations
    router.post('/hash/:key', async (req, res) => {
        try {
            const { fields } = req.body;
            await client.hSet(req.params.key, fields);
            res.json({ message: 'Hash fields set successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    router.get('/hash/:key', async (req, res) => {
        try {
            const hash = await client.hGetAll(req.params.key);
            if (Object.keys(hash).length === 0) {
                return res.status(404).json({ message: 'Hash not found' });
            }
            res.json({ hash });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    return router;
};
