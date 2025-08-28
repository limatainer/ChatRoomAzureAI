const axios = require('axios');
const { config } = require('../config/config');

class AzureOpenAIService {
  constructor() {
    this.endpoint = config.azure.endpoint;
    this.apiKey = config.azure.apiKey;
    this.deploymentName = config.azure.deploymentName;
    this.apiVersion = config.azure.apiVersion;
  }

  isConfigured() {
    return !!(this.endpoint && this.apiKey);
  }

  async generateResponse(message, options = {}) {
    if (!this.isConfigured()) {
      throw new Error('Azure OpenAI service is not properly configured');
    }

    const {
      maxTokens = config.ai.defaultMaxTokens,
      temperature = config.ai.defaultTemperature,
      systemMessage = 'You are a helpful assistant.'
    } = options;

    try {
      const response = await axios.post(
        `${this.endpoint}/openai/deployments/${this.deploymentName}/chat/completions?api-version=${this.apiVersion}`,
        {
          messages: [
            { role: 'system', content: systemMessage },
            { role: 'user', content: message },
          ],
          max_tokens: maxTokens,
          temperature: temperature,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': this.apiKey,
          },
          timeout: 30000
        }
      );

      return {
        message: response.data.choices[0].message.content,
        provider: 'azure',
        model: this.deploymentName,
        usage: response.data.usage
      };
    } catch (error) {
      throw new Error(`Azure OpenAI API error: ${error.response?.data?.error?.message || error.message}`);
    }
  }
}

module.exports = new AzureOpenAIService();