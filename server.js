const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./db/connection');

const { allDepartments } = require('./lib/Departments');
const { allEmployees } = require('./lib/Employees');
const { allRoles } = require('./lib/Roles');

// MySQL connection
db.connect(function (err) {
  if (err) throw err;
  console.log('Connected');
  console.log(`
  ╔═══╗─────╔╗──────────────╔═╗╔═╗
  ║╔══╝─────║║──────────────║║╚╝║║
  ║╚══╦╗╔╦══╣║╔══╦╗─╔╦══╦══╗║╔╗╔╗╠══╦═╗╔══╦══╦══╦═╗
  ║╔══╣╚╝║╔╗║║║╔╗║║─║║║═╣║═╣║║║║║║╔╗║╔╗╣╔╗║╔╗║║═╣╔╝
  ║╚══╣║║║╚╝║╚╣╚╝║╚═╝║║═╣║═╣║║║║║║╔╗║║║║╔╗║╚╝║║═╣║
  ╚═══╩╩╩╣╔═╩═╩══╩═╗╔╩══╩══╝╚╝╚╝╚╩╝╚╩╝╚╩╝╚╩═╗╠══╩╝
  ───────║║──────╔═╝║─────────────────────╔═╝║
  ───────╚╝──────╚══╝─────────────────────╚══╝`);
  // Start application
  start();
});

const start = function () {
  inquirer
    .prompt({
      type: 'list',
      name: 'task',
      message: 'Select task:',
      choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View Departments', 'Add Department', 'Quit'],
      loop: false,
    })
    .then(taskChoosen => {
      const { task } = taskChoosen;

      switch (task) {
        case 'View All Employees':
          allEmployees();
          console.log('\n');
          setTimeout(start, 200);
          break;

        case 'Add Employee':
          addEmployee();
          break;

        case 'Update Employee Role':
          updateEmployee();
          break;

        case 'View All Roles':
          allRoles();
          console.log('\n');
          setTimeout(start, 200);
          break;

        case 'Add Role':
          addRole();
          console.log('\n');
          break;

        case 'View Departments':
          allDepartments();
          console.log('\n');
          setTimeout(start, 200);
          break;

        case 'Add Department':
          addDepartment();
          console.log('\n');
          break;

        case 'Quit':
          db.end();
          break;

        default:
          return;
      }
    });
};

// Reused Queries
const allRolesQuery = `SELECT r.id, r.title, r.salary 
FROM roles r;
`;

function addEmployee() {
  console.log('Inserting an employee:');

  const managerQuery = `SELECT e.last_name, e.first_name, e.id, r.title, d.name AS department
  FROM employees e
  LEFT JOIN roles r
  ON e.role_id = r.id
  LEFT JOIN departments d
  ON d.id = r.department_id
  ORDER BY last_name`;

  db.query(managerQuery, function (err, res) {
    if (err) throw err;
    console.table(res);
  });

  db.query(allRolesQuery, function (err, res) {
    if (err) throw err;

    roleChoices = res.map(({ id, title, salary }) => ({
      value: id,
      title: `${title}`,
      salary: `${salary}`,
    }));

    console.log(`
    --------------------------------------
    \u25B2 All Employees \u25B2 | \u25BC List of Roles \u25BC
    --------------------------------------`);
    console.table(res);
    promptInsert(roleChoices);
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
        name: 'role_id',
        message: "What is the new employee's role?",
        choices: roleChoices,
      },
      {
        type: 'input',
        name: 'manager_id',
        message: "What is your manager's id number? (Leave empty if N/A)",
      },
    ])
    .then(function (result) {
      console.log(result);

      let manager_id;
      if (!result.manager_id) {
        manager_id = null;
      }

      const query = `INSERT INTO employees SET ?`;
      // when finished prompting, insert a new item into the db with that info
      db.query(
        query,
        {
          first_name: result.first_name,
          last_name: result.last_name,
          role_id: result.role_id,
          manager_id: manager_id,
        },
        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.affectedRows + ' employee inserted\n');

          start();
        }
      );
    });
}

// ---------UPDATE EMPLOYEE -------------
function updateEmployee() {
  const query = `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department
                FROM employees e
                JOIN roles r
	              ON e.role_id = r.id
                JOIN departments d
                ON d.id = r.department_id
                ORDER BY last_name`;

  db.query(query, function (err, res) {
    if (err) throw err;

    const allEmployees = res.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${last_name}, ${first_name}`,
    }));

    console.log(`
    -----------------
    All Employees
    -----------------`);
    console.table(res);

    getCurrentRole(allEmployees);
  });
}

// --------- Get all employees and their roles -------------
function getCurrentRole(allEmployees) {
  let allRoles;

  db.query(allRolesQuery, function (err, res) {
    if (err) throw err;

    allRoles = res.map(({ id, title, salary }) => ({
      value: id,
      title: `${title}`,
      salary: `${salary}`,
    }));

    console.log(`
    -----------------
    All Roles
    -----------------`);
    console.table(res);

    promptUpdateRole(allEmployees, allRoles);
  });
}

// --------- Prompt User to select which employee to change and which role to update to -------------
function promptUpdateRole(allEmployees, allRoles) {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'employee_id',
        message: 'Which employee do you want to set with the role?',
        choices: allEmployees,
      },
      {
        type: 'list',
        name: 'role_id',
        message: 'Which role do you want to update?',
        choices: allRoles,
      },
    ])
    .then(function (result) {
      const query = `UPDATE employees SET role_id = ? WHERE id = ?`;

      db.query(query, [result.role_id, result.employee_id], function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log(res.affectedRows + ' employee updated \n');

        start();
      });
    });
}
// ---------END UPDATE EMPLOYEE -------------

// --------- ADD ROLE -------------
function addRole() {
  var query = `SELECT d.id, d.name
    FROM departments d`;

  db.query(query, function (err, res) {
    if (err) throw err;

    const departmentChoices = res.map(({ id, name }) => ({
      value: id,
      name: `${id} ${name}`,
    }));

    console.table(res);
    console.log(`
    -----------------
    \u25B2 All Departments \u25B2
    -----------------`);

    promptAddRole(departmentChoices);
  });
}

function promptAddRole(departmentChoices) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'role_title',
        message: 'Enter the title of this role:',
      },
      {
        type: 'input',
        name: 'role_salary',
        message: "Enter the role's salary:",
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'Enter department this role belong to:',
        choices: departmentChoices,
      },
    ])
    .then(function (result) {
      const query = `INSERT INTO roles SET ?`;

      db.query(
        query,
        {
          title: result.role_title,
          salary: result.role_salary,
          department_id: result.department_id,
        },

        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.affectedRows + ' role added \n');

          start();
        }
      );
    });
}
// ---------END ADD ROLE--------------

// ---------ADD DEPARTMENT-----------
function addDepartment() {
  allDepartments();

  inquirer
    .prompt([
      {
        type: 'input',
        name: 'department_title',
        message: 'Enter the name of new department:',
      },
    ])
    .then(function (result) {
      const query = `INSERT INTO departments SET ?`;

      db.query(
        query,
        {
          name: result.department_title,
        },

        function (err, res) {
          if (err) throw err;

          console.table(res);
          console.log(res.affectedRows + ' department added \n');

          start();
        }
      );
    });
}

// ---------END ADD DEPARTMENT--------------
