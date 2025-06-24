const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get all messages
router.get('/', async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

// Create a new message
router.post('/', async (req, res) => {
  const newMessage = await Message.create(req.body);
  res.json(newMessage);
});

module.exports = router;
