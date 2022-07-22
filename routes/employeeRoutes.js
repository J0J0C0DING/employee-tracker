const express = require('express');
const router = express.Router();

const db = require('../db/connection');

// Get all employees
router.get('/', (req, res) => {
  const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title AS title, roles.salary, departments.name AS department, employees.manager_id
  FROM employees, roles, departments
  WHERE departments.id = roles.department_id AND roles.id = employees.role_id`;
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

module.exports = router;
