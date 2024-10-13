const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Property = require('./Property');

const ApartmentSchema = Property.discriminator('Apartment', new Schema({
  floorArea: {
    type: Number,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  }
}));

module.exports = ApartmentSchema;