const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');
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

module.exports = override(
  CSSPlugin,
  addReactRefresh({ disableRefreshCheck: true }),
  addWebpackAlias({
    '@': path.resolve(process.cwd(), 'src/'),
  }),
);
