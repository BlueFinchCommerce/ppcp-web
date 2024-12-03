const createAssets = require("../../lib/create-assets");

// ToDo remove the _new from the namespace, need to leave it for now for development
// needs a unique namespace compared to the old buttons
const namespace = 'ppcp_paypal_new';
let clientContext,
    buttonElement,
    fundingButtons,
    buttons = {}


function PaypalButtons(context, element) {
    if (!context || !element) {
        throw new Error("PaypalButtons requires both context and element.");
    }

    clientContext = context
    buttonElement = element

    const params = {
        'client-id': clientContext.clientId,
        'intent':  clientContext.intent,
        'components': 'buttons',
        'currency': clientContext.currency
    }

    // How does this work in production?
    if (clientContext.environment === 'sandbox') {
        params['buyer-country'] = clientContext.buyerCountry;
    }

    if (clientContext.isPayLaterMessagingEnabled) {
        params['components'] += ',messages';
    }

    // Leaving this here for now until I move onto the venmo story as unsure if its needed or not yet in this component
    // if (this.paymentMethod === 'ppcp_venmo') {
    //     params['enable-funding'] = 'venmo';
    // }

    if (clientContext.isPayLaterEnabled) {
        params['enable-funding'] = 'paylater';
    }

    createAssets.create('https://www.paypal.com/sdk/js', params, namespace, clientContext.pageType)
        .then(() => setFunding())
        .then(() => createButtons())
        .then(() => {
            Object.keys(buttons).forEach((funding) => {
                const buttonSelector = document.getElementById(buttonElement + '-' + funding);
                if (buttons[funding].isEligible() && buttonSelector) {
                    buttons[funding].render(buttonSelector);
                }
            });
        })
        .catch((error) => {
            console.error("Error initializing PayPal Buttons:", error);
        });
}

function setFunding() {
    return new Promise((resolve, reject) => {
        const fundings = [
                window[`paypal_${namespace}`].FUNDING.PAYPAL
            ]

        if (clientContext.isPayLaterEnabled) {
            fundings.push(window[`paypal_${namespace}`].FUNDING.PAYLATER);
        }

        // Filter the funding based on which elements are available.
        fundingButtons = fundings.filter((funding) => {

            const buttonSelector = buttonElement + '-' + funding;
            const button = document.getElementById(buttonSelector)

            if (button) {
                return document.getElementById(buttonSelector)
            } else {
                console.error('Paypal button element does not exist', buttonSelector)
            }
        });

        resolve();
    });
}

/**
 * Create express buttons
 *
 */
function createButtons() {
    return new Promise((resolve, reject) => {
        fundingButtons.forEach(function (funding) {
            const properties = {
                createOrder: clientContext.createOrder,
                onApprove: clientContext.onApprove,
                onClick: clientContext.onClick,
                onError: clientContext.onError,
                onShippingAddressChange: clientContext.onShippingAddressChange,
                onShippingOptionsChange: clientContext.onShippingOptionsChange
            }

            properties.fundingSource = funding;
            properties.style = getStyles(funding);
            properties.message = addMessage(funding);

            buttons[funding] = window[`paypal_${namespace}`].Buttons(properties);
        });
    resolve();
    });
}

/**
 * Get styles
 *
 * @param config
 * @param funding
 * @returns {{}|{color: *, shape: *, label: *}}
 */
function getStyles(funding) {
    if (funding === 'venmo') {
        return {};
    }

    const buttonType = funding === 'paypal' ? 'primary' : 'secondary',
        {
            [buttonType]: {
                buttonColor,
                buttonLabel,
                buttonShape
            }
        } = clientContext.buttonStyles || {};

    // Return the styles but check for Venmo as the color cannot be gold.
    return {
        color: buttonColor,
        label: buttonLabel,
        shape: buttonShape,
        // height: 40
    };
}

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
            color: config.color !== 'black' || config.color !== 'white' ? 'black' : config.color
        };
    }
}


/**
 * Environment
 */
function getEnvironment() {
    // return configModel.environment === 'sandbox'
    //     ? 'TEST'
    //     : 'PRODUCTION';

    return 'TEST'
}

module.exports = PaypalButtons;