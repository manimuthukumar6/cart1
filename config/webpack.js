'use strict'; // eslint-disable-line strict

/* Node and npm modules */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const jsonImporter = require('node-sass-json-importer');

const getEnvironmentReplacements = environment =>
  /* Get an array of keys */
  Object.keys(environment)
    /* Map to an array of quoted key, value pairs. E.g, ['process.env.PORT', "'80'"] */
    .map(k => [`process.env.${k}`, JSON.stringify(environment[k])])
    /* Turn it back into an object (and fuck this old nodejs) */
    .reduce((environmentObject, currentReplacement) => {
      const o = {};
      o[currentReplacement[0]] = currentReplacement[1];
      return Object.assign({}, environmentObject, o);
    }, {});

const getBaseBrowserBundleConfig = environment => {
  const sassLoaderConfig = {
    precision: 10,
    importer: jsonImporter
  };

  /* ExtractTextPlugin breaks when used with hot module reloading. That's
     why we need two different configurations for our CSS/SCSS loaders and plugins. */
  const cssLoader = { test: /\.css$/ };
  const sassLoader = { test: /\.scss$/ };
  const svgSpritesLoader = { test: /\.svg$/, loaders: ['svg-sprite'] };
  const jsonLoader = { test: /\.json$/, loaders: ['json'] };

  cssLoader.loader = ExtractTextPlugin.extract('style-loader', 'css-loader');
  sassLoader.loader = ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader?outputStyle=expanded');
  const cssSassLoaderPlugins = [new ExtractTextPlugin(environment.CSS_BUNDLE_NAME)];

  return {
    entry: path.join(environment.PROJECT_ROOT, 'app/index.jsx'),
    output: {
      path: environment.STATIC_ASSETS_DIR,
      filename: environment.JS_BUNDLE_NAME,
      publicPath: environment.PUBLIC_PATH
    },
    module: {
      preLoaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }, {
        test: /\s[a|c]ss$/,
        exclude: /node_modules/,
        loader: 'sasslint'
      }],
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          cacheDirectory: true,
          env: {
            production: {
              plugins: ['transform-react-remove-prop-types']
            }
          }
        }
      }].concat([cssLoader, sassLoader, svgSpritesLoader, jsonLoader])
    },
    plugins: [
      new webpack.DefinePlugin({ 'process.env.ABOF_IS_BROWSER': true }),
      new webpack.DefinePlugin(getEnvironmentReplacements(environment))
    ].concat(cssSassLoaderPlugins),
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    sassLoader: sassLoaderConfig,
    stats: {
      children: false
    }
  };
};

const getDevelopmentBrowserBundleConfig = environment => {
  const config = getBaseBrowserBundleConfig(environment);
  config.devtool = 'eval';
  return config;
};

const getProductionBrowserBundleConfig = environment => {
  const config = getBaseBrowserBundleConfig(environment);
  config.plugins = config.plugins.concat([
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: true
      }
    })
  ]);

  return config;
};

const getBrowserBundleConfigForEnvironment = environment => {
  /* For now, return the dev config for both environments */
  if (environment.NODE_ENV === 'development') {
    return getDevelopmentBrowserBundleConfig(environment);
  } else if (environment.NODE_ENV === 'production') {
    return getProductionBrowserBundleConfig(environment);
  }

  throw new Error(`Unknown NODE_ENV '${environment.NODE_ENV}'.`);
};

const getServerBundleConfigForEnvironment = environment => {
  const getNodeModules = () =>
    fs.readdirSync('node_modules')
      .filter(x => ['.bin'].indexOf(x) === -1);

  const asCommonJs = modules =>
    modules.reduce((acc, mod) => Object.assign(acc, { [mod]: `commonjs ${mod}` }), {});

  return {
    entry: path.join(environment.PROJECT_ROOT, 'server/server.js'),
    target: 'node',
    node: {
      __dirname: false,
      __filename: false
    },
    output: {
      path: environment.BUILD_DIR,
      filename: environment.SERVER_JS_BUNDLE_NAME
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          cacheDirectory: true
        }
      }, {
        test: /\.json$/,
        loader: 'json'
      }]
    },
    plugins: [
      new webpack.DefinePlugin({ 'process.env.ABOF_IS_BROWSER': false }),
      new webpack.DefinePlugin(getEnvironmentReplacements(environment))
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    externals: asCommonJs(getNodeModules())
  };
};

module.exports = {
  getBrowserBundleConfigForEnvironment,
  getServerBundleConfigForEnvironment
};
