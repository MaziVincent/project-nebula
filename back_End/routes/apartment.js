const express = require('express');
const router = express.Router();
const apartmentController = require('../controllers/apartmentController');
const verifyRoles = require('../middleware/verifyRoles');
const upload = require('../middleware/upload');

router.route('/')
    .get(apartmentController.getApartmentsHandler)
    .post(verifyRoles('Admin', 'Agent'), upload.single('image'), (req, res, next) => {
        apartmentController.createApartmentHandler(req, res).catch(next);
    })
    .put(verifyRoles('Admin'), apartmentController.updateApartmentHandler)
router.route('/:id')
    .get(apartmentController.getApartmentHandler)
    .delete(verifyRoles('Admin', 'Agent'), apartmentController.deleteApartmentHandler);

router.route('/status/:id')
    .put(verifyRoles('Admin'), apartmentController.apartmentStatusHandler);

module.exports = router;
