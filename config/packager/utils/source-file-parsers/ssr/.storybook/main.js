/* eslint-disable no-param-reassign */
const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    '@storybook/addon-knobs',
    '@storybook/addon-viewport',
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /(module)?\.s(a|c)ss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      use: [
        {
          loader: 'file-loader',
          query: {
            name: '[name].[ext]',
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });

    config.resolve = {
      ...config.resolve,
      alias: {
        '@': path.resolve(__dirname, '../src/'),
      },
    };

    return config;
  },
};
