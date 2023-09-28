const express = require('express');
const proxy = require('http-proxy-middleware');

const router = express.Router();

const servers = [
  {
    host: 'localhost',
    port: 3000,
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
