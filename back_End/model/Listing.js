const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  status: { type: String, enum: ["active", "pending", "sold"] }
},{timestamps: true});

const Listing = mongoose.model('Listing', ListingSchema);

module.exports = Listing;
