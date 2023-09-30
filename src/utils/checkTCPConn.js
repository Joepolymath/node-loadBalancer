const net = require('net');

async function checkServerTcpHealth(server, callback) {
  const client = new net.Socket();

  client.connect(server.port, server.host, () => {
    console.log(`Server ${server.host}:${server.port} is healthy`);
    client.end();
    callback({
      ...server,
      isHealthy: true,
    });
  });

  client.on('error', (err) => {
    console.error(
      `Server ${server.host}:${server.port} is not healthy: ${err.message}`
    );
    callback({
      ...server,
      isHealthy: false,
    });
  });
}

module.exports = { checkServerTcpHealth };
