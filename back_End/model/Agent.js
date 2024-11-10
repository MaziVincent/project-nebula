const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const AgentSchema = User.discriminator('Agent', new Schema({
  verified: {
    type: Boolean,
    default: false
  },
  isSuperAgent:{
    type:Boolean,
    default:false
  },
  identityImage: {
    type: String,
  },
  identityNumber: {
    type: String,
    required: true
  },
  identityType: {
    type: String,
    required: true
  },
  contactAddress: {
    type: String,
    required: true
  },
  agencyName: {
    type: String,
  },
  officeAddress: {
    type: String,
    required: true
  },
  properties: [{
    type: Schema.Types.ObjectId,
    ref: 'Property'
  }],
  
}));

module.exports = AgentSchema;