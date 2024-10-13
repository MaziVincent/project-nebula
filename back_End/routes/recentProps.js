const express = require('express');
const router = express.Router();
const propertyConroller = require('../controllers/propertyController');

router.get('/', propertyConroller.getRecentPropertiesHandler);

module.exports = router;