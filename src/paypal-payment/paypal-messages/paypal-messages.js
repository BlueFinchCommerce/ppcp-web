const createAssets = require('../../lib/create-assets');

const namespace = 'ppcp_paypal_messages';
let clientContext;
let messageElement;
const params = {
  components: 'messages',
};

/**
 * Attach a listener to subscribe for Pay Later message rendering.
 * This function ensures the PayPal SDK is loaded asynchronously before rendering the message.
 *
 * @returns {Promise<void>}
 */
function attachPayLaterMessageSubscription() {
  /* eslint-disable no-use-before-define */
  return createAssets.create('https://www.paypal.com/sdk/js', params, namespace, clientContext.pageType)
    .then(() => renderMessage());
}

/**
 * Render the PayPal messaging component in the specified DOM element.
 * Ensures the PayPal SDK and messaging component are loaded before attempting to render.
 */
function renderMessage() {
  // Check that the messages component is available before calling it.
  if (window[`paypal_${namespace}`].Messages) {
    const message = window[`paypal_${namespace}`].Messages(clientContext.messageConfig);
    const messageSelector = document.getElementById(messageElement);

    message.render(messageSelector);
  } else {
    // Otherwise attach a wait for the component to load.
    attachPayLaterMessageSubscription();
  }
}

/**
 * Initialize and render PayPal messages in the specified DOM element.
 *
 * @param {Object} context - Context containing configuration for the messaging component.
 * @param {string} element - The ID of the DOM element where the message will be rendered.
 */
function PaypalMessages(context, element) {
  if (!context || !element) {
    throw new Error('PaypalElements requires both context and element.');
  }

  clientContext = context;
  messageElement = element;
  params['client-id'] = clientContext.clientId;

  renderMessage();
}

module.exports = PaypalMessages;
