const express = require('express');
const proxy = require('http-proxy-middleware');

const healthyServers = require('../../healthLogs/serverHealth.json');

const router = express.Router();

// Proxy middleware configuration
const proxyOptions = {
  target: '',
  changeOrigin: true,
  onProxyReq: (proxyReq, req) => {
    proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
  },
  logLevel: 'debug',
};

let currentIndex = 0;

// Get next server
function getServer() {
  // Round robin
  currentIndex = (currentIndex + 1) % healthyServers.length;
  return healthyServers[currentIndex];
}

// Proxy requests
router.all('*', (req, res) => {
  // Get next target server
  const target = getServer();
  proxyOptions.target = `http://${target.host}:${target.port}`;

  // forward request
  proxy.createProxyMiddleware(proxyOptions)(req, res);
});

module.exports = { router };
