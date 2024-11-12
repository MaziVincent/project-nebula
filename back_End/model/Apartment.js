const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Property = require('./Property');

const ApartmentSchema = Property.discriminator('Apartment', new Schema({
  floorArea: {
    type: Number,
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  paymentType:{
    type:String
  },
  exteriorFeatures: {
    type: [String],
    required: true
  },
  interiorFeatures: {
    type: [String]
  },
  livingRoomFeatures: {
    type: [String]
  },
  kitchenFeatures: {
    type: [String]
  }
}));

module.exports = ApartmentSchema;