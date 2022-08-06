const db = require('../db/connection');
require('console.table');

function allEmployees() {
  const sql = `SELECT  e.last_name, e.first_name, e.id, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
                FROM employees e
                LEFT JOIN roles r
                ON e.role_id = r.id
                LEFT JOIN departments d
                ON d.id = r.department_id
                LEFT JOIN employees m
                ON m.id = e.manager_id
                ORDER BY last_name`;

  db.promise()
    .query(sql)
    .then(([rows]) => {
      console.log('\n');
      console.table(rows);
    });
  return;
}

// To be added later
// deleteEmployee = function () {};

module.exports = {
  allEmployees,
  // deleteEmployee
};
