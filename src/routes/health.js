const express = require('express');
const axios = require('axios');

const { servers } = require('./proxy');

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
          status: 'failure',
        });
      } else {
        results.push({
          ...server,
          status: 'success',
        });
      }
    } catch (error) {
      results.push({
        ...server,
        status: 'failure',
      });
    }
  }

  res.status(200).json(results);
});

module.exports = router;
