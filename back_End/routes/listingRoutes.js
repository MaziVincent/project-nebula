const express = require('express');
const router = express.Router();
const ListingController = require('../controllers/listingController');
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../config/rolesList');

router.route('/')
    .get(ListingController.getAllListing)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), ListingController.createNewListing)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), ListingController.updateListing)
    .delete(verifyRoles(ROLES_LIST.Admin), ListingController.deleteListing);
    router.route('/:id')
    .get(ListingController.getListing);

module.exports = router;
