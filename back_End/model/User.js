const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const options = {
	discriminatorKey: "type",
};
const UserSchema = new Schema(
	{
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["Active", "Inactive"],
			default: "Active",
		},
		profile: {
			type: String,
		},
		searchString: {
			type: String,
		},
		whatsappLink: String,
		refreshToken: {
			type: String,
		},
		tokenVersion: {
			type: Number,
			default: 0,
		},
		emailVerified: {
			type: Boolean,
			default: false,
		},
		emailVerificationToken: {
			type: String,
		},
		passwordResetToken: {
			type: String,
		},
		passwordResetExpires: {
			type: Date,
		},
	},
	{ timestamps: true, ...options }
);

// Add indexes for frequently queried fields
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ phone: 1 }, { unique: true });
UserSchema.index({ searchString: "text" });
UserSchema.index({ type: 1 });
UserSchema.index({ status: 1 });
UserSchema.index({ emailVerified: 1 });

const User = mongoose.model("User", UserSchema);

module.exports = User;
