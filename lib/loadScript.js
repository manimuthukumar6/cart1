export default (scriptUrl, scriptId) =>
  new Promise((resolve, reject) => {
    if (document.getElementById(scriptId)) {
      return resolve({ ok: true });
    }

    const scriptTag = document.createElement('script');
    scriptTag.id = scriptId;

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);

    scriptTag.onload = () => resolve({ ok: true });
    scriptTag.onerror = () => reject({ ok: false });
    scriptTag.src = scriptUrl;
    return scriptTag;
  });
