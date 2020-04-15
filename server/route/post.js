const express = require('express');
const controller = require('../controller/post');
const auth = require('../middleware/authenticate');

const router = express.Router();

router.get('/', controller.getPosts);

router.delete('/:id', auth, controller.deletePost);

router.get('/events', controller.getEvents);

router.post('/ticket', controller.postTicket);

module.exports = router;
