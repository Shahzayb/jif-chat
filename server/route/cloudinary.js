const express = require('express');
const controller = require('../controller/cloudinary');
const auth = require('../middleware/authenticate');
const authCloudinary = require('../middleware/authenticateCloudinary');

const router = express.Router();

// a signature for authenticated user
router.get('/signature', auth, controller.getSignature);

// a signature for unauthenticated user
router.get('/public-signature', controller.getPublicSignature);

router.post('/webhook', authCloudinary, controller.postWebhook);

module.exports = router;
