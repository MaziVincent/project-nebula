const authService = require("../services/authService");

/**
 * Send verification email
 */
const handleSendVerificationEmail = async (req, res) => {
	const { userId } = req.body;

	if (!userId) {
		return res.status(400).json({ message: "User ID required" });
	}

	const result = await authService.sendVerificationEmail(userId);

	if (result.error) {
		return res.status(400).json({ message: result.error });
	}

	res.status(200).json(result);
};

/**
 * Verify email with token
 */
const handleVerifyEmail = async (req, res) => {
	const { token } = req.params;

	if (!token) {
		return res.status(400).json({ message: "Verification token required" });
	}

	const result = await authService.verifyEmail(token);

	if (result.error) {
		return res.status(400).json({ message: result.error });
	}

	res.status(200).json(result);
};

/**
 * Request password reset
 */
const handlePasswordResetRequest = async (req, res) => {
	const { email } = req.body;

	if (!email) {
		return res.status(400).json({ message: "Email required" });
	}

	const result = await authService.requestPasswordReset(email);

	// Always return success to prevent email enumeration
	res.status(200).json(result);
};

/**
 * Reset password with token
 */
const handlePasswordReset = async (req, res) => {
	const { token } = req.params;
	const { password } = req.body;

	if (!token || !password) {
		return res.status(400).json({ message: "Token and password required" });
	}

	if (password.length < 8) {
		return res
			.status(400)
			.json({ message: "Password must be at least 8 characters" });
	}

	const result = await authService.resetPassword(token, password);

	if (result.error) {
		return res.status(400).json({ message: result.error });
	}

	res.status(200).json(result);
};

/**
 * Invalidate all sessions (logout from all devices)
 */
const handleInvalidateAllSessions = async (req, res) => {
	const { userId } = req.body;

	if (!userId) {
		return res.status(400).json({ message: "User ID required" });
	}

	const result = await authService.invalidateAllSessions(userId);

	if (result.error) {
		return res.status(400).json({ message: result.error });
	}

	res.status(200).json(result);
};

module.exports = {
	handleSendVerificationEmail,
	handleVerifyEmail,
	handlePasswordResetRequest,
	handlePasswordReset,
	handleInvalidateAllSessions,
};
