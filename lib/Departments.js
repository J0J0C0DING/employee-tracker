const db = require('../db/connection');
require('console.table');
const inquirer = require('inquirer');

const allDepartments = function () {
  const sql = `SELECT * FROM departments ORDER BY departments.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      return console.log(`Error: ${err.message}`);
    }
    console.table(rows);
    let data = { rows };
    return data;
  });
};

const addDepartment = function () {
  inquirer
    .prompt({
      type: 'input',
      name: 'newDepartmentName',
      message: 'Enter the name of the new department:',
    })
    .then(departmentAdd => {
      const { newDepartmentName } = departmentAdd;

      const sql = `INSERT INTO departments (name) VALUES (?)`;
      const params = newDepartmentName;

      db.query(sql, params, (err, rows) => {
        if (err) {
          return console.log(`${err} : ${err.message}`);
        }
        console.table(rows);
        return;
      });
    });
};

const deleteDepartment = function () {};

module.exports = {
  allDepartments,
  addDepartment,
  deleteDepartment,
};
