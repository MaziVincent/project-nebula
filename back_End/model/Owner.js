const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const OwnerSchema = User.discriminator('Owner', new Schema({
  properties: [{
    type: Schema.Types.ObjectId,
    ref: 'Property'
  }],
  verified: {
    type: Boolean,
    default: false
  },
  identityType: {
    type: String,
    required: true
  },
  identityNumber: {
    type: String,
    required: true
  },
  identityImage: {
    type: String
  },
  contactAddress: {
    type: String,
    required: true
  }
}));

module.exports = OwnerSchema;