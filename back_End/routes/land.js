const express = require('express');
const router = express.Router();
const landController = require('../controllers/landController');
const verifyRoles = require('../middleware/verifyRoles');
const fileUpload = require('express-fileupload');
const filesPayloadExists = require('../middleware/filesPayloadExists');
const fileExtLimiter = require('../middleware/fileExtLimiter');
const filesSizeLimiter = require('../middleware/filiesSizeLimiter');

router.route('/')
    .get(landController.getLandsHandler)
    .post(verifyRoles('Admin', 'Agent', 'Owner'),landController.createLandHandler)
    .put(verifyRoles('Admin', 'Agent', 'Owner'), landController.updateLandHandler)
router.route('/status/:id') 
    .put(verifyRoles('Admin', 'Agent', 'Owner'), landController.landStatusHandler)
router.route('/docupload/:id')
    .put(
        fileUpload({ createParentPath: true }),
        filesPayloadExists,
        fileExtLimiter(['.png', '.jpg', '.jpeg']),
        filesSizeLimiter,
        landController.uploadDocImageHandler
);
router.route('/:id') 
    .delete(verifyRoles('Admin', 'Agent', 'Owner'), landController.deleteLandHandler)
    .get(landController.getLandHandler);
module.exports = router;