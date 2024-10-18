const express = require('express');
const fileUpload = require('express-fileupload');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const verifyRoles = require('../middleware/verifyRoles');
const filesPayloadExists = require('../middleware/filesPayloadExists');
const fileExtLimiter = require('../middleware/fileExtLimiter');
const filesSizeLimiter = require('../middleware/filiesSizeLimiter');

router.route('/')
    .get(propertyController.getPropertiesHandler)
router.route('/:id')
    .get(propertyController.getPropertyHandler)
    .delete(verifyRoles('Admin', 'Agent', 'Owner'), propertyController.deletePropertyHandler)
router.route('/owner/:id')
    .get(propertyController.getPropertiesByOwnerHandler); 

router.route('/status/:id')
    .put(verifyRoles('Admin', 'Agent', 'Owner'), propertyController.propertyStatusHandler)

router.route('/upload/:id')
    .put(
        fileUpload({ createParentPath: true }),
        filesPayloadExists,
        fileExtLimiter(['.png', '.jpg', '.jpeg']),
        filesSizeLimiter,
        propertyController.uploadPropertyImageHandler
    );
module.exports = router;