const path = require('path');

const envPath = path.resolve(__dirname, 'config/env');

module.exports = (api) => {
  const isServer = api.caller((caller) => caller && caller.target === 'node');

  return {
    'presets': ['@babel/preset-typescript', '@babel/env', '@babel/react'],
    'plugins': [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-syntax-dynamic-import',
      '@loadable/babel-plugin',
      isServer ? null : 'babel-plugin-transform-inline-environment-variables',
      isServer ? null : 'babel-plugin-minify-dead-code-elimination',
      ['inline-dotenv',{
        path: path.resolve(envPath, isServer ? '.server.dev.env' : '.client.dev.env')
      }],
      ['module-resolver', {
        root: ['.'],
        alias: {
          "#": "./src/"
        }
      }]
    ].filter((plugin) => plugin),
  };
};

