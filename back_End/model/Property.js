const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const options = {
	discriminatorKey: "type",
};
const PropertySchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: mongoose.Schema.Types.Decimal128,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		imageUrls: {
			type: [String],
		},
		videoUrl: {
			type: String,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		status: {
			type: String,
			enum: ["Pending", "Available", "Sold", "Rented", "Leased"],
			default: "Pending",
		},
		propertyType: {
			type: String,
			required: true,
		},
		isFeaturedProperty: {
			type: Boolean,
			default: false,
		},
		searchString: {
			type: String,
		},
	},
	{ timestamps: true, ...options }
);

// Add indexes for frequently queried fields
PropertySchema.index({ location: 1 });
PropertySchema.index({ status: 1 });
PropertySchema.index({ owner: 1 });
PropertySchema.index({ propertyType: 1 });
PropertySchema.index({ isFeaturedProperty: 1 });
PropertySchema.index({ searchString: "text" });
PropertySchema.index({ location: 1, status: 1 });
PropertySchema.index({ createdAt: -1 });

const Property = mongoose.model("Property", PropertySchema);

module.exports = Property;
