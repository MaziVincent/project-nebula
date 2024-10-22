const express = require('express');
const router = express.Router();
const pingCont = require('../controllers/pingController');

router.get('/', pingCont.ping);

module.exports = router;