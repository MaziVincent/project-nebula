const express = require('express');
const router = express.Router();
const ownerController = require('../controllers/ownerController');
const fileUpload = require("express-fileupload");
const filesPayloadExists = require("../middleware/filesPayloadExists");
const fileExtLimiter = require("../middleware/fileExtLimiter");
const filesSizeLimiter = require("../middleware/filiesSizeLimiter");

router.route('/')
    .get(ownerController.handleOwners)
    .post(ownerController.handleCreate)
    .put(ownerController.handleUpdate)
router.route('/:id')
    .delete(ownerController.handleDelete)
    .get(ownerController.handleOwner);
router.route('/verify/:id')
    .put(ownerController.handleVerifyOwner)
router.route('/unverify/:id')
    .put(ownerController.handleUnVerifyOwner)
router.route('/idupload/:id')
    .put(
        fileUpload({ createParentPath: true }),
        filesPayloadExists,
        fileExtLimiter([".png", ".jpg", ".jpeg",".webp"]),
        filesSizeLimiter,
        ownerController.handleUploadDocument
    )
module.exports = router;