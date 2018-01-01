const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const metadata = require('../../metadata');

import runtimeEnvironmentConfig from '../../../config/runtimeEnvironmentConfig';

const getTemplate = templatePath => {
  const templateString = fs.readFileSync(templatePath, 'utf-8');
  return handlebars.compile(templateString);
};

const renderTemplate = () => {
  const successTemplate = getTemplate(path.join(__dirname, './checkoutApp.hbs'));

  return function* renderTemplateMiddleware(next) {
    this.response.type = 'html';
    const meta = metadata.getMetaData(this.request.url);
    const templateVars = {
      appVersion: process.env.VERSION,
      runtimeEnvironmentConfig: JSON.stringify(runtimeEnvironmentConfig[process.env.RUNTIME_ENVIRONMENT || 'default']),
      initialState: JSON.stringify(this.state.checkoutAppInitialState || {}),
      body: (this.state && this.state.checkoutAppBody) || '',
      jsBundlePath: process.env.JS_BUNDLE_PUBLIC_PATH,
      cssBundlePath: process.env.CSS_BUNDLE_PUBLIC_PATH,
      metaData: meta,
      title: meta.title,
      publicPath: process.env.PUBLIC_PATH
    };
    this.body = successTemplate(templateVars);
    yield next;
  };
};

module.exports = renderTemplate;
