const express = require('express');
const router = express.Router();
const apartmentController = require('../controllers/apartmentController');
const verifyRoles = require('../middleware/verifyRoles');
const upload = require('../middleware/upload');

router.route('/')
    .get(apartmentController.getApartmentsHandler)
    .post(verifyRoles('Admin', 'Agent', 'Owner'),
        apartmentController.createApartmentHandler)
    .put(verifyRoles('Admin', 'Agent', 'Owner'), apartmentController.updateApartmentHandler)
router.route('/:id')
    .get(apartmentController.getApartmentHandler)
    .delete(verifyRoles('Admin', 'Agent', 'Owner'), apartmentController.deleteApartmentHandler);

router.route('/status/:id')
    .put(verifyRoles('Admin', 'Agent', 'Owner'), apartmentController.apartmentStatusHandler);

module.exports = router;
