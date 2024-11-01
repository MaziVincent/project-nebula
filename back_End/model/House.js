const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Property = require('./Property');

const HouseSchema = Property.discriminator('House', new Schema({
  bedrooms: {
    type: String,
    required: true
  },
  bathrooms: {
    type: String,
    required: true
  },
  squareFootage: {
    type: Number
  },
  docType: {
    type: String,
    required: true
  },
  docImages: {
    type: [String]
  },
  yearBuilt: {
    type: Number
  },
  lotSize: {
    type: Number
  },
  stories: {
    type: Number,
  },
  exteriorFeatures: {
    type: [String]
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
}),)

module.exports = HouseSchema;