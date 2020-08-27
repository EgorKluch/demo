const [clientConfig] = require('../config/webpack/webpack.dev.config');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/preset-typescript'],
  webpackFinal: async (config) => {
    return  {
        ...config,
        module: { ...config.module, rules: clientConfig.module.rules },
        resolve: {
            ...config.resolve,
            modules: clientConfig.resolve.modules,
            alias: clientConfig.resolve.alias
        },
        plugins: [
            ...config.plugins,
            new ExtractCssChunks({filename: '[name].css', chunkFilename: '[id].css'}),
        ]
    };
  },
};
