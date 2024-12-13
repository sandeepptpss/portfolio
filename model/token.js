const mongoose = require('mongoose');
const {Schema} =mongoose;
const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 36000 }, // Expires in 1 hour
});
exports.Token = mongoose.model('Token', tokenSchema);
