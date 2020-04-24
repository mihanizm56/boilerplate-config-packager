const { devServerLog } = require('../../utils/dev-server-logger');

// eslint-disable-next-line
module.exports.notFoundLogger = (req, res, next) => {
  devServerLog(
    'info',
    'get an error in serve static message:',
    'not found file',
  );
  devServerLog('info', 'get an error in serve static req.path:', req.path);
};
