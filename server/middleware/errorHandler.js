const { isDevelopment } = require('../config/config');

const errorHandler = (err, req, res, next) => {
  console.error('Error occurred:', {
    message: err.message,
    stack: isDevelopment() ? err.stack : undefined,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;
  const response = {
    error: true,
    message: err.message || 'Internal server error',
    ...(isDevelopment() && {
      stack: err.stack,
      details: err.details
    })
  };

  res.status(statusCode).json(response);
};

const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: true,
    message: `Route ${req.method} ${req.path} not found`
  });
};

module.exports = {
  errorHandler,
  asyncHandler,
  notFoundHandler
};