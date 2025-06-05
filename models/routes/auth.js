const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password, type, avatar } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      name,
      email,
      password: hashed,
      type,
      avatar,
      joinDate: new Date()
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password, type } = req.body;
  const user = await User.findOne({ email, type });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token, user });
});

module.exports = router;
