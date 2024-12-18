const createAssets = require('../lib/create-assets');

let clientContext;
let googlePayClient;

/**
 * Determines the Google Pay environment (TEST or PRODUCTION) based on the client context.
 * @returns {string} The environment string ('TEST' or 'PRODUCTION').
 */
function getEnvironment() {
  return clientContext.environment === 'sandbox'
    ? 'TEST'
    : 'PRODUCTION';
}

/**
 * Checks if the device supports Google Pay and configures payment methods.
 * Ensures the page is served over HTTPS.
 * @returns {Promise<object>} Resolves with Google Pay configuration if the device is supported.
 */
function deviceSupported() {
  return new Promise((resolve, reject) => {
    if (window.location.protocol !== 'https:') {
      console.warn('Google Pay requires your checkout be served over HTTPS');
      reject();
    }

    const googlepay = window.paypal_ppcp_googlepay.Googlepay();

    googlepay.config()
      .then((googlepayConfig) => {
        if (googlepayConfig.isEligible) {
          googlepayConfig.allowedPaymentMethods.forEach((method) => {
            const parameters = method.parameters.billingAddressParameters;
            parameters.phoneNumberRequired = true;
          });
          resolve(googlepayConfig);
        } else {
          reject();
        }
      });
  });
}

/**
 * Creates a Google Pay client and checks if Google Pay is ready to be used.
 * @param {object} googlepayConfig - Google Pay configuration data.
 * @returns {Promise<object|null>} Resolves with the configuration if ready; otherwise null.
 */
function createGooglePayClient(googlepayConfig) {
  const paymentDataCallbacks = {
    onPaymentAuthorized: (data) => clientContext.onPaymentAuthorized(data, googlepayConfig),
  };

  if (clientContext.onPaymentDataChanged) {
    paymentDataCallbacks.onPaymentDataChanged = (data) => {
      clientContext.onPaymentDataChanged(data, googlepayConfig);
    };
  }

  googlePayClient = new window.google.payments.api.PaymentsClient({
    environment: getEnvironment(),
    paymentDataCallbacks,
  });

  return googlePayClient.isReadyToPay({
    apiVersion: googlepayConfig.apiVersion,
    apiVersionMinor: googlepayConfig.apiVersionMinor,
    allowedPaymentMethods: googlepayConfig.allowedPaymentMethods,
  }).then((response) => {
    if (response.result) {
      return googlepayConfig;
    }
    return null;
  });
}

/**
 * Handles the onClick event for the Google Pay button.
 * Builds a payment data request and loads payment data.
 * @param {object} googlepayConfig - Google Pay configuration data.
 * @returns {Promise|boolean} Returns false if validation fails;
 * otherwise, initiates the payment request.
 */
function onClick(googlepayConfig) {
  if (clientContext.validateAdditionalValidators && !clientContext.validateAdditionalValidators()) {
    return false;
  }

  const paymentDataRequest = { ...googlepayConfig };
  const callbackIntents = ['PAYMENT_AUTHORIZATION'];
  const requiresShipping = clientContext.onPaymentDataChanged;

  if (requiresShipping) {
    callbackIntents.push('SHIPPING_ADDRESS', 'SHIPPING_OPTION');
  }

  paymentDataRequest.allowedPaymentMethods = googlepayConfig.allowedPaymentMethods;
  paymentDataRequest.transactionInfo = {
    countryCode: googlepayConfig.countryCode,
    currencyCode: clientContext.transactionInfo.currencyCode,
    totalPriceStatus: clientContext.transactionInfo.totalPriceStatus,
    totalPrice: parseFloat(clientContext.transactionInfo.totalPrice).toFixed(2),
  };
  paymentDataRequest.merchantInfo = googlepayConfig.merchantInfo;
  paymentDataRequest.shippingAddressRequired = !!requiresShipping;
  paymentDataRequest.shippingAddressParameters = {
    phoneNumberRequired: !!requiresShipping,
  };
  paymentDataRequest.emailRequired = true;
  paymentDataRequest.shippingOptionRequired = !!requiresShipping;
  paymentDataRequest.callbackIntents = callbackIntents;
  delete paymentDataRequest.countryCode;
  delete paymentDataRequest.isEligible;

  return googlePayClient.loadPaymentData(paymentDataRequest)
    .catch((err) => {
      console.warn(err);
    });
}

/**
 * Creates a Google Pay button with the specified configuration.
 * @param {object} googlepayConfig - Google Pay configuration data.
 * @returns {Element} A Google Pay button element ready to be added to the DOM.
 */
function createGooglePayButton(googlepayConfig) {
  return googlePayClient.createButton({
    allowedPaymentMethods: googlepayConfig.allowedPaymentMethods,
    buttonColor: clientContext.button.buttonColor.toLowerCase(),
    buttonSizeMode: 'fill',
    onClick: clientContext.beforeOnClick
      ? () => clientContext.beforeOnClick().then(() => onClick(googlepayConfig))
      : () => onClick(googlepayConfig),
  });
}

/**
 * Initializes and renders a Google Pay button in the specified DOM element.
 * This is the main entry point for integrating Google Pay.
 * @param {object} context - The client context containing payment and configuration details.
 * @param {string} element - The DOM element ID where the Google Pay button will be rendered.
 */
function GooglePayment(context, element) {
  if (!context || !element) {
    throw new Error('Google Payments requires both context and element.');
  }

  if (typeof context.placeOrder !== 'function') {
    return console.error('PPCP Google Pay Context passed does not provide a placeOrder method', context);
  }

  clientContext = context;

  const params = {
    'client-id': clientContext.clientId,
    intent: clientContext.intent,
    components: 'googlepay',
    currency: clientContext.transactionInfo.currencyCode,
  };

  if (clientContext.environment === 'sandbox') {
    params['buyer-country'] = clientContext.buyerCountry;
  }

  // Create Assets
  createAssets.create('https://www.paypal.com/sdk/js', params, 'ppcp_googlepay', clientContext.pageType)
    .then(() => deviceSupported())
    .then((googlepayConfig) => createGooglePayClient(googlepayConfig))
    .then((googlepayConfig) => createGooglePayButton(googlepayConfig))
    .then((googlePayButton) => {
      if (googlePayButton) {
        const htmlElement = document.getElementById(element);
        htmlElement.appendChild(googlePayButton); // Append button
      }
    })
    .catch((error) => {
      console.error('Error initializing Google Pay Button:', error);
    });
}

module.exports = GooglePayment;
