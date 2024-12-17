const createAssets = require('../lib/create-assets');

// Global Variables
const namespace = 'ppcp_paypal_venmo';
let clientContext;
let buttonElement;
let button;

/**
 * Create express buttons
 */
function createButton() {
  return new Promise((resolve) => {
    const funding = window[`paypal_${namespace}`].FUNDING.VENMO;
    const properties = {
      createOrder: clientContext.createOrder,
      onApprove: clientContext.onApprove,
      onClick: clientContext.onClick,
      onError: clientContext.onError,
      fundingSource: funding,
    };

    button = window[`paypal_${namespace}`].Buttons(properties);
    resolve();
  });
}

/**
 * Initialize and render a Venmo payment button.
 */
function VenmoPayment(context, element) {
  if (!context || !element) {
    throw new Error('Venmo button requires both context and element.');
  }

  clientContext = context;
  buttonElement = element;

  const params = {
    'client-id': clientContext.clientId,
    intent: clientContext.intent,
    components: 'buttons',
    currency: clientContext.currency,
    'enable-funding': 'venmo',
  };

  if (clientContext.environment === 'sandbox') {
    params['buyer-country'] = clientContext.buyerCountry;
  }

  createAssets.create('https://www.paypal.com/sdk/js', params, namespace, clientContext.pageType)
    .then(() => createButton())
    .then(() => {
      const buttonSelector = document.getElementById(buttonElement);
      const elementIsEmpty = buttonSelector.childNodes.length === 0;

      if (button.isEligible() && buttonSelector && elementIsEmpty) {
        button.render(buttonSelector);
      }
    })
    .catch((error) => {
      console.error('Error initializing Venmo Button:', error);
    });
}

module.exports = VenmoPayment;
