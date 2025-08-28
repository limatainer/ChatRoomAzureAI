const express = require('express');
const aiService = require('../services/aiService');
const { validateChatRequest } = require('../middleware/validation');
const { asyncHandler } = require('../middleware/errorHandler');

const router = express.Router();

router.get('/providers', asyncHandler(async (req, res) => {
  const availableProviders = aiService.getAvailableProviders();
  const defaultProvider = aiService.getDefaultProvider();
  
  res.json({
    success: true,
    providers: availableProviders,
    defaultProvider
  });
}));

router.post('/chat', validateChatRequest, asyncHandler(async (req, res) => {
  const { message, provider, options = {} } = req.body;
  
  const selectedProvider = provider || aiService.getDefaultProvider();
  
  if (!selectedProvider) {
    return res.status(503).json({
      error: true,
      message: 'No AI providers are configured and available'
    });
  }

  if (!aiService.isProviderAvailable(selectedProvider)) {
    return res.status(400).json({
      error: true,
      message: `AI provider '${selectedProvider}' is not available or configured`
    });
  }

  const response = await aiService.generateResponse(selectedProvider, message, options);
  
  res.json({
    success: true,
    ...response,
    timestamp: new Date().toISOString()
  });
}));

router.post('/chat/azure', validateChatRequest, asyncHandler(async (req, res) => {
  const { message, options = {} } = req.body;
  
  if (!aiService.isProviderAvailable('azure')) {
    return res.status(503).json({
      error: true,
      message: 'Azure OpenAI service is not configured or available'
    });
  }

  const response = await aiService.generateResponse('azure', message, options);
  
  res.json({
    success: true,
    ...response,
    timestamp: new Date().toISOString()
  });
}));

router.post('/chat/gemini', validateChatRequest, asyncHandler(async (req, res) => {
  const { message, options = {} } = req.body;
  
  if (!aiService.isProviderAvailable('gemini')) {
    return res.status(503).json({
      error: true,
      message: 'Google Gemini service is not configured or available'
    });
  }

  const response = await aiService.generateResponse('gemini', message, options);
  
  res.json({
    success: true,
    ...response,
    timestamp: new Date().toISOString()
  });
}));

module.exports = router;