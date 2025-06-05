const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: 'Invalid booking data' });
  }
});

module.exports = router;
