const nodemailer = require("nodemailer");
const crypto = require("crypto");
const userService = require("../services/userService");

const transporter = nodemailer.createTransport({
	service: "zoho",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASSWORD,
	},
});

const sendPin = async (email) => {
	const user = await userService.userExists(email);
	if (!user || user.error) {
		return { error: true, message: "User does not exist" };
	}

	//generate pin
	const pin = crypto.randomInt(1000, 9999).toString();
	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: email,
		subject: "Verification Pin",
		text: `Your Verification pin is ${pin}`,
	};

	try {
		await transporter.sendMail(mailOptions);
		return { error: false, message: "Pin sent successfully", pin: pin };
	} catch (err) {
		return { error: true, message: err.message };
	}
};

/**
 * Send email verification link
 */
const sendVerificationEmail = async (email, verificationLink, firstname) => {
	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: email,
		subject: "Verify Your Email - Nebula RealEstate",
		html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Welcome to Nebula RealEstate, ${firstname}!</h2>
                <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verificationLink}" 
                       style="background-color: #4CAF50; color: white; padding: 12px 24px; 
                              text-decoration: none; border-radius: 4px; display: inline-block;">
                        Verify Email
                    </a>
                </div>
                <p>Or copy and paste this link in your browser:</p>
                <p style="word-break: break-all; color: #666;">${verificationLink}</p>
                <p style="color: #999; font-size: 12px; margin-top: 30px;">
                    This link will expire in 24 hours. If you didn't create an account, please ignore this email.
                </p>
            </div>
        `,
	};

	try {
		await transporter.sendMail(mailOptions);
		return { success: true, message: "Verification email sent" };
	} catch (err) {
		return { error: true, message: err.message };
	}
};

/**
 * Send password reset email
 */
const sendPasswordResetEmail = async (email, resetLink, firstname) => {
	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: email,
		subject: "Password Reset Request - Nebula RealEstate",
		html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Hi ${firstname},</h2>
                <p>We received a request to reset your password. Click the button below to create a new password:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetLink}" 
                       style="background-color: #2196F3; color: white; padding: 12px 24px; 
                              text-decoration: none; border-radius: 4px; display: inline-block;">
                        Reset Password
                    </a>
                </div>
                <p>Or copy and paste this link in your browser:</p>
                <p style="word-break: break-all; color: #666;">${resetLink}</p>
                <p style="color: #999; font-size: 12px; margin-top: 30px;">
                    This link will expire in 1 hour. If you didn't request a password reset, please ignore this email.
                </p>
            </div>
        `,
	};

	try {
		await transporter.sendMail(mailOptions);
		return { success: true, message: "Password reset email sent" };
	} catch (err) {
		return { error: true, message: err.message };
	}
};

module.exports = {
	sendPin,
	sendVerificationEmail,
	sendPasswordResetEmail,
};
