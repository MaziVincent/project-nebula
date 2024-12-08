const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone:{
    type: String,
  }
}, {timestamps: true});
const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;