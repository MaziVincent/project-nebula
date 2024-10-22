const express = require('express');
const router = express.Router();
const verifyRoles = require('../middleware/verifyRoles');
const houseController = require('../controllers/houseController');
const upload = require('../middleware/upload')

router.route('/')
    .get(houseController.getHousesHandler)
    .post(verifyRoles('Admin', 'Agent', 'Owner'),
        houseController.createHouseHandler)
    
    .put(verifyRoles('Admin', 'Agent', 'Owner'), houseController.updateHouseHandler)
    router.route('/:id')
    .get(houseController.getHouseHandler)
    .delete(verifyRoles('Admin'), houseController.deleteHouseHandler)

router.route('/status/:id')
    .put(verifyRoles('Admin'), houseController.houseStatusHandler)
module.exports = router;