const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const verifyRoles = require('../middleware/verifyRoles');
const upload = require('../middleware/upload')

router.route('/')
    .get(shopController.getShopsHandler)
    .post(verifyRoles('Admin', 'Agent', 'Owner'),shopController.createShopHandler)
    .put(verifyRoles('Admin', "Agent", "Owner"), shopController.updateShopHandler)
router.route('/:id')
    .get(shopController.getShopHandler)
    .delete(verifyRoles('Admin'), shopController.deleteShopHandler)

router.route('/status/:id')
    .put(verifyRoles('Admin'), shopController.shopStatusHandler)

module.exports = router;