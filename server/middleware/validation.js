const validateChatRequest = (req, res, next) => {
  const { message, provider } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({
      error: true,
      message: 'Message is required and must be a non-empty string'
    });
  }

  if (provider && typeof provider !== 'string') {
    return res.status(400).json({
      error: true,
      message: 'Provider must be a string'
    });
  }

  if (message.length > 10000) {
    return res.status(400).json({
      error: true,
      message: 'Message is too long (maximum 10,000 characters)'
    });
  }

  req.body.message = message.trim();
  next();
};

module.exports = {
  validateChatRequest
};