const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Azure OpenAI Configuration
const AZURE_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;
const AZURE_API_KEY = process.env.AZURE_OPENAI_API_KEY;
const DEPLOYMENT_NAME = 'gpt-35-turbo';

// Google Gemini Configuration
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

// Azure OpenAI Chat Endpoint
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await axios.post(
      `${AZURE_ENDPOINT}/openai/deployments/${DEPLOYMENT_NAME}/chat/completions?api-version=2023-05-15`,
      {
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: message },
        ],
        max_tokens: 800,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-key': AZURE_API_KEY,
        },
      }
    );
    res.json({
      message: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Error processing request',
      details: error.response?.data || error.message,
    });
  }
});

// New Gemini Chat Endpoint
app.post('/gemini-chat', async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: 'gemini-pro',
      generationConfig: {
        maxOutputTokens: 100, // limit the response length
        temperature: 0.7, // creativity (0.0 - 1.0)
      },
    });
    const prompt = `${message}\n\nPlease format your response using these markers:
    - Use **Heading:** for section headings
    - Use * for bullet points
    - Use numbers followed by periods for numbered lists`;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      message: text,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      error: 'Error processing Gemini request',
      details: error.message,
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
