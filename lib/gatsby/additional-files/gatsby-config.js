/* eslint-disable @typescript-eslint/camelcase */

// eslint-disable-next-line
const proxy = require('http-proxy-middleware');

module.exports = {
  siteMetadata: {
    title: 'Passport',
  },
  pathPrefix: '/login',
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        cssLoaderOptions: {
          camelCase: false,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-compression-v2',
      options: {
        asset: '[path].gz[query]',
        algorithm: 'gzip',
      },
    },
    {
      resolve: 'gatsby-plugin-brotli',
      options: {
        extensions: ['css', 'html', 'js', 'svg'],
      },
    },
    // {
    //   resolve: 'gatsby-plugin-react-i18next',
    //   options: {
    //     path: path.join(process.cwd(), 'src', 'i18n', 'locales'),
    //     languages: ['ru', 'en'],
    //     fallbackLng: 'en',
    //     i18nextOptions: {
    //       debug: true,
    //     },
    //   },
    // },
    // {
    //   resolve: 'gatsby-plugin-manifest',
    //   options: {
    //     icon: 'icon.svg',
    //     cache_busting_mode: 'none',
    //   },
    // },
  ],
  developMiddleware: (app) => {
    app.use(
      '/passport/api/v2',
      proxy({
        target: 'http://localhost:8080',
        changeOrigin: true,
      }),
    );
  },
};
