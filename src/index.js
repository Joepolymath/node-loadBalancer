const fs = require('fs');
const https = require('https');
const express = require('express');
const path = require('path');

const { router: proxyRouter } = require('./routes/proxy');
const healthRouter = require('./routes/health');

const app = express();

app.use('/app', proxyRouter);
app.use('/health', healthRouter);

const options = {
  key: fs.readFileSync(path.join(__dirname, 'ssl/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl/cert.pem')),
};

const PORT = 443;

https.createServer(options, app).listen(PORT, () => {
  console.info('Load Balancer Started on port:', PORT);
});
