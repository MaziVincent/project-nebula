const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.route('/')
    .get(adminController.handleAdmins)
    .post(adminController.handleAdminCreate)

module.exports = router;