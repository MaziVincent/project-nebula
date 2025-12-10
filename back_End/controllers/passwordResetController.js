const User = require("../model/User");
const bcrypt = require("bcrypt");
const {
	generateResetToken,
	sendPasswordResetEmail,
	sendPasswordResetConfirmation,
} = require("../services/passwordResetService");

/**
 * Request password reset - sends email with reset link
 */
const handleRequestPasswordReset = async (req, res) => {
	const { email } = req.body;

	if (!email) {
		return res.status(400).json({ message: "Email is required" });
	}

	try {
		const user = await User.findOne({ email }).exec();

		if (!user) {
			// Don't reveal if user exists or not for security
			return res.status(200).json({
				success: true,
				message: "If that email exists, a password reset link has been sent.",
			});
		}

		// Generate reset token
		const resetToken = generateResetToken();
		const tokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

		user.passwordResetToken = resetToken;
		user.passwordResetExpires = tokenExpiry;
		await user.save();

		// Send reset email
		const result = await sendPasswordResetEmail(email, resetToken);

		if (result.error) {
			return res.status(500).json({ message: "Error sending reset email" });
		}

		res.status(200).json({
			success: true,
			message: "If that email exists, a password reset link has been sent.",
		});
	} catch (error) {
		console.error("Password reset request error:", error);
		res
			.status(500)
			.json({
				message: "Error processing password reset request",
				error: error.message,
			});
	}
};

/**
 * Reset password with token
 */
const handleResetPassword = async (req, res) => {
	const { token, newPassword } = req.body;

	if (!token || !newPassword) {
		return res
			.status(400)
			.json({ message: "Token and new password are required" });
	}

	if (newPassword.length < 8) {
		return res
			.status(400)
			.json({ message: "Password must be at least 8 characters long" });
	}

	try {
		const user = await User.findOne({
			passwordResetToken: token,
			passwordResetExpires: { $gt: Date.now() },
		}).exec();

		if (!user) {
			return res
				.status(400)
				.json({ message: "Invalid or expired reset token" });
		}

		// Hash new password
		const hashedPassword = await bcrypt.hash(newPassword, 10);

		// Update user
		user.password = hashedPassword;
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		user.tokenVersion += 1; // Invalidate all existing tokens
		user.refreshToken = ""; // Clear refresh token
		await user.save();

		// Send confirmation email
		await sendPasswordResetConfirmation(user.email);

		res.status(200).json({
			success: true,
			message:
				"Password reset successful. Please login with your new password.",
		});
	} catch (error) {
		console.error("Password reset error:", error);
		res
			.status(500)
			.json({ message: "Error resetting password", error: error.message });
	}
};

/**
 * Verify reset token validity
 */
const handleVerifyResetToken = async (req, res) => {
	const { token } = req.body;

	if (!token) {
		return res.status(400).json({ message: "Token is required" });
	}

	try {
		const user = await User.findOne({
			passwordResetToken: token,
			passwordResetExpires: { $gt: Date.now() },
		}).exec();

		if (!user) {
			return res
				.status(400)
				.json({ valid: false, message: "Invalid or expired token" });
		}

		res.status(200).json({ valid: true, message: "Token is valid" });
	} catch (error) {
		console.error("Token verification error:", error);
		res
			.status(500)
			.json({ message: "Error verifying token", error: error.message });
	}
};

module.exports = {
	handleRequestPasswordReset,
	handleResetPassword,
	handleVerifyResetToken,
};
