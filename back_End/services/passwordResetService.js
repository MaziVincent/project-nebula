const crypto = require("crypto");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	service: "zoho",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
});

/**
 * Generate password reset token
 */
const generateResetToken = () => {
	return crypto.randomBytes(32).toString("hex");
};

/**
 * Send password reset email
 */
const sendPasswordResetEmail = async (email, token) => {
	const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: email,
		subject: "Password Reset Request - Nebula Real Estate",
		html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p>You requested to reset your password. Click the button below to reset it:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #dc3545; color: white; padding: 12px 30px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">
          Or copy and paste this link into your browser:<br>
          <a href="${resetUrl}">${resetUrl}</a>
        </p>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.
        </p>
      </div>
    `,
	};

	try {
		await transporter.sendMail(mailOptions);
		return { success: true, message: "Password reset email sent successfully" };
	} catch (err) {
		console.error("Email sending error:", err);
		return { error: true, message: err.message };
	}
};

/**
 * Send password reset confirmation email
 */
const sendPasswordResetConfirmation = async (email) => {
	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: email,
		subject: "Password Reset Successful - Nebula Real Estate",
		html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Password Reset Successful</h2>
        <p>Your password has been successfully reset.</p>
        <p>If you did not make this change, please contact our support team immediately.</p>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          Best regards,<br>
          Nebula Real Estate Team
        </p>
      </div>
    `,
	};

	try {
		await transporter.sendMail(mailOptions);
		return { success: true };
	} catch (err) {
		console.error("Email sending error:", err);
		return { error: true, message: err.message };
	}
};

module.exports = {
	generateResetToken,
	sendPasswordResetEmail,
	sendPasswordResetConfirmation,
};
