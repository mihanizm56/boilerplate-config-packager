const { devServerLog } = require('../../../utils/dev-server-logger');

// eslint-disable-next-line
module.exports.notFoundLogger = (req, res, next) => {
  devServerLog(
    'info',
    'get a fault in serve static match, message:',
    'not found file',
  );
  devServerLog('info', 'get a fault in serve static req.path:', req.path);
};
