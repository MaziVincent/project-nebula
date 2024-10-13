const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const verifyRoles = require('../middleware/verifyRoles');
const upload = require('../middleware/upload')

router.route('/')
    .put(verifyRoles('Admin'), shopController.shopStatusHandler);

module.exports = router;