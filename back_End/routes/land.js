const express = require('express');
const router = express.Router();
const landController = require('../controllers/landController');
const verifyRoles = require('../middleware/verifyRoles');
const upload = require('../middleware/upload')
router.route('/')
    .get(landController.getLandsHandler)
    .post(verifyRoles('Admin'),
        upload.fields([
            { name: 'images', maxCount: 5 }, 
            {name: 'docImages', maxCount: 2}
        ]),
        landController.createLandHandler
    )
    .put(verifyRoles('Admin'), landController.updateLandHandler)
router.route('/:id') //id of the land
    .delete(verifyRoles('Admin'), landController.deleteLandHandler)
    .get(landController.getLandHandler);
router.route('/status/:id') //id of the land
    .put(verifyRoles('Admin'), landController.landStatusHandler)
    
module.exports = router;