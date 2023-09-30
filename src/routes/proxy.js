const express = require('express');
const proxy = require('http-proxy-middleware');

const router = express.Router();

const servers = [
  {
    id: 1,
    host: 'localhost',
    port: 3002,
    weight: 1,
  },
  {
    id: 2,
    host: 'localhost',
    port: 3003,
    weight: 1,
  },
  {
    id: 3,
    host: 'localhost',
    port: 3004,
    weight: 1,
  },
  // I can add more servers here if I want.
];

// Proxy middleware configuration
const proxyOptions = {
  target: '',
  changeOrigin: true,
  onProxyReq: (proxyReq, req) => {
    // Add custom header to request
    proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
  },
  logLevel: 'debug',
};

// NExt server index
let currentIndex = 0;

// Get next server
function getServer() {
  // Round robin
  currentIndex = (currentIndex + 1) % servers.length;
  return servers[currentIndex];
}

// Proxy requests
router.all('*', (req, res) => {
  // Get next target server
  const target = getServer();
  proxyOptions.target = `http://${target.host}:${target.port}`;

  // forward request
  proxy.createProxyMiddleware(proxyOptions)(req, res);
});

module.exports = { router, servers };
