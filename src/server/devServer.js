require("@babel/register")({extensions: ['.js', '.ts']});
const webpack = require('webpack');
const errorHandler = require('./middlewares/errorHandler');
const config = require('../../config/webpack/webpack.dev.config.js');
const createApp = require('./createApp').default;

const app = createApp();

const [clientConfig, serverConfig] = config;

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const multiCompiler = webpack([clientConfig, serverConfig]);
const clientCompiler = multiCompiler.compilers.find((compiler) => compiler.name === 'client');

let isStarted = false;

// note that we pass multiCompiler to webpackDevMiddleware
app.use(
  webpackDevMiddleware(multiCompiler, {
    logLevel: 'trace',
    stats: 'errors-only',
    noInfo: true,
    writeToDisk: true,
    // publicPath: clientConfig.output.publicPath,
  })
);
app.use(webpackHotMiddleware(clientCompiler, {
  path: '/__webpack_hmr'
}));
app.use(webpackHotServerMiddleware(multiCompiler, {
  serverRendererOptions: { outputPath: clientConfig.output.path },
}));

errorHandler.default(app);

// Add multiCompiler done hook for nice console output
multiCompiler.hooks.done.tap('startSsr', () => {
  // prevent server to try to start again after hot reload
  if (!isStarted) {
    app.listen(3000, () => {
      console.log('Running on http://localhost:3000/');
    });
    isStarted = true;
  }
});
