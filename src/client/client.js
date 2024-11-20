"use strict";

//var BRAINTREE_VERSION = require("./constants").BRAINTREE_VERSION;

//var GraphQL = require("./request/graphql");
//var request = require("./request");
//var isVerifiedDomain = require("../lib/is-verified-domain");
//var BraintreeError = require("../lib/braintree-error");
//var convertToBraintreeError = require("../lib/convert-to-braintree-error");
//var getGatewayConfiguration = require("./get-configuration").getConfiguration;
var createAuthorizationData = require("../lib/create-authorization-data");
//var metadata = require("../lib/add-metadata");
//var wrapPromise = require("@braintree/wrap-promise");
//var once = require("../lib/once");
//var deferred = require("../lib/deferred");
//var assign = require("../lib/assign").assign;
//var errors = require("./errors");
//var VERSION = require("../lib/constants").VERSION;
//var GRAPHQL_URLS = require("../lib/constants").GRAPHQL_URLS;
//var methods = require("../lib/methods");
//var convertMethodsToError = require("../lib/convert-methods-to-error");
//var assets = require("../lib/assets");
//var FRAUDNET_FNCLS = require("../lib/constants").FRAUDNET_FNCLS;
//var FRAUDNET_SOURCE = require("../lib/constants").FRAUDNET_SOURCE;
//var FRAUDNET_URL = require("../lib/constants").FRAUDNET_URL;

var cachedClients = {};

function Client(configuration) {

    alert('client initiated')
    var configurationJSON, gatewayConfiguration;

    configuration = configuration || {};

    configurationJSON = JSON.stringify(configuration);
    gatewayConfiguration = configuration.gatewayConfiguration;

    if (!gatewayConfiguration) {
        throw new BraintreeError(errors.CLIENT_MISSING_GATEWAY_CONFIGURATION);
    }

    // ["assetsUrl", "clientApiUrl", "configUrl"].forEach(function (property) {
    //     if (
    //         property in gatewayConfiguration &&
    //         !isVerifiedDomain(gatewayConfiguration[property])
    //     ) {
    //         throw new BraintreeError({
    //             type: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,
    //             code: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,
    //             message: property + " property is on an invalid domain.",
    //         });
    //     }
    // });

    /**
     * Returns a copy of the configuration values.
     * @public
     * @returns {Client~configuration} configuration
     */
    this.getConfiguration = function () {
        return JSON.parse(configurationJSON);
    };

    this._request = request;
    this._configuration = this.getConfiguration();

    this._clientApiBaseUrl = gatewayConfiguration.clientApiUrl + "/v1/";

    if (gatewayConfiguration.graphQL) {
        if (!isVerifiedDomain(gatewayConfiguration.graphQL.url)) {
            throw new BraintreeError({
                type: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,
                code: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,
                message: "graphQL.url property is on an invalid domain.",
            });
        }

        this._graphQL = new GraphQL({
            graphQL: gatewayConfiguration.graphQL,
        });
    }
}

Client.initialize = function (options) {
    var clientInstance, authData;
    var promise = cachedClients[options.authorization];

    console.log('is promise', promise)
    if (promise) return promise;

    return clientInstance;

    // try {
    //     alert('create auth data')
    //
    //   //  authData = createAuthorizationData(options.authorization);
    // } catch (err) {
    //     return Promise.reject('invalid authorisation');
    // }
    //
    // promise = getGatewayConfiguration(authData, options.sessionId).then(function (
    //     configuration
    // ) {
    //     configuration.authorization = options.authorization;
    //
    //     clientInstance = new Client(configuration);
    //
    //     return clientInstance;
    // });
    //
    // cachedClients[options.authorization] = promise;

    // return promise
    //     .then(function (client) {
    //         return client;
    //     })
    //     .catch(function (err) {
    //         delete cachedClients[options.authorization];
    //         return Promise.reject(err);
    //     });
};

// Primarily used for testing the client initalization call
Client.clearCache = function () {
    cachedClients = {};
};

Client.prototype.request = function (options, callback) {
    var self = this; // eslint-disable-line no-invalid-this
    return new Promise(function (resolve, reject) {

        // Make Api request (rest or graphql)
        // baseUrl = self._clientApiBaseUrl;
        //  GRAPHQL_URLS[self._configuration.gatewayConfiguration.environment];
        // pass through options.data
        // On success load scripts

    });
};

// eslint-disable-next-line consistent-return
function formatRequestError(status, err) {
    var requestError;

    if (status === -1) {
        requestError = new BraintreeError(errors.CLIENT_REQUEST_TIMEOUT);
    } else if (status === 401) {
        requestError = new BraintreeError(errors.CLIENT_AUTHORIZATION_INVALID);
    } else if (status === 403) {
        requestError = new BraintreeError(errors.CLIENT_AUTHORIZATION_INSUFFICIENT);
    } else if (status === 429) {
        requestError = new BraintreeError(errors.CLIENT_RATE_LIMITED);
    } else if (status >= 500) {
        requestError = new BraintreeError(errors.CLIENT_GATEWAY_NETWORK);
    } else if (status < 200 || status >= 400) {
        requestError = convertToBraintreeError(err, {
            type: errors.CLIENT_REQUEST_ERROR.type,
            code: errors.CLIENT_REQUEST_ERROR.code,
            message: errors.CLIENT_REQUEST_ERROR.message,
        });
    }

    if (requestError) {
        requestError.details = requestError.details || {};
        requestError.details.httpStatus = status;

        return requestError;
    }
}

Client.prototype.toJSON = function () {
    return this.getConfiguration();
};

/**
 * Returns the Client version.
 * @public
 * @returns {String} The created client's version.
 * @example
 * var createClient = require('braintree-web/client').create;
 *
 * createClient({
 *   authorization: CLIENT_AUTHORIZATION
 * }, function (createErr, clientInstance) {
 *   console.log(clientInstance.getVersion()); // Ex: 1.0.0
 * });
 * @returns {void}
 */
Client.prototype.getVersion = function () {
    //return VERSION;
    return '';
};

// Client.prototype.teardown = wrapPromise(function () {
//     var self = this; // eslint-disable-line no-invalid-this
//
//     delete cachedClients[self.getConfiguration().authorization];
//     convertMethodsToError(self, methods(Client.prototype));
//
//     return Promise.resolve();
// });

function getAuthorizationHeadersForGraphQL(configuration) {
    // var token =
    //     configuration.authorizationFingerprint || configuration.authorization;
    //
    // return {
    //     Authorization: "Bearer " + token,
    //     "Braintree-Version": BRAINTREE_VERSION,
    // };
}

module.exports = Client;