const merge = require('webpack-merge');
const commonConfig = require('@wildberries/webpack-config-stream');
const ActionsLoaderConfig = require('@mihanizm56/webpack-magic-redux-modules/lib/loader-config');

const config = {
  externals: [
    '@wildberries/service-products',
    '@wildberries/service-suppliers',
  ],
  module: {
    rules: [ActionsLoaderConfig()],
  },
};

module.exports = merge.smart(commonConfig, config);
