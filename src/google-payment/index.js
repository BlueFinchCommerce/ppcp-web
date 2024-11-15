var GooglePayment = require("./google-payment");
var createAssets = require("../lib/create-assets");

// var BraintreeError = require("../lib/braintree-error");
// var createAssetsUrl = require("../lib/create-assets-url");
// var createDeferredClient = require("../lib/create-deferred-client");
// var basicComponentVerification = require("../lib/basic-component-verification");
// var wrapPromise = require("@braintree/wrap-promise");
// var VERSION = process.env.npm_package_version;
// var errors = require("./errors");

function create(options) {

    alert('hello world :)')

    var name = "Google Pay";

    alert('create :)')

    //'https://pay.google.com/gp/p/js/pay.js'

   // const configuration = window.checkoutConfig?.ppcp || this.context,

    // Hardcoded for the minute: @todo - replace with client configuration
    const clientId = 'BAAaoPlNAgTXQ07GmF1Hu4Mr6vafLpsOaHr9WzR-kUdX58T13gFWv78bPQkkX-5chkDos3t8tP5YlGtt4Y'

    const configuration = window.checkoutConfig?.ppcp,
        // params = {
        //     'client-id': configuration.clientId,
        //     'intent': configuration.intent,
        //     'components': 'googlepay'
        // },
        params = {
            'client-id': clientId,
            'intent': 'authorize',
            'components': 'googlepay',
            'currency': 'USD',
            'buyer-country': 'US'
        },
        pageType = 'checkout'

    // @todo - get page type ('checkout')
       // pageType = configModel.pageType;

    // @todo - replace buyer-country with this
    // if (configModel.environment === 'sandbox') {
    //     params['buyer-country'] = configuration.buyerCountry;
    // }

    // Create Assets
    createAssets.create('https://pay.google.com/gp/p/js/pay.js', {}, 'ppcp_pay', pageType)
    createAssets.create('https://www.paypal.com/sdk/js', params, 'ppcp_googlepay', pageType)

    //
    // var createPromise, instance;
    //
    // createPromise = createDeferredClient
    //     .create({
    //                 authorization: options.authorization,
    //                 client: options.client,
    //                 debug: options.debug,
    //                 assetsUrl: createAssetsUrl.create(options.authorization),
    //                 name: name,
    //             })
    //     .then(function (client) {
    //                 var configuration = client.getConfiguration();
    //
    //                 options.client = client;
    //                 if (!configuration.gatewayConfiguration.androidPay) {
    //                     return Promise.reject(
    //                         new BraintreeError(errors.GOOGLE_PAYMENT_NOT_ENABLED)
    //                     );
    //                 }
    //
    //                 return client;
    //             });
    //
    //         options.createPromise = createPromise;
    //         instance = new GooglePayment(options);
    //
    //         if (!options.useDeferredClient) {
    //             return createPromise.then(function (client) {
    //                 instance._client = client;
    //
    //                 return instance;
    //             });
    //         }
    //
    //         return instance
}

module.exports = {
    create: create(),
};