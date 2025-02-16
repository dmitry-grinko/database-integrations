const express = require('express');
const router = express.Router();

// Helper function to convert BigInt values
const convertBigIntToNumber = (rows) => {
  const convertRow = (row) => {
    const converted = {};
    for (const [key, value] of Object.entries(row)) {
      converted[key] = typeof value === 'bigint' ? Number(value) : value;
    }
    return converted;
  };
  
  return Array.isArray(rows) ? rows.map(convertRow) : convertRow(rows);
};

// GET all items
router.get('/items', async (req, res) => {
  let conn;
  try {
    conn = await req.app.locals.pool.getConnection();
    const rows = await conn.query('SELECT * FROM items');
    res.json(convertBigIntToNumber(rows));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (conn) conn.release();
  }
});

// GET single item by ID
router.get('/items/:id', async (req, res) => {
  let conn;
  try {
    conn = await req.app.locals.pool.getConnection();
    const rows = await conn.query('SELECT * FROM items WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json(convertBigIntToNumber(rows[0]));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (conn) conn.release();
  }
});

// CREATE new item
router.post('/items', async (req, res) => {
  let conn;
  try {
    conn = await req.app.locals.pool.getConnection();
    const { name, description, price } = req.body;
    
    const result = await conn.query(
      'INSERT INTO items (name, description, price) VALUES (?, ?, ?)',
      [name, description, price]
    );
    
    res.status(201).json(convertBigIntToNumber({
      id: result.insertId,
      name,
      description,
      price
    }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (conn) conn.release();
  }
});

// UPDATE item
router.put('/items/:id', async (req, res) => {
  let conn;
  try {
    conn = await req.app.locals.pool.getConnection();
    const { name, description, price } = req.body;
    
    const result = await conn.query(
      'UPDATE items SET name = ?, description = ?, price = ? WHERE id = ?',
      [name, description, price, req.params.id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json(convertBigIntToNumber({
      id: req.params.id,
      name,
      description,
      price
    }));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (conn) conn.release();
  }
});

// DELETE item
router.delete('/items/:id', async (req, res) => {
  let conn;
  try {
    conn = await req.app.locals.pool.getConnection();
    const result = await conn.query('DELETE FROM items WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
