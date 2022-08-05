const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./db/connection');

const { allDepartments, addDepartment, deleteDepartment } = require('./lib/Departments');
const { allEmployees, addEmployee, deleteEmployee } = require('./lib/Employees');
const { allRoles, addRole, deleteRole } = require('./lib/Roles');

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
    .then(asynctaskChoosen => {
      const { task } = taskChoosen;
      await runFunction(task);
      return 1;
    })
    .then(() => {
      start();
    });
};

async function runFunction(choosenFunction) {
  if (choosenFunction == 'View All Employees') {
    allEmployees();
    return;
  } else if (choosenFunction == 'Add Employee') {
    addEmployee();
    return;
  }
}

// switch (choosenFunction) {
//   case 'View All Employees':
//     allEmployees();
//     console.log('\n');
//     break;

//   case 'Add Employee':
//     addEmployee();
//     break;

//   case 'Update Employee Role':
//     break;

//   case 'View All Roles':
//     allRoles();
//     console.log('\n');
//     break;

//   case 'Add Role':
//     addRole();
//     console.log('\n');
//     break;

//   case 'View Departments':
//     allDepartments();
//     console.log('\n');
//     start;
//     break;

//   case 'Add Department':
//     addDepartment();
//     console.log('\n');
//     break;

//   case 'Quit':
//     db.end();
//     break;

//   default:
//     return;
// }
//   });
// }
