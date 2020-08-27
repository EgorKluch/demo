const path = require('path');
const WebpackBar = require('webpackbar');
const webpack = require('webpack');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const Dotenv = require('dotenv-webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');
const webpackNodeExternals = require('webpack-node-externals');

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
        use: {
          loader: 'babel-loader'
        }
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
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new LoadablePlugin(),
    new ExtractCssChunks({filename: '[name].css', chunkFilename: '[id].css'}),
    new Dotenv({
      path: path.resolve(envPath, '.client.env')
    }),
    new WebpackBar({
      color: '#1b78bf'
    })
  ],
};

const clientConfig = {
  ...baseConfig,

  name: 'client',
  mode: 'production',
  target: 'web',
  devtool: 'hidden-source-map',

  entry: [
    path.resolve(srcPath, 'index.tsx'),
  ],

  output: {
    path: buildPath,
    filename: 'public/main.js',
    chunkFilename: 'public/[hash].js',
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
              minimize: true
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },

  optimization: {
    minimizer: [
      new TerserJSPlugin({
        sourceMap: false,
        // TerserPlugin config is taken almost entirely from react-scripts
        terserOptions: {
          parse: {
            // we want terser to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // Disabled because of an issue with Terser breaking valid code:
            // https://github.com/facebook/create-react-app/issues/5250
            // Pending futher investigation:
            // https://github.com/terser-js/terser/issues/120
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'async',
      // minSize: 30000,
      minChunks: 1,
      // maxAsyncRequests: 5,
      // maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          // minChunks: 2,
          // priority: -20,
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
  },

  plugins: [
    ...baseConfig.plugins,
    new LoadablePlugin({
      filename: 'public/loadable-stats.json'
    }),
    new ExtractCssChunks({filename: '[name].css', chunkFilename: '[id].css'}),
    new PurgecssPlugin({
      paths: glob.sync(path.resolve(srcPath, '**/*'),  { nodir: true }),
      whitelistPatterns: [/[slick|notification|ReactTable|activity\-table]/],
    }),
    new Dotenv({
      path: path.resolve(envPath, '.client.env')
    })
  ]
};

const serverConfig = {
  ...baseConfig,

  name: 'server',
  target: 'node',
  mode: 'production',
  devtool: 'hidden-source-map',

  entry: path.join(serverPath, 'index.ts'),

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

  externals: [webpackNodeExternals(), {
    knex: 'commonjs knex'
  }],

  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
};

module.exports = [clientConfig, serverConfig];
