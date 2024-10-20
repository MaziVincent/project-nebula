const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const CustomerSchema = User.discriminator('Customer', new Schema({
  wishlist: [{
    type: Schema.Types.ObjectId,
    ref: 'Property'
  }]
}));

module.exports = CustomerSchema;