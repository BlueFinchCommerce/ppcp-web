const createAssets = require("../lib/create-assets");

const namespace = 'ppcp_applepay_new';
let clientContext,
    buttonElement,
    paymentRequest

function ApplePayment(context, element) {
    if (!context || !element) {
        throw new Error("Apple Pay requires both context and element.");
    }

    clientContext = context
    buttonElement = element

    const params = {
            'client-id': clientContext.clientId,
            'intent': clientContext.intent,
            'components': 'applepay',
            'currency': clientContext.currency
        }

    if (clientContext.environment === 'sandbox') {
        params['buyer-country'] = clientContext.buyerCountry;
    }

    createAssets.create('https://www.paypal.com/sdk/js', params, namespace, clientContext.pageType)
        .then(() => showApplePay())
        .then(() => createButton())

}

function createButton() {
    return new Promise((resolve, reject) => {
        let applePayButton = document.createElement('apple-pay-button')
        applePayButton.onclick = function () {
            start();
        };

        let container = document.getElementById(buttonElement);
        container.appendChild(applePayButton);
        resolve();
    });
}

/**
 * Show Apple Pay
 *
 * @returns {boolean}
 */
function showApplePay() {
    return new Promise((resolve, reject) => {
        if (location.protocol !== 'https:') {
            0;
            console.warn('PPCP Apple Pay requires your checkout be served over HTTPS');
            return false;
        }
        if ((window.ApplePaySession && window.ApplePaySession.canMakePayments()) !== true) {
            console.warn('PPCP Apple Pay is not supported on this device/browser');
            return false;
        }

        const applepay = window[`paypal_${namespace}`].Applepay();

        applepay.config()
            .then(applepayConfig => {
                if (applepayConfig.isEligible) {
                    paymentRequest = clientContext.getPaymentRequest(applepayConfig);
                    resolve();
                } else {
                    console.warn('PPCP Apple Pay is not eligible');
                    reject();
                }
            })
            .catch(() => {
                console.error('Error while fetching Apple Pay configuration.');
                reject();
            });
        return true;
    })
}

function start() {
    let session = new window.ApplePaySession(4, paymentRequest);
    const applepay = window[`paypal_${namespace}`].Applepay();

    session.onvalidatemerchant = (event) => {
        applepay.validateMerchant({
            validationUrl: event.validationURL
        }).then((payload) => {
            session.completeMerchantValidation(payload.merchantSession);
        }).catch((err) => {
            console.error(err);
            session.abort();
            loader.stopLoader();
        });
    };

    session.onshippingcontactselected = function (event) {
        return clientContext.onShippingContactSelect(event, session);
    };

    session.onshippingmethodselected = function (event) {
        return clientContext.onShippingMethodSelect(event, session);
    };

    session.onpaymentauthorized = function async (event) {
        return clientContext.onPaymentAuthorized(event, session, applepay);
    };

    session.begin();
}


module.exports = ApplePayment;