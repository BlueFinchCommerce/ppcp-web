var GooglePayment = require("./google-payment");
var createAssets = require("../lib/create-assets");
var getConfiguration = require("../lib/get-configuration")

// var BraintreeError = require("../lib/braintree-error");
// var createDeferredClient = require("../lib/create-deferred-client");
// var basicComponentVerification = require("../lib/basic-component-verification");
// var wrapPromise = require("@braintree/wrap-promise");
// var VERSION = process.env.npm_package_version;
// var errors = require("./errors");

function create(options, element) {

    var name = "Google Pay",
        pageType = 'checkout'

    // Create Assets
    createAssets.create('https://pay.google.com/gp/p/js/pay.js', {}, 'ppcp_pay', pageType)


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

            return new GooglePayment(options.googlePay, element);
}

module.exports = create;