const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');
const { addReactRefresh } = require('customize-cra-react-refresh');

module.exports = override(
  addReactRefresh({ disableRefreshCheck: true }),
  addWebpackAlias({
    '@': path.resolve(process.cwd(), 'src/'),
  }),
);
