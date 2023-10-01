const fs = require('fs');
const path = require('path');
const colors = require('colors');

const servers = require('../resources/servers');
const { checkServerTcpHealth } = require('../utils/checkTCPConn');
const logger = require('../configs/logger');

const HEALTHLOGS_DIRECTORY = path.resolve(__dirname, '..', '..', 'healthLogs');

const saveHealthyServers = async () => {
  const healthStatuses = servers.map((server) => {
    return new Promise((resolve) => {
      checkServerTcpHealth(server, (healthResponse) => {
        resolve(healthResponse);
      });
    });
  });
  const data = await Promise.all(healthStatuses);
  const healthyServers = data.filter((server) => server.isHealthy);
  fs.writeFile(
    path.join(HEALTHLOGS_DIRECTORY, 'serverHealth.json'),
    JSON.stringify(healthyServers),
    (err) => {
      if (err) {
        logger.error('UNABLE TO SAVE HEALTH DETAILS'.red);
        throw err;
      }
      logger.info('HEALTH LOGS SUCCESSFULLY SAVED'.green);
    }
  );
};

module.exports = { saveHealthyServers };
