const createAssets = require("../lib/create-assets");

const namespace = 'ppcp_card_new';
let clientContext,
    formElement

function CardPayment(context, element) {
    if (!context || !element) {
        throw new Error("Card Payments requires both context and element.");
    }

    clientContext = context
    formElement = element

    const params = {
            'client-id': clientContext.clientId,
            'intent': clientContext.intent,
            'components': 'card-fields'
        }

    createAssets.create('https://www.paypal.com/sdk/js', params, namespace, clientContext.pageType)
        .then(() => createFields())

}

function createFields() {
    if (window[`paypal_${namespace}`]) {
        const cardFields = window[`paypal_${namespace}`].CardFields({
            createOrder: function () {
                return clientContext.createOrder();
            },
            onApprove: function () {
                return clientContext.onApprove();
            },
            onError: function () {
                return clientContext.onError();
            },
            style: clientContext.style
        });
        clientContext.renderFields(cardFields);
    } else {
        clientContext.active(false);
    }
}

module.exports = CardPayment;