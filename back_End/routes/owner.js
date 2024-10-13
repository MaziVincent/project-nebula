const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');

router.route('/')
    .get(ownerController.handleOwners)
    .post(ownerController.handleCreate)
    .put(ownerController.handleUpdate)
router.route('/:id')
    .delete(ownerController.handleDelete)
    .get(ownerController.handleOwner);
router.route('/verify/:id')
    .put(ownerController.handleVerifyOwner)
router.route('/unverify/:id')
    .put(ownerController.handleUnVerifyOwner)
module.exports = router;