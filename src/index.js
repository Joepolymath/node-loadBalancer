const fs = require('fs');
const https = require('https');
const express = require('express');
const path = require('path');

const proxyRouter = require('./routes/proxy');

const app = express();

app.use('/app', proxyRouter);

const options = {
  key: fs.readFileSync(path.join(__dirname, 'ssl/key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'ssl/cert.pem')),
};

const PORT = 443;

https.createServer(options, app).listen(PORT, () => {
  console.info('Load Balancer Started on port:', PORT);
});
