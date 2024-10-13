const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./User');

const CustomerSchema = User.discriminator('Customer', new Schema({
  wishlist: [{
    type: String,
    ref: 'Property'
  }]
}));

module.exports = CustomerSchema;