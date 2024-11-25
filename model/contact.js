const mongoose = require('mongoose');
const { Schema } = mongoose;
const conatctSchema = new Schema({
  name: { type: String},
  email: {
    type: String
  },
  messages: { type: String }
});
exports.Contact = mongoose.model('Contact', conatctSchema);
