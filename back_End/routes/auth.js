const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authServiceController = require("../controllers/authServiceController");
const userController = require("../controllers/userController");

router.route("/login").post(authController.handleLogin);

router.route("/changepassword").put(userController.handleChangePassword);

// Email verification routes
router
	.route("/send-verification")
	.post(authServiceController.handleSendVerificationEmail);
router
	.route("/verify-email/:token")
	.get(authServiceController.handleVerifyEmail);

// Password reset routes
router
	.route("/forgot-password")
	.post(authServiceController.handlePasswordResetRequest);
router
	.route("/reset-password/:token")
	.post(authServiceController.handlePasswordReset);

// Session management
router
	.route("/invalidate-sessions")
	.post(authServiceController.handleInvalidateAllSessions);

module.exports = router;
