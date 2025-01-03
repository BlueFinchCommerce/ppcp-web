const createAssets = require('../lib/create-assets');

// Global Variables
const namespace = 'ppcp_paypal_venmo';
let clientContext;
let buttonElement;
let button;

/**
 * Get style configuration for button.
 *
 * @returns {Object} - Style configuration object for the button.
 */
function getStyles() {
  const styles = clientContext.buttonStyles;
  return {
    color: styles.buttonColor === 'gold' ? 'blue' : styles.buttonColor,
    label: styles.buttonLabel,
    shape: styles.buttonShape,
    height: clientContext.buttonHeight ? clientContext.buttonHeight : 40,
  };
}

/**
 * Create a Venmo payment button.
 *
 * @returns {Promise<void>} - Resolves when the Venmo button is created.
 */
function createButton() {
  return new Promise((resolve) => {
    const funding = window[`paypal_${namespace}`].FUNDING.VENMO;
    const properties = {
      createOrder: clientContext.createOrder,
      onApprove: clientContext.onApprove,
      onClick: clientContext.onClick,
      onError: clientContext.onError,
      onCancel: clientContext.onCancel,
      fundingSource: funding,
    };

    properties.style = getStyles();

    button = window[`paypal_${namespace}`].Buttons(properties);
    resolve();
  });
}

/**
 * Initialize and render a Venmo payment button.
 *
 * @param {Object} context - Configuration context for Venmo payment.
 * @param {string} element - ID of the DOM element where the button will be rendered.
 */
function VenmoPayment(context, element) {
  if (!context || !element) {
    throw new Error('Venmo button requires both context and element.');
  }

  clientContext = context;
  buttonElement = element;

  const params = {
    'client-id': clientContext.productionClientId,
    intent: clientContext.intent,
    components: 'buttons',
    currency: clientContext.currency,
    'enable-funding': 'venmo',
  };

  if (clientContext.environment === 'sandbox') {
    params['client-id'] = clientContext.sandboxClientId;
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
