const express = require("express");
const router = express.Router();
const emailVerificationController = require("../controllers/emailVerificationController");

router.route("/verify").post(emailVerificationController.handleVerifyEmail);

router
	.route("/resend")
	.post(emailVerificationController.handleResendVerification);

module.exports = router;
