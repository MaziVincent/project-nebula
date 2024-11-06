const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const options = {
  discriminatorKey: 'type'
}
const UserSchema = new Schema({
 firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  profile: {
    type: String
  },
  searchString: {
    type: String
  },
  whatappLink:String,
  refreshToken: {
    type: String,
  }
},{timestamps: true, ...options});

const User = mongoose.model('User', UserSchema);

module.exports = User;