const createAssets = require('../../lib/create-assets');

// ToDo remove the _new from the namespace, need to leave it for now for development
// needs a unique namespace compared to the old buttons
const namespace = 'ppcp_paypal';
let clientContext;
let buttonElement;
let fundingButtons;
const buttons = {};

/**
 * Set available funding sources based on button availability in the DOM.
 * Filters funding sources and ensures that buttons for those sources exist.
 *
 * @returns {Promise<void>}
 */
function setFunding() {
  return new Promise((resolve) => {
    const fundings = [
      window[`paypal_${namespace}`].FUNDING.PAYPAL,
    ];

    if (clientContext.isPayLaterEnabled) {
      fundings.push(window[`paypal_${namespace}`].FUNDING.PAYLATER);
    }

    // Filter the funding based on which elements are available.
    fundingButtons = fundings.filter((funding) => {
      const buttonSelector = `${buttonElement}-${funding}`;
      const button = document.getElementById(buttonSelector);

      if (button) {
        return document.getElementById(buttonSelector);
      }
      console.error('Paypal button element does not exist', buttonSelector);
      return null;
    });

    resolve();
  });
}

/**
 * Get style configuration for a specific funding button.
 *
 * @param {string} funding - The funding source (e.g., 'paypal', 'paylater').
 * @returns {Object} - Style configuration object for the button.
 */
function getStyles(funding) {
  const {
    [funding]: {
      buttonColor,
      buttonLabel,
      buttonShape,
    },
  } = clientContext.buttonStyles || {};

  return {
    color: buttonColor,
    label: buttonLabel,
    shape: buttonShape,
    height: clientContext.buttonHeight ? clientContext.buttonHeight : 40,
  };
}

/**
 * Add messaging configuration for the Pay Later button, if applicable.
 *
 * @param {string} funding - The funding source (e.g., 'paylater').
 * @returns {Object|null} - Messaging configuration object or null if not applicable.
 */
function addMessage(funding) {
  // Only add the paylater messaging on the paylater button, if it's enabled and in the checkout.
  if ((funding === 'paylater')
          && clientContext.isPayLaterMessagingEnabled
          && clientContext.pageType === 'checkout'
  ) {
    const config = clientContext.messageStyles.text || {};

    return {
      align: config.align,
      amount: clientContext.amount,
      // Button doesn't support monochrome or greyscale so in either of these cases return black.
      color: config.color !== 'black' || config.color !== 'white' ? 'black' : config.color,
    };
  }
  return null;
}

/**
 * Create PayPal buttons for the available funding sources.
 *
 * @returns {Promise<void>}
 */
function createButtons() {
  return new Promise((resolve) => {
    fundingButtons.forEach((funding) => {
      const properties = {
        createOrder: clientContext.createOrder,
        onApprove: clientContext.onApprove,
        onClick: clientContext.onClick,
        onCancel: clientContext.onCancel,
        onError: (err) => clientContext.onError(err),
        onShippingAddressChange: (data) => clientContext.onShippingAddressChange(data),
        onShippingOptionsChange: (data) => clientContext.onShippingOptionsChange(data),
      };

      properties.fundingSource = funding;
      properties.style = getStyles(funding);
      properties.message = addMessage(funding);

      buttons[funding] = window[`paypal_${namespace}`].Buttons(properties);
    });
    resolve();
  });
}

/**
 * Initialize and render PayPal buttons in the specified element.
 *
 * @param {Object} context - Context containing configuration for the buttons.
 * @param {string} element - The ID of the DOM element where the buttons will be rendered.
 */
function PaypalButtons(context, element) {
  if (!context || !element) {
    throw new Error('PaypalButtons requires both context and element.');
  }

  clientContext = context;
  buttonElement = element;

  const params = {
    'client-id': clientContext.productionClientId,
    intent: clientContext.intent,
    components: 'buttons',
    currency: clientContext.currency,
  };

  if (clientContext.environment === 'sandbox') {
    params['client-id'] = clientContext.sandboxClientId;
    params['buyer-country'] = clientContext.buyerCountry;
  }

  if (clientContext.isPayLaterMessagingEnabled) {
    params.components += ',messages';
  }

  if (clientContext.isPayLaterEnabled) {
    params['enable-funding'] = 'paylater';
  }

  createAssets.create('https://www.paypal.com/sdk/js', params, namespace, clientContext.pageType)
    .then(() => setFunding())
    .then(() => createButtons())
    .then(() => {
      Object.keys(buttons).forEach((funding) => {
        const buttonSelector = document.getElementById(`${buttonElement}-${funding}`);
        const elementIsEmpty = buttonSelector.childNodes.length === 0;

        if (buttons[funding].isEligible() && buttonSelector && elementIsEmpty) {
          buttons[funding].render(buttonSelector);
        }
      });
    })
    .catch((error) => {
      console.error('Error initializing PayPal Buttons:', error);
    });
}

module.exports = PaypalButtons;
