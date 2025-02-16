const express = require('express');
const router = express.Router();

module.exports = (dataSource) => {
    const userRepository = dataSource.getRepository("User");

    // Get all users
    router.get('/users', async (req, res) => {
        try {
            const users = await userRepository.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Get user by ID
    router.get('/users/:id', async (req, res) => {
        try {
            const user = await userRepository.findOne({
                where: { id: parseInt(req.params.id) }
            });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Create new user
    router.post('/users', async (req, res) => {
        try {
            const user = await userRepository.save(req.body);
            res.status(201).json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Update user
    router.put('/users/:id', async (req, res) => {
        try {
            const result = await userRepository.update(
                req.params.id,
                req.body
            );
            if (result.affected === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            const updatedUser = await userRepository.findOne({
                where: { id: parseInt(req.params.id) }
            });
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Delete user
    router.delete('/users/:id', async (req, res) => {
        try {
            const result = await userRepository.delete(req.params.id);
            if (result.affected === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    return router;
}; 