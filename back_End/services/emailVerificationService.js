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
 * Generate email verification token
 */
const generateVerificationToken = () => {
	return crypto.randomBytes(32).toString("hex");
};

/**
 * Send verification email to user
 */
const sendVerificationEmail = async (email, token) => {
	const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: email,
		subject: "Verify Your Email - Nebula Real Estate",
		html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to Nebula Real Estate!</h2>
        <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #007bff; color: white; padding: 12px 30px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Verify Email Address
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">
          Or copy and paste this link into your browser:<br>
          <a href="${verificationUrl}">${verificationUrl}</a>
        </p>
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This link will expire in 24 hours. If you didn't create an account, please ignore this email.
        </p>
      </div>
    `,
	};

	try {
		await transporter.sendMail(mailOptions);
		return { success: true, message: "Verification email sent successfully" };
	} catch (err) {
		console.error("Email sending error:", err);
		return { error: true, message: err.message };
	}
};

/**
 * Resend verification email
 */
const resendVerificationEmail = async (user) => {
	if (user.emailVerified) {
		return { error: true, message: "Email already verified" };
	}

	const token = generateVerificationToken();
	user.emailVerificationToken = token;
	await user.save();

	return await sendVerificationEmail(user.email, token);
};

module.exports = {
	generateVerificationToken,
	sendVerificationEmail,
	resendVerificationEmail,
};
