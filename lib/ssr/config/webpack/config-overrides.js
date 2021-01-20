const {
  getCacheAndThreadLoaderConfig,
} = require('@mihanizm56/ssr-scripts/configs/webpack');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = ([clientConfig, serverConfig]) => {
  const isProduction = clientConfig.mode === 'production';

  clientConfig.module.rules.push({
    test: /\.[jt]s$/,
    exclude: /node_modules/,
    use: [
      ...getCacheAndThreadLoaderConfig(isProduction),
      {
        loader: '@mihanizm56/webpack-magic-redux-modules',
      },
    ],
  });
  serverConfig.module.rules.push({
    test: /\.[jt]s$/,
    exclude: /node_modules/,
    use: [
      ...getCacheAndThreadLoaderConfig(isProduction),
      {
        loader: '@mihanizm56/webpack-magic-redux-modules',
      },
    ],
  });

  if (isProduction) {
    clientConfig.plugins.push(
      new CompressionPlugin({
        filename: '[path].br[query]',
        algorithm: 'brotliCompress',
        test: /\.js$|\.css$|\.json$|\.html$|\.ico$/,
        compressionOptions: {
          level: 11,
        },
      }),
    );
    clientConfig.rules.push(
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.json$|\.html$|\.ico$/,
      }),
    );
  }

  return [clientConfig, serverConfig];
};
