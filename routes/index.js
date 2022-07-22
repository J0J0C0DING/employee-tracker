const express = require('express');
const router = express.Router();

const departmentRoutes = require('./departmentRoutes');
const roleRoutes = require('./roleRoutes');
const employeeRoutes = require('./employeeRoutes');

router.use('/departments', departmentRoutes);
router.use('/roles', roleRoutes);
router.use('/employees', employeeRoutes);

module.exports = router;
