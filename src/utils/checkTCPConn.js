const net = require('net');
const logger = require('../configs/logger');

async function checkServerTcpHealth(server, callback) {
  const client = new net.Socket();

  client.connect(server.port, server.host, () => {
    logger.info(`Server ${server.host}:${server.port} is healthy`);
    client.end();
    callback({
      ...server,
      isHealthy: true,
    });
  });

  client.on('error', (err) => {
    logger.warn(
      `Server ${server.host}:${server.port} is not healthy: ${err.message}`
    );
    callback({
      ...server,
      isHealthy: false,
    });
  });
}

module.exports = { checkServerTcpHealth };
