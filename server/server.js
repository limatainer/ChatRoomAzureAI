const express = require('express');
const cors = require('cors');
const { config, validateConfig, isDevelopment } = require('./config/config');
const chatRoutes = require('./routes/chat');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

if (isDevelopment()) {
  console.log('Development mode: detailed logging enabled');
}

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: config.server.nodeEnv,
    version: process.env.npm_package_version || '1.0.0'
  });
});

app.use('/api', chatRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  try {
    validateConfig();
    
    const server = app.listen(config.server.port, () => {
      console.log(`Server running on port ${config.server.port}`);
      console.log(`Environment: ${config.server.nodeEnv}`);
      console.log(`Health check: http://localhost:${config.server.port}/health`);
    });

    const gracefulShutdown = (signal) => {
      console.log(`\nReceived ${signal}. Starting graceful shutdown...`);
      server.close((err) => {
        if (err) {
          console.error('Error during server shutdown:', err);
          process.exit(1);
        }
        console.log('Server closed successfully');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = app;