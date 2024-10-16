const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = { 
  discriminatorKey: 'type' 
};
const PropertySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  imageUrls: {
    type: [String],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Available', 'Sold', 'Rented', 'Leased'],
    default: 'Pending'
  },
  propertyType: {
    type: String,
    required: true
  }

},{timestamps: true, ...options});

const Property = mongoose.model('Property', PropertySchema,);

module.exports = Property;