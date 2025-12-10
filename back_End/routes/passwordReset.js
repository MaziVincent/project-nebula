const express = require("express");
const router = express.Router();
const passwordResetController = require("../controllers/passwordResetController");

router
	.route("/request")
	.post(passwordResetController.handleRequestPasswordReset);

router.route("/reset").post(passwordResetController.handleResetPassword);

router
	.route("/verify-token")
	.post(passwordResetController.handleVerifyResetToken);

module.exports = router;
