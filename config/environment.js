'use strict'; // eslint-disable-line strict

/**
 * WARNING: never import this directly. Inject the value returned by getEnvironment() into
 * the application using Webpack or nodemon in your gulpfile.
 */

/* Node and npm modules */
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

/* Project modules */
const getProjectVersion = require('../lib/getProjectVersion');

/**
 * Traverses upward from this file until it finds a directory with a package.json.
 * Returns the absolute path to that directory.
 */
const getProjectRoot = () => {
  let currentDirectory = __dirname;
  do {
    if (_.includes(fs.readdirSync(currentDirectory), 'package.json')) {
      return currentDirectory;
    }

    currentDirectory = path.resolve(currentDirectory, '..');
  } while (currentDirectory);

  return null;
};

/**
 * Default values for environment variables. The user can override any of these
 * in the console at build time. Anything you put in here will be injected into
 * the code as a constant. E.g, adding { PORT: 9000 } here will replace
 * "process.env.PORT" throughout the codebase with "9000".
 */
const DEFAULT_ENV = {
  NODE_ENV: 'development',
  IS_BUNDLE: 'false'
};

/**
 * Returns an object with application configuration.
 * Never call this function directly from your code. The project is set up so that
 * this object will be globally accessible via process.env.
 *
 * While in development mode, the configuration is injected into the project via
 * nodemon. While building a bundle for production, the configuration is injected
 * into the project via webpack.
 *
 * There are two places where the default mappings can be overridden:
 *
 *   - At injection time (usually in the gulpfile) by passing in an extra object
 *   - Via environment variables
 *
 * First the default settings are applied, then the settings in the overrides object,
 * and finally the environment variables.
 */
const getEnvironment = overrides => {
  overrides = overrides || {};   // eslint-disable-line no-param-reassign
  const userEnv = _.pick(process.env, Object.keys(DEFAULT_ENV));
  const resolvedEnv = _.merge(DEFAULT_ENV, overrides, userEnv);

  /* Collect information from the environment */
  const projectRoot = getProjectRoot();
  const projectVersion = getProjectVersion();

  /* These variables can't be overridden */
  /* If you put a '/' at the end of the public path, none of the assets will be served properly.
     The presence of that '/' affects koa-mount's path matching algorithm. */
  const publicPath = '/checkout/public';
  const buildDir = path.join(projectRoot, `dist/${resolvedEnv.NODE_ENV}/${projectVersion}/`);
  // const buildDir = path.join(projectRoot, `dist/${resolvedEnv.NODE_ENV}/${projectVersion}/`).replace(/\\/g, '/');
  const jsBundleName = `abof-checkout.${projectVersion}.client.js`;
  const serverJsBundleName = `abof-checkout.${projectVersion}.server.js`;
  const jsBundlePublicPath = path.join(publicPath, jsBundleName);
  // const jsBundlePublicPath = path.join(publicPath, jsBundleName).replace(/\\/g, '/');
  const cssBundleName = `abof-checkout.${projectVersion}.css`;
  const cssBundlePublicPath = path.join(publicPath, cssBundleName);
  // const cssBundlePublicPath = path.join(publicPath, cssBundleName).replace(/\\/g, '/');
  return _.merge(resolvedEnv, {
    VERSION: projectVersion,
    PROJECT_ROOT: projectRoot,
    BUILD_DIR: buildDir,
    STATIC_ASSETS_DIR: path.join(buildDir, 'public'),
    JS_BUNDLE_NAME: jsBundleName,
    SERVER_JS_BUNDLE_NAME: serverJsBundleName,
    JS_BUNDLE_PUBLIC_PATH: jsBundlePublicPath,
    CSS_BUNDLE_NAME: cssBundleName,
    CSS_BUNDLE_PUBLIC_PATH: cssBundlePublicPath,
    PUBLIC_PATH: publicPath
  });
};

module.exports = { DEFAULT_ENV, getEnvironment };
