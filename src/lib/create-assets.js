"use strict";

// Create a cache of all the loaded scripts so that we don't load them multiple times.
function createAssets(authorization) {
    const cache = {},
        generateKey = (url, namespace, token = '') => {
            return url + namespace + token;
        };

    return function (url, params, namespace = 'ppcp', pageType, userIdToken) {

        if (params) {
        //    url = url + '?' + $.param(params);
            url = new URL(url);
            url.search = new URLSearchParams(params);
            url = decodeURIComponent(url.href)

            console.log(url)
        }

        const key = generateKey(url, namespace, userIdToken);

        // If the key has already been used return the existing promise that will already be resolved.
        if (cache[key]) {
            return cache[key];
        }

        // New keys we will add to the cache and then return the pending promise.
        cache[key] = new Promise((resolve) => {
            const script = document.createElement('script');

            script.src = url;
            script.dataset.namespace = `ppcp_${namespace}`;
           // script.dataset.partnerAttributionId = getPartnerId();
            script.dataset.pageType = pageType || 'checkout';
            if (userIdToken) {
                script.dataset.userIdToken = userIdToken;
            }

            // On load resolve but also emit a global event.
            script.onload = () => {

                // Trigger event ppcpScriptLoaded
                var event = new CustomEvent("ppcpScriptLoaded", {
                    "detail": namespace
                });
                document.dispatchEvent(event);
                resolve();
            };

            document.head.appendChild(script);
        });

        return cache[key];
    };
}

module.exports = {
    create: createAssets(),
};