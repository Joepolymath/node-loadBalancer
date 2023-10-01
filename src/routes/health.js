const express = require('express');
const axios = require('axios');
const net = require('net');

const servers = require('../resources/servers');
const { checkServerTcpHealth } = require('../utils/checkTCPConn');

const router = express.Router();

router.get('/http', async (req, res) => {
  const results = [];

  for (let server of servers) {
    try {
      const response = await axios.get(
        `http://${server.host}:${server.port}/health`
      );

      if (response.status !== 200) {
        results.push({
          ...server,
          isHealthy: false,
        });
      } else {
        results.push({
          ...server,
          isHealthy: true,
        });
      }
    } catch (error) {
      results.push({
        ...server,
        isHealthy: false,
      });
    }
  }

  res.status(200).json(results);
});

router.get('/tcp', async (req, res) => {
  const healthStatuses = servers.map((server) => {
    return new Promise((resolve) => {
      checkServerTcpHealth(server, (healthResponse) => {
        resolve(healthResponse);
      });
    });
  });
  const data = await Promise.all(healthStatuses);
  res.status(200).json(data);
});

module.exports = router;
