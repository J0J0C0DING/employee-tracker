const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username
    user: 'root',
    // MySQL passcode
    password: '!Git$Hub1234',
    database: 'employee_tracker',
  },
  console.log('Connected to the employee tracker database')
);

module.exports = db;
