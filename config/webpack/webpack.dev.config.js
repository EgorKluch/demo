const path = require('path');
const WebpackBar = require('webpackbar');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const basePath = path.resolve(__dirname, '../..');
const buildPath = path.resolve(basePath, 'build');
const nodeModulesPath = path.resolve(basePath, 'node_modules');
const srcPath = path.resolve(basePath, 'src');
const serverPath = path.resolve(srcPath, 'server');
const envPath = path.resolve(basePath, 'config/env');

const baseConfig = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ].filter((loader) => loader)
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]-[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {
            limit: 1000
          }
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          }
        }]
      },
    ]
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [
      nodeModulesPath,
    ],
    alias: {
      '#': srcPath
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new LoadablePlugin(),
    new ExtractCssChunks({filename: '[name].css', chunkFilename: '[id].css'}),
    new WebpackBar({
      color: '#1b78bf'
    })
  ],

  optimization: {
    usedExports: true,
    minimizer: [new UglifyJsPlugin()],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        styles : {
          name: 'styles',
          test: /\.css$/,
          chunks: 'async',
          enforce: true
        },
      }
    }
  }
};

const clientConfig = {
  ...baseConfig,

  name: 'client',
  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',

  entry: [
    'webpack-hot-middleware/client',
    path.resolve(srcPath, 'index.tsx'),
  ],

  output: {
    path: buildPath,
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js'
  },

  module: {
    ...baseConfig.module,
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: ExtractCssChunks.loader,
            options: {
              hmr: true,
            }
          },
          'cache-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ].filter((loader) => loader)
      }
    ]
  },

  plugins: [
    ...baseConfig.plugins,
    new Dotenv({
      path: path.resolve(envPath, '.client.env')
    })
  ]
};

const serverConfig = {
  ...baseConfig,

  name: 'server',
  target: 'node',
  mode: 'development',
  devtool: 'inline-source-map',

  entry: path.join(serverPath, 'index-hot.ts'),

  output: {
    filename: 'server.js',
    path: buildPath,
    libraryTarget: 'commonjs2'
  },

  module: {
    ...baseConfig.module,
    rules: [
      ...baseConfig.module.rules,
      {
        test: /\.(css|scss)$/,
        use: 'null-loader'
      }
    ]
  },

  plugins: [
    ...baseConfig.plugins,
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new Dotenv({
      path: path.resolve(envPath, '.server.env')
    })
  ],

  externals: {
    knex: 'commonjs knex'
  },

  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
};

module.exports = [clientConfig, serverConfig];
