# Chat Room AI Server

A modular Node.js server that provides AI chat functionality using Azure OpenAI and Google Gemini services.

## Features

- **Multi-AI Provider Support**: Switch between Azure OpenAI and Google Gemini
- **Modular Architecture**: Clean separation of concerns with services, routes, and middleware
- **Environment-based Configuration**: Different settings for development and production
- **Comprehensive Error Handling**: Proper error responses and logging
- **Input Validation**: Request validation and sanitization
- **Health Checks**: Built-in health endpoint
- **Graceful Shutdown**: Proper cleanup on server shutdown

## Project Structure

```
server/
├── config/
│   └── config.js              # Environment configuration
├── middleware/
│   ├── errorHandler.js        # Error handling middleware
│   └── validation.js          # Request validation
├── routes/
│   └── chat.js               # Chat API routes
├── services/
│   ├── aiService.js          # Main AI service coordinator
│   ├── azureOpenAIService.js # Azure OpenAI integration
│   └── geminiService.js      # Google Gemini integration
├── .env                      # Environment variables
├── package.json
└── server.js                 # Main server file
```

## Environment Setup

Copy the `.env` file and configure your API keys:

```env
# Server Configuration
NODE_ENV=development
PORT=3000

# Azure OpenAI Configuration
AZURE_OPENAI_ENDPOINT=your-azure-openai-endpoint-here
AZURE_OPENAI_API_KEY=your-azure-openai-api-key-here
AZURE_DEPLOYMENT_NAME=gpt-35-turbo
AZURE_API_VERSION=2023-05-15

# Google Gemini Configuration
GOOGLE_API_KEY=your-google-api-key-here
GEMINI_MODEL=gemini-pro
GEMINI_MAX_TOKENS=100
GEMINI_TEMPERATURE=0.7

# AI Configuration
DEFAULT_MAX_TOKENS=800
DEFAULT_TEMPERATURE=0.7
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Chat Providers
- `GET /api/providers` - Get available AI providers

### Chat Endpoints
- `POST /api/chat` - Universal chat endpoint (auto-selects provider)
- `POST /api/chat/azure` - Chat specifically with Azure OpenAI
- `POST /api/chat/gemini` - Chat specifically with Google Gemini

### Request Format

```json
{
  "message": "Your message here",
  "provider": "azure|gemini", // optional for /api/chat
  "options": {
    "maxTokens": 800,
    "temperature": 0.7,
    "systemMessage": "Custom system message" // Azure only
  }
}
```

### Response Format

```json
{
  "success": true,
  "message": "AI response",
  "provider": "azure|gemini",
  "model": "model-name",
  "usage": {
    "promptTokens": 10,
    "completionTokens": 50,
    "totalTokens": 60
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Client Integration

Your frontend can now:

1. **Check available providers**:
   ```javascript
   const response = await fetch('/api/providers');
   const { providers, defaultProvider } = await response.json();
   ```

2. **Let user select AI provider**:
   ```javascript
   const response = await fetch('/api/chat', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       message: 'Hello!',
       provider: 'azure' // or 'gemini'
     })
   });
   ```

3. **Use specific provider directly**:
   ```javascript
   const response = await fetch('/api/chat/gemini', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({
       message: 'Hello!',
       options: { maxTokens: 200 }
     })
   });
   ```

## Development

1. Install dependencies:
   ```bash
   npm install
   npm install morgan --save-dev  # for development logging
   ```

2. Start development server:
   ```bash
   npm start
   ```

3. The server will run on `http://localhost:3000` with development logging enabled.

## Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Configure production API keys
3. The server will automatically:
   - Disable development logging
   - Use production error handling
   - Enable optimizations

## Error Handling

The server includes comprehensive error handling:

- **Validation Errors**: 400 status with descriptive messages
- **Service Unavailable**: 503 when AI providers are not configured
- **API Errors**: Proper error forwarding from AI services
- **Development Mode**: Detailed error information including stack traces
- **Production Mode**: Clean error messages without sensitive information