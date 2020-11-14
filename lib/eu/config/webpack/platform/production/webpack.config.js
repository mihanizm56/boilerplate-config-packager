const merge = require('webpack-merge');
const commonConfig = require('@wildberries/webpack-config-stream');
const ReduxMagicConfig = require('@mihanizm56/webpack-magic-redux-modules/lib/loader-config');

const config = {
  module: {
    rules: [ReduxMagicConfig()],
  },
};

module.exports = merge.smart(commonConfig, config);
