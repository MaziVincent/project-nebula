const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const AdminSchema = User.discriminator('Admin', new Schema({
 username: {
    type: String,
    required: true
  },
  properties: [{
    type: Schema.Types.ObjectId,
    ref: 'Property'
  }]
}))
module.exports = AdminSchema;