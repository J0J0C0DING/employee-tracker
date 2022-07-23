const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./db/connection');
require('console.table');

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

function start() {
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
          break;

        case 'Add Employee':
          break;

        case 'Update Employee Role':
          break;

        case 'View All Roles':
          allRoles();
          console.log('//View All Roles Choosen//');
          break;

        case 'Add Role':
          break;

        case 'View Departments':
          allDepartments();
          break;

        case 'Add Department':
          addDepartment();
          break;

        case 'Quit':
          db.end();
          break;
      }
    });
}
