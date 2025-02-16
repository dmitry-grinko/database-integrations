const express = require('express');
const router = express.Router();

module.exports = (connection) => {
    // CREATE - Add a new item
    router.post('/items', (req, res) => {
        const { name, description } = req.body;
        
        const query = 'INSERT INTO items (name, description) VALUES (?, ?)';
        connection.query(query, [name, description], (err, results) => {
            if (err) {
                console.error('Error creating item:', err);
                return res.status(500).json({ error: 'Error creating item' });
            }
            res.status(201).json({
                id: results.insertId,
                message: 'Item created successfully'
            });
        });
    });

    // READ - Get all items
    router.get('/items', (req, res) => {
        const query = 'SELECT * FROM items';
        connection.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching items:', err);
                return res.status(500).json({ error: 'Error fetching items' });
            }
            res.json(results);
        });
    });

    // READ - Get single item by ID
    router.get('/items/:id', (req, res) => {
        const id = req.params.id;
        const query = 'SELECT * FROM items WHERE id = ?';
        
        connection.query(query, [id], (err, results) => {
            if (err) {
                console.error('Error fetching item:', err);
                return res.status(500).json({ error: 'Error fetching item' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Item not found' });
            }
            res.json(results[0]);
        });
    });

    // UPDATE - Update an item
    router.put('/items/:id', (req, res) => {
        const id = req.params.id;
        const { name, description } = req.body;
        
        const query = 'UPDATE items SET name = ?, description = ? WHERE id = ?';
        connection.query(query, [name, description, id], (err, results) => {
            if (err) {
                console.error('Error updating item:', err);
                return res.status(500).json({ error: 'Error updating item' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Item not found' });
            }
            res.json({ message: 'Item updated successfully' });
        });
    });

    // DELETE - Delete an item
    router.delete('/items/:id', (req, res) => {
        const id = req.params.id;
        
        const query = 'DELETE FROM items WHERE id = ?';
        connection.query(query, [id], (err, results) => {
            if (err) {
                console.error('Error deleting item:', err);
                return res.status(500).json({ error: 'Error deleting item' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Item not found' });
            }
            res.json({ message: 'Item deleted successfully' });
        });
    });

    return router;
};
