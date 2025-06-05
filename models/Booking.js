const mongoose = require('mongoose');
const BookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  service: String,
  date: Date,
  notes: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Booking', BookingSchema);
