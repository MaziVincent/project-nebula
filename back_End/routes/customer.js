const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const verifyRoles = require('../middleware/verifyRoles');

router.route('/')
    .get(customerController.handleCustomers)
    .post(customerController.handleCreateCustomer)
    .put(customerController.handleUpdate)
    router.route('/:id')
    .get(customerController.handleCustomer)
    .delete(customerController.handleDelete);
module.exports = router;