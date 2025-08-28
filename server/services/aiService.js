const azureOpenAIService = require('./azureOpenAIService');
const geminiService = require('./geminiService');

class AIService {
  constructor() {
    this.providers = {
      azure: azureOpenAIService,
      gemini: geminiService
    };
  }

  getAvailableProviders() {
    const available = {};
    Object.keys(this.providers).forEach(key => {
      if (this.providers[key].isConfigured()) {
        available[key] = {
          name: key,
          configured: true
        };
      }
    });
    return available;
  }

  isProviderAvailable(provider) {
    return this.providers[provider] && this.providers[provider].isConfigured();
  }

  async generateResponse(provider, message, options = {}) {
    if (!this.isProviderAvailable(provider)) {
      throw new Error(`AI provider '${provider}' is not available or configured`);
    }

    return await this.providers[provider].generateResponse(message, options);
  }

  getDefaultProvider() {
    const available = Object.keys(this.getAvailableProviders());
    return available.length > 0 ? available[0] : null;
  }
}

module.exports = new AIService();