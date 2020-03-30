const express = require('express');
const controller = require('../controller/user');
const auth = require('../middleware/authenticate');

const router = express.Router();

// get my account info
router.get('/', auth, controller.getMyProfile);

module.exports = router;
