const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Property = require('./Property');

const LandSchema = Property.discriminator('Land', new Schema({
  plots: {
    type: Number,
    required: true
  },
  docType: {
    type: String,
    required: true
  },
  docImages: {
    type: [String],
  },
  ownershipType: {
    type: String,
    required: true
  }
}));

module.exports = LandSchema;