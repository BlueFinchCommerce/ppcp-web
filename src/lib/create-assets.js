const cache = {};
// Create a cache of all the loaded scripts so that we don't load them multiple times.
const createAssets = (url, params, namespace, pageType, userIdToken) => {
  const generateKey = (urlParam, namespaceParam, tokenParam = '') => urlParam + namespaceParam + tokenParam;

  let finalUrl = url;
  if (params) {
    finalUrl = new URL(finalUrl);
    finalUrl.search = new URLSearchParams(params);
    finalUrl = decodeURIComponent(finalUrl.href);
  }

  const key = generateKey(finalUrl, namespace, userIdToken);

  // If the key has already been used return the existing promise that will already be resolved.
  if (cache[key]) {
    return cache[key];
  }

  // New keys we will add to the cache and then return the pending promise.
  cache[key] = new Promise((resolve) => {
    const script = document.createElement('script');

    script.src = finalUrl;
    script.dataset.namespace = `paypal_${namespace}`;
    script.dataset.partnerAttributionId = 'GENE_PPCP';
    script.dataset.pageType = pageType || 'checkout';
    if (userIdToken) {
      script.dataset.userIdToken = userIdToken;
    }

    // On load resolve but also emit a global event.
    script.onload = () => {
      const event = new CustomEvent('ppcpScriptLoaded', {
        detail: namespace,
      });
      document.dispatchEvent(event);
      resolve();
    };

    document.head.appendChild(script);
  });

  return cache[key];
};

module.exports = {
  create: createAssets,
};
