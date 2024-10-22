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
    .delete(propertyController.deletePropertyHandler)
router.route('/owner/:id')
    .get(propertyController.getPropertiesByOwnerHandler); 

router.route('/status/:id')
    .put( propertyController.propertyStatusHandler)

router.route('/upload/:id')
    .put(
        fileUpload({ createParentPath: true }),
        filesPayloadExists,
        fileExtLimiter(['.png', '.jpg', '.jpeg']),
        filesSizeLimiter,
        propertyController.uploadPropertyImageHandler
    );
router.route('/propertystatus')
    .get(propertyController.getPropertiesByStatusHandler)
router.route('/propertytype')
    .get(propertyController.getPropertyByTypeHandler)
module.exports = router;