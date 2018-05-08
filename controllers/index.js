const express = require('express');
// eslint-disable-next-line
const router = express.Router();
const userController = require('./users');

router.use('/users', userController);

module.exports = router;
