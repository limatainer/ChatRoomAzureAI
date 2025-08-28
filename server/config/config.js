const dotenv = require('dotenv');

dotenv.config();

const config = {
  server: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development'
  },
  azure: {
    endpoint: process.env.AZURE_OPENAI_ENDPOINT,
    apiKey: process.env.AZURE_OPENAI_API_KEY,
    deploymentName: process.env.AZURE_DEPLOYMENT_NAME || 'gpt-35-turbo',
    apiVersion: process.env.AZURE_API_VERSION || '2023-05-15'
  },
  gemini: {
    apiKey: process.env.GOOGLE_API_KEY,
    model: process.env.GEMINI_MODEL || 'gemini-pro',
    maxTokens: parseInt(process.env.GEMINI_MAX_TOKENS) || 100,
    temperature: parseFloat(process.env.GEMINI_TEMPERATURE) || 0.7
  },
  ai: {
    defaultMaxTokens: parseInt(process.env.DEFAULT_MAX_TOKENS) || 800,
    defaultTemperature: parseFloat(process.env.DEFAULT_TEMPERATURE) || 0.7
  }
};

const validateConfig = () => {
  const errors = [];
  
  if (!config.azure.endpoint && !config.gemini.apiKey) {
    errors.push('At least one AI service must be configured (Azure OpenAI or Google Gemini)');
  }
  
  if (config.azure.endpoint && !config.azure.apiKey) {
    errors.push('AZURE_OPENAI_API_KEY is required when AZURE_OPENAI_ENDPOINT is provided');
  }
  
  if (errors.length > 0) {
    throw new Error(`Configuration validation failed:\n${errors.join('\n')}`);
  }
};

const isProduction = () => config.server.nodeEnv === 'production';
const isDevelopment = () => config.server.nodeEnv === 'development';

module.exports = {
  config,
  validateConfig,
  isProduction,
  isDevelopment
};