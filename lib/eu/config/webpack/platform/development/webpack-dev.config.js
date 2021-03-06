const merge = require('webpack-merge');
const commonConfig = require('@wildberries/webpack-config-stream');
const ReduxMagicConfig = require('@mihanizm56/webpack-magic-redux-modules/lib/loader-config');
const PlatformBuildWithWatchPlugin = require('@wildberries/webpack-stream-watcher');

const config = {
  plugins: [new PlatformBuildWithWatchPlugin({})],
  module: {
    rules: [ReduxMagicConfig()],
  },
};

module.exports = merge.smart(commonConfig, config);
