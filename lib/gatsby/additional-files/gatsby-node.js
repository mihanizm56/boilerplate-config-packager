const path = require('path');
const { copy } = require('./utils/fs-promises');
// const { createServiceWorker } = require('./config/service-worker');

exports.onCreateWebpackConfig = ({ getConfig, actions }) => {
  actions.setWebpackConfig({
    devtool: getConfig().mode === 'production' ? false : 'source-map',
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src'),
      },
    },
  });
};

// copy "public" to "build"
exports.onPostBuild = async () => {
  await copy(path.join(__dirname, 'public'), path.join(__dirname, 'build'));
};
