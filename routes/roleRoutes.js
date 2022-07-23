const express = require('express');
const router = express.Router();

const db = require('../db/connection');

// Get all roles
router.get('/', (req, res) => {
  const sql = `SELECT r.id, r.title, d.name AS department, r.salary
            FROM roles r
            LEFT JOIN departments d ON r.department_id = d.id
  `;
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

// Add role
router.post('/', ({ body }, res) => {
  const sql = `INSERT INTO roles (title, salary, department_id)
              VALUES (?, ?, ?)`;
  const params = [body.title, body.salary, body.department_id];

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
