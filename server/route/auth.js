const express = require('express');
const authController = require('../controller/auth');

const router = express.Router();

router.post('/google', authController.login);

module.exports = router;
