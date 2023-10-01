const cron = require('node-cron');

const { saveHealthyServers } = require('./getHealthyServers');

const healthCheckWithCron = () => {
  const job = cron.schedule('* * * * *', async () => {
    console.log('CRON JOB RUNNING');
    await saveHealthyServers();
  });

  return job;
};

module.exports = { healthCheckWithCron };
