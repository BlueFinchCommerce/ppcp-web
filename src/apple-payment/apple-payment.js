const createAssets = require('../lib/create-assets');

// Global Variables
const namespace = 'ppcp_applepay_new';
let clientContext;
let buttonElement;
let paymentRequest;

/**
 * Starts an Apple Pay session for processing payments.
 * It handles the merchant validation, shipping contact and method selection,
 * and payment authorisation.
 */
function start() {
  const session = new window.ApplePaySession(4, paymentRequest);
  const applepay = window[`paypal_${namespace}`].Applepay();

  session.onvalidatemerchant = (event) => {
    applepay.validateMerchant({
      validationUrl: event.validationURL,
    }).then((payload) => {
      session.completeMerchantValidation(payload.merchantSession);
    }).catch((err) => {
      console.error(err);
      session.abort();
    });
  };

  session.onshippingcontactselected = (event) => {
    clientContext.onShippingContactSelect(event, session);
  };

  session.onshippingmethodselected = (event) => {
    clientContext.onShippingMethodSelect(event, session);
  };

  session.onpaymentauthorized = async (event) => {
    clientContext.onPaymentAuthorized(event, session, applepay);
  };

  session.begin();
}

/**
 * Creates the Apple Pay button and appends it to the DOM element.
 * The button triggers the `start` function when clicked to begin the payment flow.
 * @returns {Promise} Resolves when the button is successfully created and appended.
 */
function createButton() {
  return new Promise((resolve) => {
    const applePayButton = document.createElement('apple-pay-button');
    applePayButton.onclick = () => {
      start();
    };

    const container = document.getElementById(buttonElement);
    container.appendChild(applePayButton);
    resolve();
  });
}

/**
 * Checks if Apple Pay can be shown,
 * ensuring the page is served over HTTPS and the device supports Apple Pay.
 * It fetches the Apple Pay configuration and prepares the payment request.
 * @returns {Promise} Resolves when Apple Pay is ready to be shown,
 * or rejects if not eligible or there is an error.
 */
function showApplePay() {
  return new Promise((resolve, reject) => {
    if (window.location.protocol !== 'https:') {
      console.warn('PPCP Apple Pay requires your checkout be served over HTTPS');
      reject();
    }
    if ((window.ApplePaySession && window.ApplePaySession.canMakePayments()) !== true) {
      console.warn('PPCP Apple Pay is not supported on this device/browser');
      reject();
    }

    const applepay = window[`paypal_${namespace}`].Applepay();
    applepay.config()
      .then((applepayConfig) => {
        if (!applepayConfig.isEligible) {
          console.warn('PPCP Apple Pay is not eligible');
          reject();
        }

        return clientContext.getPaymentRequest(applepayConfig);
      })
      .then((paymentRequestData) => {
        paymentRequest = paymentRequestData;
        resolve();
      })
      .catch(() => {
        console.error('Error while fetching Apple Pay configuration.');
        reject();
      });
  });
}

/**
 * Initializes the Apple Pay button and renders it in the specified DOM element.
 * This is the main entry point for integrating Apple Pay.
 * @param {object} context - The client context containing payment and configuration details.
 * @param {string} element - The DOM element ID where the Apple Pay button will be rendered.
 */
function ApplePayment(context, element) {
  if (!context || !element) {
    throw new Error('Apple Pay requires both context and element.');
  }

  clientContext = context;
  buttonElement = element;

  const params = {
    'client-id': clientContext.productionClientId,
    intent: clientContext.intent,
    components: 'applepay',
    currency: clientContext.currency,
  };

  if (clientContext.environment === 'sandbox') {
    params['client-id'] = clientContext.sandboxClientId;
    params['buyer-country'] = clientContext.buyerCountry;
  }

  createAssets.create('https://www.paypal.com/sdk/js', params, namespace, clientContext.pageType)
    .then(() => showApplePay())
    .then(() => createButton());
}

module.exports = ApplePayment;
