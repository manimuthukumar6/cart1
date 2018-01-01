const loglevelPrefixPlugin = log => {
  const originalFactory = log.methodFactory;

  /* eslint-disable no-param-reassign */
  log.methodFactory = (methodName, logLevel, loggerName) => {
  /* eslint-enable no-param-reassign */
    const rawMethod = originalFactory(methodName, logLevel, loggerName);
    const currentTime = () => new Date().toLocaleTimeString('en-US', { hour12: false });
    return (...args) => rawMethod(`[${currentTime()}] [${methodName.toUpperCase()}]`, ...args);
  };

  // Be sure to call setLevel method in order to apply plugin.
  log.setLevel(log.getLevel());
};

const configureLogger = log => {
  loglevelPrefixPlugin(log);

  if (process.env.LOGLEVEL) {
    log.setLevel(process.env.LOGLEVEL, false);
  } else if (process.env.DEBUG && process.env.DEBUG === 'true') {
    log.setLevel(log.levels.TRACE, false);
  } else {
    log.setLevel(log.levels.INFO, false);
  }

  // log.debug('log level is set to: ', log.getLevel(), '(0 is trace, 5 is silent)');
  // Eg: LOGLEVEL=debug node build/production/public/server.bundle.js;
};

export default configureLogger;
