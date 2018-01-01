import log from 'loglevel';

const fetches = {};

export default ({
  get: id => fetches[id],
  set: (id, promise) => {
    if (fetches[id]) {
      log.info('existing mapping', id);
    }

    fetches[id] = promise;

    return promise;
  }
});
