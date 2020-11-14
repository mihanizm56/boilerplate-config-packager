const merge = require('webpack-merge');
const commonConfig = require('@wildberries/webpack-config-stream');
const ReduxMagicConfig = require('@mihanizm56/webpack-magic-redux-modules/lib/loader-config');
const CompressionPlugin = require('compression-webpack-plugin');

const isNodeVersionUpperThanTen = nodeVersion =>
  Number(nodeVersion.match(/\d{2}/)[0]) > 10;

const config = {
  module: {
    rules: [ReduxMagicConfig()],
  },
  plugins: [
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.json$|\.html$|\.ico$/,
    }),
    isNodeVersionUpperThanTen(process.version) &&
      new CompressionPlugin({
        filename: '[path].br[query]',
        algorithm: 'brotliCompress',
        test: /\.js$|\.css$|\.json$|\.html$|\.ico$/,
        compressionOptions: {
          level: 11,
        },
      }),
  ],
};

module.exports = merge.smart(commonConfig, config);
