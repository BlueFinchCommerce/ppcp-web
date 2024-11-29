const createAssets = require("../lib/create-assets");

const namespace = 'ppcp_paypal123';
let clientContext,
    buttonElement,
    paypalClient,
    fundingButtons,
    buttons = {}


function PaypalButtons(context, element) {

    console.log('paypal web context', context)

    // if (!context) return; // @todo - error handling

    // if (typeof context.placeOrder !== 'function') {
    //     return console.error('PPCP Google Pay Context passed does not provide a placeOrder method', context);
    // }

    clientContext = context
    buttonElement = element


    // // const configuration = window.checkoutConfig?.ppcp || this.context
    // const configuration = getConfiguration.getConfiguration?.ppcp,
        const params = {
            'client-id': clientContext.clientId,
            'intent':  clientContext.intent,
            'components': 'buttons',
            'currency': clientContext.currency
        },
        pageType = clientContext.pageType

        if (clientContext.environment === 'sandbox') {
            params['buyer-country'] = clientContext.buyerCountry;
        }

        if (clientContext.isPayLaterMessagingEnabled) {
            params['components'] += ',messages';
        }

        // if (this.paymentMethod === 'ppcp_venmo') {
        //     params['enable-funding'] = 'venmo';
        // }

        if (clientContext.isPayLaterEnabled) {
            params['enable-funding'] = 'paylater';
        }

        createAssets.create('https://www.paypal.com/sdk/js', params, namespace, pageType).then(() => {
            setFunding().then(() => createButtons().then(() => {
                Object.keys(buttons).forEach((funding) => {
                    let buttonSelector = document.getElementById(buttonElement + '-' + funding);

                    console.log('buttons', buttons)
                    console.log('button funding', buttons[funding])
                    console.log('is eligible', buttons[funding].isEligible())

                    if (buttons[funding].isEligible() && buttonSelector) {

                        console.log('omg yay')
                      //  Render the standalone button for that payment method
                       // $(buttonSelector).html('');
                        buttons[funding].render(buttonSelector);
                    }
                });
            }))
        })
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
                console.log('set funding', document.getElementById(buttonSelector))

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
 * @param config
 */
function createButtons(config) {
    // Early return if the cart has no value.
    // if (!this.isPdp && !configModel.grandTotalAmount) {
    //     return;
    // }

        return new Promise((resolve, reject) => {
        console.log('creating buttons')

        fundingButtons.forEach(function (fundingSource) {

            const properties = {
                createOrder: clientContext.createOrder,
                onApprove: clientContext.onApprove,
                onClick: clientContext.onClick,
                onError: clientContext.onError,
                onShippingAddressChange: clientContext.onShippingAddressChange,
                onShippingOptionsChange: clientContext.onShippingOptionsChange
            }

            properties.fundingSource = fundingSource;
            properties.style = getStyles(fundingSource);
            properties.message = addMessage(fundingSource);

            buttons[fundingSource] = window[`paypal_${namespace}`].Buttons(properties);
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
function getStyles(fundingSource) {
    if (fundingSource === 'venmo') {
        return {};
    }

    const buttonType = fundingSource === 'paypal' ? 'primary' : 'secondary',
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

function addMessage(fundingSource) {
    // Only add the paylater messaging on the paylater button, if it's enabled and in the checkout.
    if ((fundingSource === 'paylater')
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