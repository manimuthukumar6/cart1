const debounce = (callback, debounceInterval) => {
  let previousTimeoutId;
  const delayCallback = (event) => {
    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }
    return setTimeout(() => callback(event), debounceInterval);
  };

  return (event) => {
    event.persist();
    previousTimeoutId = delayCallback(event);
  };
};

export default debounce;
