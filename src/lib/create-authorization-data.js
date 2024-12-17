const { atob } = require('./vendor/polyfill');
// var CLIENT_API_URLS = require("../lib/constants").CLIENT_API_URLS;

function _isTokenizationKey(str) {
  return /^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(str);
}

function _parseTokenizationKey(tokenizationKey) {
  const tokens = tokenizationKey.split('_');
  const environment = tokens[0];
  const merchantId = tokens.slice(2).join('_');

  return {
    merchantId,
    environment,
  };
}

function createAuthorizationData(authorization) {
  let parsedClientToken; let
    parsedTokenizationKey;
  const data = {
    attrs: {},
    configUrl: '',
  };

  console.log(_isTokenizationKey(authorization));

  if (_isTokenizationKey(authorization)) {
    parsedTokenizationKey = _parseTokenizationKey(authorization);
    data.environment = parsedTokenizationKey.environment;
    data.attrs.tokenizationKey = authorization;
    data.configUrl = `${CLIENT_API_URLS[parsedTokenizationKey.environment]
    }/merchants/${
      parsedTokenizationKey.merchantId
    }/client_api/v1/configuration`;
  } else {
    parsedClientToken = JSON.parse(atob(authorization));

    console.log('parsedClientToken', parsedClientToken);
    data.environment = parsedClientToken.environment;
    data.attrs.authorizationFingerprint = parsedClientToken.authorizationFingerprint;
    data.configUrl = parsedClientToken.configUrl;
    data.graphQL = parsedClientToken.graphQL;
  }

  return data;
}

module.exports = createAuthorizationData;
