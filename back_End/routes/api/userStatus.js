const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/:id')
    .put(verifyRoles('Admin'),userController.handleDeactivate)
    .put(verifyRoles('Admin'),userController.handleActivate)

module.exports = router;