const express = require('express');
const controller = require('../controller/cloudinary');
const auth = require('../middleware/authenticate');
const authCloudinary = require('../middleware/authenticateCloudinary');

const router = express.Router();

// a signature is required to upload image
router.get('/signature', auth, controller.getSignature);

router.post('/webhook', authCloudinary, controller.postWebhook);

module.exports = router;
