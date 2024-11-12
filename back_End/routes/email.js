

const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController'); 

router.route('/pin')
    .post(emailController.handleSendPin);
module.exports = router;

