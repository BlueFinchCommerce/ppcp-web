const createAssets = require('../lib/create-assets');

let clientContext;
let googlePayClient;

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

function deviceSupported() {
  return new Promise((resolve, reject) => {
    if (location.protocol !== 'https:') {
      console.warn('Google Pay requires your checkout be served over HTTPS');
      return false;
    }

    const googlepay = window.paypal_ppcp_googlepay.Googlepay();

    googlepay.config()
      .then((googlepayConfig) => {
        if (googlepayConfig.isEligible) {
          googlepayConfig.allowedPaymentMethods.forEach((method) => {
            method.parameters.billingAddressParameters.phoneNumberRequired = true;
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
    onPaymentAuthorized: (data) => clientContext.onPaymentAuthorized(data, googlepayConfig),
  };

  if (clientContext.onPaymentDataChanged) {
    paymentDataCallbacks.onPaymentDataChanged = (data) => clientContext.onPaymentDataChanged(data, googlepayConfig);
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
  });
}

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
 * Environment
 */
function getEnvironment() {
  return clientContext.environment === 'sandbox'
    ? 'TEST'
    : 'PRODUCTION';
}

module.exports = GooglePayment;
