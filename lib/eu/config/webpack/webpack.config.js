const merge = require('webpack-merge');
const commonConfig = require('@wildberries/webpack-config-stream');

const config = {
  externals: [
    '@wildberries/service-products',
    '@wildberries/service-suppliers',
  ],
};

module.exports = merge.smart(commonConfig, config);
