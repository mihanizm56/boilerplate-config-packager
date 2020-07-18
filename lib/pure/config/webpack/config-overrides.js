const path = require('path');
const {
  override,
  addWebpackAlias,
  adjustStyleLoaders,
  addWebpackPlugin,
} = require('customize-cra');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { addReactRefresh } = require('customize-cra-react-refresh');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const CSSPlugin = config => {
  const modifiedPlugins = config.plugins.map(plugin => {
    if (
      Boolean(plugin.constructor) &&
      plugin.constructor.name === MiniCssExtractPlugin.name
    ) {
      return new MiniCssExtractPlugin({
        ...plugin.options,
        ignoreOrder: true,
      });
    }

    return plugin;
  });

  return { ...config, plugins: modifiedPlugins };
};

const StyleLoaderConfig = ({ use: [, css] }) => {
  // eslint-disable-next-line
  css.options.modules = {
    localIdentName: '[local]-[hash:base64:3]',
  };
};

module.exports =
  process.env.NODE_ENV === 'production'
    ? override(
        CSSPlugin,
        adjustStyleLoaders(StyleLoaderConfig),
        addWebpackPlugin(
          new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.json$|\.html$|\.ico$/,
          }),
        ),
        addWebpackPlugin(
          new CompressionPlugin({
            filename: '[path].br[query]',
            algorithm: 'brotliCompress',
            test: /\.js$|\.css$|\.json$|\.html$|\.ico$/,
            compressionOptions: {
              level: 11,
            },
          }),
        ),
        addWebpackAlias({
          '@': path.resolve(process.cwd(), 'src/'),
        }),
        addWebpackPlugin(new ProgressBarPlugin()),
      )
    : override(
        CSSPlugin,
        adjustStyleLoaders(StyleLoaderConfig),
        addReactRefresh({ disableRefreshCheck: true }),

        addWebpackAlias({
          '@': path.resolve(process.cwd(), 'src/'),
        }),
      );
