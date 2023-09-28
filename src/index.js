const fs = require('fs');
const https = require('https');

const options = {
  key: fs.readFileSync('../ssl/key.pem'),
  cert: fs.readFileSync('../ssl/cert.pem'),
};

const PORT = 443;

https.createServer(options, app).listen(PORT, () => {
  console.info('Load Balancer Started on port:', PORT);
});
