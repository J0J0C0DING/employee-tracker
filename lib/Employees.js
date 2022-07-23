const db = require('../db/connection');
require('console.table');

const allEmployees = function () {
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
      return console.log(`Error: ${err.message}`);
    }
    return console.table(rows);
  });
};

const addEmployee = function (name) {
  const sql = `INSERT INTO departments (name) VALUES (?)`;
  const params = name;

  db.query(sql, params, (err, rows) => {
    if (err) {
      return console.log(`${err} : ${err.message}`);
    }
    return console.log(rows);
  });
};

const deleteEmployee = function () {};

module.exports = {
  allEmployees,
  addEmployee,
  deleteEmployee,
};
