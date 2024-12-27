const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const AZURE_ENDPOINT = process.env.AZURE_OPENAI_ENDPOINT;
const AZURE_API_KEY = process.env.AZURE_OPENAI_API_KEY;
const DEPLOYMENT_NAME = 'gpt-35-turbo';

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
