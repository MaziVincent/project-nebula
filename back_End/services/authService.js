const User = require("../model/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const emailService = require("./emailService");

/**
 * Generate email verification token
 */
const generateVerificationToken = () => {
	return crypto.randomBytes(32).toString("hex");
};

/**
 * Send email verification link
 */
const sendVerificationEmail = async (userId) => {
	try {
		const user = await User.findById(userId);
		if (!user) return { error: "User not found" };

		if (user.emailVerified) {
			return { error: "Email already verified" };
		}

		const verificationToken = generateVerificationToken();
		user.emailVerificationToken = verificationToken;
		await user.save();

		const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;

		await emailService.sendVerificationEmail(
			user.email,
			verificationLink,
			user.firstname
		);

		return { success: true, message: "Verification email sent" };
	} catch (error) {
		return { error: error.message };
	}
};

/**
 * Verify email with token
 */
const verifyEmail = async (token) => {
	try {
		const user = await User.findOne({ emailVerificationToken: token });

		if (!user) {
			return { error: "Invalid or expired verification token" };
		}

		user.emailVerified = true;
		user.emailVerificationToken = undefined;
		await user.save();

		return { success: true, message: "Email verified successfully", user };
	} catch (error) {
		return { error: error.message };
	}
};

/**
 * Request password reset
 */
const requestPasswordReset = async (email) => {
	try {
		const user = await User.findOne({ email });

		if (!user) {
			// Don't reveal if user exists for security
			return {
				success: true,
				message: "If the email exists, a reset link has been sent",
			};
		}

		const resetToken = crypto.randomBytes(32).toString("hex");
		user.passwordResetToken = resetToken;
		user.passwordResetExpires = Date.now() + 3600000; // 1 hour
		await user.save();

		const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

		await emailService.sendPasswordResetEmail(
			user.email,
			resetLink,
			user.firstname
		);

		return { success: true, message: "Password reset email sent" };
	} catch (error) {
		return { error: error.message };
	}
};

/**
 * Reset password with token
 */
const resetPassword = async (token, newPassword) => {
	try {
		const user = await User.findOne({
			passwordResetToken: token,
			passwordResetExpires: { $gt: Date.now() },
		});

		if (!user) {
			return { error: "Invalid or expired reset token" };
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);
		user.password = hashedPassword;
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;

		// Invalidate all existing sessions by incrementing token version
		user.tokenVersion += 1;
		user.refreshToken = "";

		await user.save();

		return { success: true, message: "Password reset successfully" };
	} catch (error) {
		return { error: error.message };
	}
};

/**
 * Invalidate all user sessions (logout from all devices)
 */
const invalidateAllSessions = async (userId) => {
	try {
		const user = await User.findById(userId);
		if (!user) return { error: "User not found" };

		user.tokenVersion += 1;
		user.refreshToken = "";
		await user.save();

		return { success: true, message: "All sessions invalidated" };
	} catch (error) {
		return { error: error.message };
	}
};

module.exports = {
	sendVerificationEmail,
	verifyEmail,
	requestPasswordReset,
	resetPassword,
	invalidateAllSessions,
	generateVerificationToken,
};
