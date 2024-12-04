const createAssets = require("../lib/create-assets");

const namespace = 'ppcp_applepay_new';
let clientContext,
    buttonElement,
    buttons = {}

function ApplePayment(context, element) {
    if (!context || !element) {
        throw new Error("Apple Pay requires both context and element.");
    }

    clientContext = context
    buttonElement = element

    console.log('Client Context', clientContext)
    createButton();

    const params = {
            'client-id': clientContext.clientId,
            'intent': clientContext.intent,
            'components': 'applepay'
        }

    if (clientContext.environment === 'sandbox') {
        params['buyer-country'] = clientContext.buyerCountry;
    }

    // configModel.setConfig(configuration);
    // this.merchantName = window.checkoutConfig?.payment?.[this.paymentMethod]?.merchantName
    //     || configuration.merchantName;

    createAssets.create('https://www.paypal.com/sdk/js', params, namespace, clientContext.pageType)

    showApplePay();


    // Promise.all(scripts).then(async () => {
    //     this.showApplePay();

    //     this.updateButtonVisibility();

    //     this.isEligible.subscribe(this.updateButtonVisibility.bind(this));
    //     // $(this.buttonElement).on('click', this.start.bind(this));
    // });



}

function createButton() {
    let applePayButton = document.createElement('apple-pay-button')

    applePayButton.onclick = function () {
       start();
    };

    let container = document.getElementById(buttonElement);
    container.appendChild(applePayButton);
}

/**
 * Show Apple Pay
 *
 * @returns {boolean}
 */
function showApplePay() {
    if (location.protocol !== 'https:') {
        0;
        console.warn('PPCP Apple Pay requires your checkout be served over HTTPS');
        return false;
    }
    if ((window.ApplePaySession && window.ApplePaySession.canMakePayments()) !== true) {
        console.warn('PPCP Apple Pay is not supported on this device/browser');
        return false;
    }
    let self = this;
    const applepay = window[`paypal_${namespace}`].Applepay();

    applepay.config()
        .then(applepayConfig => {
            self.applePayConfig = applepayConfig;
            if (applepayConfig.isEligible) {
                self.isEligible(true);
            } else {
                self.isEligible(false);
            }
        })
        .catch(() => {
            console.error('Error while fetching Apple Pay configuration.');
        });
    return true;
}

function start() {
    // if (!checkGuestCheckout()) {
    //     return false;
    // }
    let self = this,
        session = new window.ApplePaySession(4, clientContext.paymentRequest);
    const applepay = window[`paypal_${namespace}`].Applepay();

    console.log(session)

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

    // Only need to add the shipping callbacks when the cart is not virtual.
    // if (!configModel.isVirtual) {
        session.onshippingcontactselected = function (event) {
            return clientContext.onShippingContactSelect(event, session);
        };

        session.onshippingmethodselected = function (event) {
            return clientContext.onShippingMethodSelect(event, session);
        };
    // }

        session.onpaymentauthorized = function async (event) {
            return clientContext.onpaymentauthorized(event, session);
        };



    session.begin();
}


module.exports = ApplePayment;