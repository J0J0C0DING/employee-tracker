const express = require('express');

const router = express.Router();

const db = require('../db/connection');

// Get all departments
router.get('/', (req, res) => {
  const sql = `SELECT * FROM departments
  ORDER BY departments.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

router.post('/', ({ body }, res) => {
  const sql = `INSERT INTO departments (name)
  VALUES (?)`;
  const params = [body.name];

  db.query(sql, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows,
    });
  });
});

module.exports = router;
