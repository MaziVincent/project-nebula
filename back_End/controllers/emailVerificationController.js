const User = require("../model/User");
const {
	generateVerificationToken,
	sendVerificationEmail,
	resendVerificationEmail,
} = require("../services/emailVerificationService");

/**
 * Verify user email with token
 */
const handleVerifyEmail = async (req, res) => {
	const { token } = req.body;

	if (!token) {
		return res.status(400).json({ message: "Verification token is required" });
	}

	try {
		const user = await User.findOne({ emailVerificationToken: token }).exec();

		if (!user) {
			return res
				.status(400)
				.json({ message: "Invalid or expired verification token" });
		}

		if (user.emailVerified) {
			return res.status(400).json({ message: "Email already verified" });
		}

		user.emailVerified = true;
		user.emailVerificationToken = undefined;
		await user.save();

		res.status(200).json({
			success: true,
			message: "Email verified successfully. You can now login.",
		});
	} catch (error) {
		console.error("Email verification error:", error);
		res
			.status(500)
			.json({ message: "Error verifying email", error: error.message });
	}
};

/**
 * Resend verification email
 */
const handleResendVerification = async (req, res) => {
	const { email } = req.body;

	if (!email) {
		return res.status(400).json({ message: "Email is required" });
	}

	try {
		const user = await User.findOne({ email }).exec();

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const result = await resendVerificationEmail(user);

		if (result.error) {
			return res.status(400).json(result);
		}

		res.status(200).json({
			success: true,
			message: "Verification email sent. Please check your inbox.",
		});
	} catch (error) {
		console.error("Resend verification error:", error);
		res
			.status(500)
			.json({
				message: "Error sending verification email",
				error: error.message,
			});
	}
};

module.exports = {
	handleVerifyEmail,
	handleResendVerification,
};
