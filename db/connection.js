const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username
    user: 'root',
    // MySQL passcode
    password: 'Amer1pr!se2022',
    database: 'employee_tracker',
  },
  console.log('Connected to the employee tracker database')
);

module.exports = db;
