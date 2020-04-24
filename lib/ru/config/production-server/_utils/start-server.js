const { devServerLog } = require('../../../utils/dev-server-logger');

module.exports.startServer = ({ port, server }) =>
  new Promise((resolve, reject) => {
    try {
      server.listen(port, () => {
        devServerLog('info', 'server instance started on port', port);

        resolve(server);
      });
    } catch (error) {
      devServerLog('info', 'server failed to run', error);

      reject(error);
    }
  });
