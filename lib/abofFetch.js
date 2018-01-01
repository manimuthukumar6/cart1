import isoFetch from 'isomorphic-fetch';
import log from 'loglevel';

export const fetch = (...args) => {
  const startTime = Date.now();
  const url = args[0];
  log.trace(`Requesting ${url}`);
  return new Promise((resolve, reject) => {
    isoFetch.apply(this, args).then(resp => {
      log.trace(`Response received in ${Date.now() - startTime}ms for ${url}.`);
      resolve(resp);
    }).catch(error => {
      log.trace(`Reponse failed. Time taken for ${url} is ${Date.now() - startTime}ms`);
      reject(error);
    });
  });
};

export default fetch;
