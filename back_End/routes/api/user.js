const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const verifyRoles = require('../../middleware/verifyRoles');
const fileUpload = require("express-fileupload");
const filesPayloadExists = require("../../middleware/filesPayloadExists");
const fileExtLimiter = require("../../middleware/fileExtLimiter");
const filesSizeLimiter = require("../../middleware/filiesSizeLimiter");

router.route('/')
    .get(verifyRoles('Admin'),userController.handleUsers)
    .put(verifyRoles('Admin'), userController.handleUpdate)

router.route('/:id')
    .delete(verifyRoles('Admin'), userController.handleDelete)
    .get(verifyRoles('Admin'),userController.handleUser)

router.route('/status/:id')
    .put(verifyRoles('Admin'), userController.handleActivate)
router.route('/profile/:id')
    .put(
        fileUpload({ createParentPath: true }),
        filesPayloadExists,
        fileExtLimiter([".png", ".jpg", ".jpeg",".webp"]),
        filesSizeLimiter,
        userController.handleProfilePicture
    )
module.exports = router;
