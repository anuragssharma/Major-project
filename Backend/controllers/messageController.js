const Message = require('../models/Message');

// @desc    Submit a contact inquiry (Public)
// @route   POST /api/messages
exports.createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry received successfully! Our team will reach out soon.',
      data: newMessage
    });
  } catch (error) {
    console.error('Contact submit error:', error);
    res.status(500).json({ message: 'Failed to send message.' });
  }
};

// @desc    Get all messages (NGO only)
// @route   GET /api/messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages.' });
  }
};

// @desc    Update message status (NGO only)
// @route   PATCH /api/messages/:id/status
exports.updateMessageStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Message.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update message status.' });
  }
};  

// @desc    Delete message (NGO only)
// @route   DELETE /api/messages/:id
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Message.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({ message: 'Failed to delete message' });
  }
};