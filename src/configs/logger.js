const path = require('path');
const winston = require('winston');

const LOGS_DIRECTORY = path.resolve(__dirname, '..', '..', 'logs');

// Define the Winston logger with a custom format
const logger = winston.createLogger({
  level: 'info', // Log level (e.g., 'info', 'error', 'warn', 'debug')
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] ${message}\n`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(LOGS_DIRECTORY, 'error.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: path.join(LOGS_DIRECTORY, 'combined.log'),
    }),
  ],
});

module.exports = logger;
