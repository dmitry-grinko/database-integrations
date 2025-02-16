const express = require('express');
const router = express.Router();

module.exports = (pool) => {
    // CREATE - Add a new item
    router.post('/items', async (req, res) => {
        const { name, description } = req.body;
        
        const query = 'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING id';
        try {
            const result = await pool.query(query, [name, description]);
            res.status(201).json({
                id: result.rows[0].id,
                message: 'Item created successfully'
            });
        } catch (err) {
            console.error('Error creating item:', err);
            res.status(500).json({ error: 'Error creating item' });
        }
    });

    // READ - Get all items
    router.get('/items', async (req, res) => {
        const query = 'SELECT * FROM items';
        try {
            const result = await pool.query(query);
            res.json(result.rows);
        } catch (err) {
            console.error('Error fetching items:', err);
            res.status(500).json({ error: 'Error fetching items' });
        }
    });

    // READ - Get single item by ID
    router.get('/items/:id', async (req, res) => {
        const id = req.params.id;
        const query = 'SELECT * FROM items WHERE id = $1';
        
        try {
            const result = await pool.query(query, [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Item not found' });
            }
            res.json(result.rows[0]);
        } catch (err) {
            console.error('Error fetching item:', err);
            res.status(500).json({ error: 'Error fetching item' });
        }
    });

    // UPDATE - Update an item
    router.put('/items/:id', async (req, res) => {
        const id = req.params.id;
        const { name, description } = req.body;
        
        const query = 'UPDATE items SET name = $1, description = $2 WHERE id = $3 RETURNING *';
        try {
            const result = await pool.query(query, [name, description, id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Item not found' });
            }
            res.json({ message: 'Item updated successfully' });
        } catch (err) {
            console.error('Error updating item:', err);
            res.status(500).json({ error: 'Error updating item' });
        }
    });

    // DELETE - Delete an item
    router.delete('/items/:id', async (req, res) => {
        const id = req.params.id;
        
        const query = 'DELETE FROM items WHERE id = $1 RETURNING *';
        try {
            const result = await pool.query(query, [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Item not found' });
            }
            res.json({ message: 'Item deleted successfully' });
        } catch (err) {
            console.error('Error deleting item:', err);
            res.status(500).json({ error: 'Error deleting item' });
        }
    });

    return router;
};
