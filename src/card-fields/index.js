var GooglePayment = require("./card-fields");
var createAssets = require("../lib/create-assets");
var getConfiguration = require("../lib/get-configuration")

// var BraintreeError = require("../lib/braintree-error");
// var createDeferredClient = require("../lib/create-deferred-client");
// var basicComponentVerification = require("../lib/basic-component-verification");
// var wrapPromise = require("@braintree/wrap-promise");
// var VERSION = process.env.npm_package_version;
// var errors = require("./errors");

function create(options) {

    var name = "Google Pay";

    // const configuration = window.checkoutConfig?.ppcp || this.context
    const configuration = getConfiguration.getConfiguration?.ppcp,
        // params = {
        //     'client-id': configuration.clientId,
        //     'intent': configuration.intent,
        //     'components': 'googlepay'
        // },
        params = {
            'client-id': configuration.clientId,
            'intent':  configuration.intent,
            'components': 'googlepay',
            'currency': configuration.currency
        },
        pageType = 'checkout'

    console.log('configuration', configuration)

    // @todo - get page type ('checkout')
       // pageType = configModel.pageType;

    if (configuration.environment === 'sandbox') {
        params['buyer-country'] = configuration.buyerCountry;
    }

    // Create Assets
    createAssets.create('https://pay.google.com/gp/p/js/pay.js', {}, 'ppcp_pay', pageType)
    createAssets.create('https://www.paypal.com/sdk/js', params, 'ppcp_googlepay', pageType)


    var createPromise, instance;
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

    const element = document.getElementById('google-pay-button');

            options = {
                buttonColor: 'red',
                placeOrder: () => {
                    alert('red')
                }
            }

            instance = new GooglePayment(options, element);
    //
    //         if (!options.useDeferredClient) {
    //             return createPromise.then(function (client) {
    //                 instance._client = client;
    //
    //                 return instance;
    //             });
    //         }
    //
            return instance
}

module.exports = create();