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

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ actions: { createPage } }) => {
  createPage({
    path: '/login/',
    component: path.join(process.cwd(), 'src', 'pages', 'index.tsx'),
  });
};

// copy "public" to "build"
exports.onPostBuild = async () => {
  await copy(path.join(__dirname, 'public'), path.join(__dirname, 'build'));

  // await createServiceWorker();
};
