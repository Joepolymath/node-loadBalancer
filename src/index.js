const fs = require('fs');
const https = require('https');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const colors = require('colors');

const { healthCheckWithCron } = require('./helpers/scheduler');
const { router: proxyRouter } = require('./routes/proxy');
const healthRouter = require('./routes/health');
const { saveHealthyServers } = require('./helpers/getHealthyServers');
const logger = require('./configs/logger');

const app = express();

app.use(morgan('dev'));
app.use('/app', proxyRouter);
app.use('/health', healthRouter);

const options = {
  key: fs.readFileSync(path.join(__dirname, 'ssl/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl/cert.pem')),
};

const PORT = 443;

https.createServer(options, app).listen(PORT, () => {
  logger.info(`Load Balancer Started on port: ${PORT}`.yellow.bold);
  saveHealthyServers();
  // Starting health check cron job
  healthCheckWithCron().start();
});
