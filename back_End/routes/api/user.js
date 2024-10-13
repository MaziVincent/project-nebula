const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(verifyRoles('Admin'),userController.handleUsers)
    .put(verifyRoles('Admin'), userController.handleUpdate)

router.route('/:id')
    .delete(verifyRoles('Admin'), userController.handleDelete)
    .get(verifyRoles('Admin'),userController.handleUser)

router.route('/status/:id')
    .put(verifyRoles('Admin'), userController.handleActivate)
    
module.exports = router;
