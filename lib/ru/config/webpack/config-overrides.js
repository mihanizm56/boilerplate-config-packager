const path = require('path');
const {
  override,
  addWebpackAlias,
  adjustStyleLoaders,
} = require('customize-cra');
const { addReactRefresh } = require('customize-cra-react-refresh');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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

module.exports = override(
  CSSPlugin,
  adjustStyleLoaders(StyleLoaderConfig),
  addReactRefresh({ disableRefreshCheck: true }),
  addWebpackAlias({
    '@': path.resolve(process.cwd(), 'src/'),
  }),
);
