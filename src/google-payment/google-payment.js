var createAssets = require("../lib/create-assets");
var getConfiguration = require("../lib/get-configuration")

var clientContext,
    googlePayClient;


function GooglePayment(context, element) {

    console.log('context', context)

    if (!context) return; // @todo - error handling

    if (typeof context.placeOrder !== 'function') {
        console.error('PPCP Google Pay Context passed does not provide a placeOrder method', context);
        return;
    }

    clientContext = context

    // const configuration = window.checkoutConfig?.ppcp || this.context
    const configuration = getConfiguration.getConfiguration?.ppcp,
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
    createAssets.create('https://www.paypal.com/sdk/js', params, 'ppcp_googlepay', pageType)

    const that = this;

    setTimeout(() => {
        deviceSupported()
            .then((googlepayConfig) => createGooglePayClient(googlepayConfig))
            .then((googlepayConfig) => createGooglePayButton(googlepayConfig))
            .then(googlePayButton => {
                if (googlePayButton) {
                    const htmlElement = document.getElementById(element)
                    htmlElement.appendChild(googlePayButton); // Append button
                }
            })
    }, 1000)
    // return deviceSupported.bind(this)
    //     .then(createGooglePayClient.bind(this))
    //     .then(createGooglePayButton.bind(this))
    //     .then(googlePayButton => {
    //         if (googlePayButton) {
    //             element.appendChild(googlePayButton);
    //         }
    //     })
    //     .catch((err) => {
    //         console.warn(err);
    //     });
}

function deviceSupported() {
    return new Promise((resolve, reject) => {

        if (location.protocol !== 'https:') {
            console.warn('Google Pay requires your checkout be served over HTTPS');
            return false;
        }

        const googlepay = window.paypal_ppcp_googlepay.Googlepay();

        googlepay.config()
            .then(googlepayConfig => {
                if (googlepayConfig.isEligible) {
                    googlepayConfig.allowedPaymentMethods.forEach((method) => {
                        // @todo - Work out if this should be here :)
            //            method.parameters.billingAddressParameters.phoneNumberRequired = true;
                    });

                    resolve(googlepayConfig);
                } else {
                    reject();
                }
            });
    });
}

function createGooglePayClient(googlepayConfig) {

    const paymentDataCallbacks = {
        onPaymentAuthorized: onPaymentAuthorized()
    };

    // @todo - get config model
  //  if (this.context.onPaymentDataChanged && !configModel.isVirtual) {
    if (clientContext.onPaymentDataChanged) {
        paymentDataCallbacks.onPaymentDataChanged = (data) => {
            return clientContext.onPaymentDataChanged(data, googlepayConfig);
        };
    }

    googlePayClient
        = new window.google.payments.api.PaymentsClient({
        environment: getEnvironment(),
        paymentDataCallbacks: paymentDataCallbacks
    });

    return googlePayClient.isReadyToPay({
        apiVersion: googlepayConfig.apiVersion,
        apiVersionMinor: googlepayConfig.apiVersionMinor,
        allowedPaymentMethods: googlepayConfig.allowedPaymentMethods
    })
        .then((response) => {
            if (response.result) {
                return googlepayConfig;
            }
        });
}

function createGooglePayButton(googlepayConfig) {
    return googlePayClient.createButton({
        allowedPaymentMethods: googlepayConfig.allowedPaymentMethods,
        buttonColor: clientContext.button.buttonColor.toLowerCase(),
        buttonSizeMode: 'fill',
        onClick: clientContext.beforeOnClick
            ? () => clientContext.beforeOnClick().then(() => onClick(googlepayConfig))
            : () => onClick(googlepayConfig)
    });
}

function onClick(googlepayConfig) {

    if (clientContext.validateAdditionalValidators && !clientContext.validateAdditionalValidators()) {
        return false;
    }

    // if (!checkGuestCheckout()) {
    //     return false;
    // }

    const paymentDataRequest = Object.assign({}, googlepayConfig),
        callbackIntents = ['PAYMENT_AUTHORIZATION'],
    //     requiresShipping = this.context.onPaymentDataChanged && !configModel.isVirtual;

        requiresShipping = clientContext.onPaymentDataChanged && !configModel.isVirtual;

    if (requiresShipping) {
        callbackIntents.push('SHIPPING_ADDRESS', 'SHIPPING_OPTION');
    }

    paymentDataRequest.allowedPaymentMethods = googlepayConfig.allowedPaymentMethods;
    paymentDataRequest.transactionInfo = {
        countryCode: googlepayConfig.countryCode,
        currencyCode: 'GBP', // @todo - pass config
        totalPriceStatus: 'FINAL',
        totalPrice: parseFloat(100).toFixed(2) // @todo - pass price
    };
    paymentDataRequest.merchantInfo = googlepayConfig.merchantInfo;
    paymentDataRequest.shippingAddressRequired = requiresShipping;
    paymentDataRequest.shippingAddressParameters = {
        phoneNumberRequired: requiresShipping
    };
    paymentDataRequest.emailRequired = true;
    paymentDataRequest.shippingOptionRequired = requiresShipping;
    paymentDataRequest.callbackIntents = callbackIntents;
    delete paymentDataRequest.countryCode;
    delete paymentDataRequest.isEligible;

    return googlePayClient.loadPaymentData(paymentDataRequest)
        .catch((err) => {
            console.warn(err);
        });
}

function onPaymentAuthorized(paymentData) {
    return new Promise(async (resolve) => {
        resolve()
        // @todo - would this be a call back in the component??
        // try {
        //     clientContext.setAddresses(paymentData)
        //         .then(this.context.createOrder.bind(this.context))
        //         .then((orderId) => {
        //             return this.googlepay.confirmOrder({
        //                 orderId,
        //                 paymentMethodData: paymentData.paymentMethodData
        //             });
        //         })
        //         .then((data) => this.context.onApprove(data, paymentData))
        //         .then(() => {
        //             resolve({
        //                 transactionState: 'SUCCESS'
        //             });
        //         })
        //         .catch((error) => {
        //             $('body').trigger('processStop');
        //
        //             const message = error.message || $t('We’re unable to take that order right now.');
        //
        //             resolve({
        //                 error: {
        //                     reason: 'PAYMENT_DATA_INVALID',
        //                     message,
        //                     intent: 'PAYMENT_AUTHORIZATION'
        //                 }
        //             });
        //         });
        // } catch (error) {
        //     console.log(error);
        // }
    });
}

/**
 * Environment
 */
function getEnvironment() {
    // return configModel.environment === 'sandbox'
    //     ? 'TEST'
    //     : 'PRODUCTION';

    return 'TEST'
}

module.exports = GooglePayment;