const errorObject = (logPrefix, errorMsg, json) => ({
  ok: false,
  errorMsg,
  json
});

// curried!!
export const normalizeResponse = (respType, logPrefix) => resp => {
  if (!resp.ok) {
    Promise.resolve(
      errorObject(logPrefix, {
        type: 'FETCH_NETWORK_ERROR',
        message: `${logPrefix} fetch error: ${resp.statusText}`,
        status: resp.status
      })
    );
  }

  const bodyPromise = respType === 'json' ? resp.json() : resp.text();
  return bodyPromise.then(body => {
    let errorMsg = null;

    if (body.errors) {
      /* If the body failed to parse correctly */
      errorMsg = {
        type: 'FETCH_APPLICATION_ERROR',
        message: `${logPrefix} response parsing error`
      };
      return Object.assign({ status: resp.status }, errorObject(logPrefix, errorMsg, body));
    }

    return {
      ok: resp.status,
      json: body,
      status: resp.status
    };
  })
  .catch(e => ({
    ok: false,
    errorMsg: {
      type: 'FETCH_PROCESSING_ERROR',
      message: e.toString()
    },
    status: resp.status
  }));
};

export const normalizeJSONResponse = normalizeResponse.bind(null, 'json');
export const normalizeTextResponse = normalizeResponse.bind(null, 'text');

export const isSuccessStatus = resp => {
  if (!resp || !resp.status) {
    return false;
  }
  return resp.status >= 200 && resp.status <= 299;
};
