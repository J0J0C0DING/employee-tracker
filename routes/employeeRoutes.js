const express = require('express');
const router = express.Router();

const db = require('../db/connection');

// Get all employees
router.get('/', (req, res) => {
  const sql = `SELECT  e.last_name, e.first_name, e.id, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
              FROM employees e
              LEFT JOIN roles r
	            ON e.role_id = r.id
              LEFT JOIN departments d
              ON d.id = r.department_id
              LEFT JOIN employees m
	            ON m.id = e.manager_id
              ORDER BY last_name`;
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
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
              VALUES (?, ?, ?, ?)`;
  const params = [body.first_name, body.last_name, body.role_id, body.manager_id];

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

router.put('/:id', (req, res) => {
  const sql = `UPDATE employees SET role_id = ?
              WHERE id = ?`;
  const params = [req.body.role_id, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Employee not found',
      });
    } else {
      res.json({
        message: 'success',
        data: req.body,
        changes: result.affectedRows,
      });
    }
  });
});

module.exports = router;
