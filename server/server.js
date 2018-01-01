/* Node and npm modules */
require('babel-polyfill');
const path = require('path');
const koa = require('koa');
const mount = require('koa-mount');
const proxy = require('koa-proxy');
const staticCache = require('koa-static-cache');
const serverConfig = require('./config');

const abofApi = require('../lib/api');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const staticCacheConfig = {
  maxAge: 350 * 24 * 60 * 60 * 1000
};

const run = () => {
  console.log('run', 'runing...');
  const server = koa();
  server.proxy = true; /* trust proxy headers */

  if (process.env.NODE_ENV === 'development') {
    /* Proxy requests to get around CORS. */
  }

  // const serviceabilityApi = storeConf.getServiceabilityConfig();
  /*server.use(proxy({
    host: serviceabilityApi.host,
    map: {
      '/checkout/serviceability/cart': serviceabilityApi.path
    },
    match: /\/checkout\/serviceability\/cart/,
    jar: false
  }));*/

  /* Serve static resources from the filesystem. */
  if (process.env.IS_BUNDLE === 'true') {
    server.use(mount(
      process.env.PUBLIC_PATH,
      staticCache(path.join(__dirname, 'public'), staticCacheConfig)
    ));
  } else if (process.env.IS_BUNDLE === 'false') {
    server.use(mount(
      process.env.PUBLIC_PATH + '/fonts',
      staticCache(path.join(__dirname, '../fonts'), staticCacheConfig)
    ));
    server.use(mount(
      process.env.PUBLIC_PATH + '/images',
      staticCache(path.join(__dirname, '../images'), staticCacheConfig)
    ));
  }

  if (process.env.NODE_ENV === 'development' && process.env.IS_BUNDLE === 'false') {
    /* eslint-disable global-require */
    const webpack = require('webpack');
    const webpackDevMiddleware = require('koa-webpack-dev-middleware');
    const webpackConfig = require('../config/webpack');
    /* eslint-enable global-require */

    const compiler = webpack(webpackConfig.getBrowserBundleConfigForEnvironment(process.env));
    server.use(webpackDevMiddleware(compiler, {
      publicPath: process.env.PUBLIC_PATH,
      stats: { errorDetails: true, children: false },
      historyApiFallback: true,
      hot: false
    }));
  }

  server.use(require('./middleware/renderReactApplication')());
  server.use(require('./middleware/renderTemplate')());

  const host = process.env.HOST || serverConfig.HOST;
  const port = process.env.PORT || serverConfig.PORT;
  server.listen(port, host, () => console.log(`Serving on http://${host}:${port}`)); // eslint-disable-line no-console
};

const STORE_CONF_RESET_INTERVAL = 60 * 60 * 1000;/* mintues * seconds * milliseconds */
// setInterval(storeConf.setStoreConf, STORE_CONF_RESET_INTERVAL);

/*storeConf
  .setStoreConf()
  .then(run)
  .catch(e => {
    console.error('Error?????',e);
    run();
  });*/
run();
