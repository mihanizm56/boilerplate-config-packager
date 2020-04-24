const path = require('path');

module.exports = (config) => ({
  ...config,
  entry: config.entry,
  resolve: {
    ...config.resolve,
    alias: {
      ...config.resolve.alias,
      '@': path.resolve(process.cwd(), 'src/'),
    },
  },
});
