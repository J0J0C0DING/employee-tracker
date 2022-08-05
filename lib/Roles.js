const inquirer = require('inquirer');
const db = require('../db/connection');

require('console.table');

const allRoles = function () {
  const sql = `SELECT r.id, r.title, d.name AS department, r.salary
              FROM roles r
              LEFT JOIN departments d ON r.department_id = d.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      return console.log(`Error: ${err.message}`);
    }
    return console.table(rows);
  });
};

const addRole = function () {
  inquirer
    .prompt(
      {
        type: 'input',
        name: 'newRoleTitle',
        message: 'Enter title of new role:',
      },
      {
        type: 'number',
        name: 'newRoleSalary',
        message: 'Enter the salary for this role:',
      },
      {
        type: 'number',
        name: 'departmentId',
        message: 'Enter department this role is in:',
      }
    )
    .then(roleData => {
      [{ newRoleTitle, newRoleSalary, departmentId }] = roleData;
      const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
      const params = [newRoleTitle, newRoleSalary, department_id];

      db.query(sql, params, (err, rows) => {
        if (err) {
          return console.log(`${err} : ${err.message}`);
        }
        return console.log(rows);
      });
    });
};

const deleteRole = function () {};

module.exports = {
  allRoles,
  addRole,
  deleteRole,
};
