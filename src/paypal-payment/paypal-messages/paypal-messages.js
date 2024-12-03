const createAssets = require("../../lib/create-assets");

const namespace = 'ppcp_paypal_messages';
let clientContext,
    messageElement,
    params = {
        components: 'messages'
    }

function PaypalMessages(context, element) {
    if (!context || !element) {
        throw new Error("PaypalElements requires both context and element.");
    }

    clientContext = context
    messageElement = element
    params['client-id'] = clientContext.clientId

    renderMessage()
}

/**
 * Because the PayPal SDK isn't loaded synchronously we may need to attach a listener to wait
 * until it's loaded.
 */
function attachPayLaterMessageSubscription() {
    return createAssets.create('https://www.paypal.com/sdk/js', params, namespace, clientContext.pageType)
.then(() => renderMessage())
}

function renderMessage() {
    // Check that the messages component is available before calling it.
    if (window[`paypal_${namespace}`]?.Messages) {
        const message = window[`paypal_${namespace}`].Messages(clientContext.messageConfig);
        const messageSelector = document.getElementById(messageElement)

        message.render(messageSelector);
    } else {
        // Otherwise attach a wait for the component to load.
        attachPayLaterMessageSubscription();
    }
}

module.exports = PaypalMessages;