const inquirer = require('inquirer');
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

function addEmployee() {
  console.log('Inserting an employee!');

  const roleQuery = `SELECT r.id, r.title, r.salary 
      FROM roles r`;

  db.query(roleQuery, function (err, res) {
    if (err) throw err;

    roleChoices = res.map(({ id, title, salary }) => ({
      value: id,
      title: `${title}`,
      salary: `${salary}`,
    }));

    console.table(res);
    console.log('\n');
    promptInsert(roleChoices);
  });

  const managerQuery = `SELECT e.last_name, e.first_name, e.id, r.title, d.name AS department
                          FROM employees e
                          LEFT JOIN roles r
                          ON e.role_id = r.id
                          LEFT JOIN departments d
                          ON d.id = r.department_id
                          ORDER BY last_name`;

  db.query(managerQuery, function (err, res) {
    if (err) throw err;

    console.log('\n');
    console.table(res);
  });
}

function promptInsert(roleChoices) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "What is the new employee's first name?",
      },
      {
        type: 'input',
        name: 'last_name',
        message: "What is the new employee's last name?",
      },
      {
        type: 'list',
        name: 'roleId',
        message: "What is the new employee's role?",
        choices: roleChoices,
      },
      {
        type: 'number',
        name: 'managerId',
        message: "What is your manager's id number?",
      },
    ])
    .then(function (answer) {
      console.log(answer);

      const query = `INSERT INTO employees SET ?`;
      // when finished prompting, insert a new item into the db with that info
      db.query(
        query,
        {
          first_name: answer.first_name,
          last_name: answer.last_name,
          role_id: answer.roleId,
          manager_id: answer.managerId,
        },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log('Inserted successfully!\n');
        }
      );
    });
}

deleteEmployee = function () {};

module.exports = {
  allEmployees,
  addEmployee,
  deleteEmployee,
};
