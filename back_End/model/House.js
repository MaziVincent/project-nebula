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
    type: String,
    required: true
  },
  docType: {
    type: String,
    required: true
  },
  docImage: {
    type: [String]
  },
  yearBuilt: {
    type: String,
    required: true
  },
  lotSize: {
    type: String,
    required: true
  },
  stories: {
    type: String,
  },
  exteriorFeatures: {
    type: [String],
    required: true
  },
  interiorFeatures: {
    type: [String],
    required: true
  },
  livingRoomFeatures: {
    type: [String],
    required: true
  },
  kitchenFeatures: {
    type: [String],
    required: true
  }
}),)

module.exports = HouseSchema;