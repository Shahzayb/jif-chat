const express = require('express');
const controller = require('../controller/post');

const router = express.Router();

router.get('/', controller.getPosts);

module.exports = router;
