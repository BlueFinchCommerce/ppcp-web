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
            'components': 'card-fields',
            'currency': clientContext.currency
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
        renderFields(cardFields);
    } else {
        clientContext.active(false);
    }
}

function renderFields(cardFields) {
    const clientNumberField = clientContext.cardFields.numberField,
          clientCvvField = clientContext.cardFields.cvvField,
          clientExpiryField = clientContext.cardFields.expiryField;

    if (cardFields.isEligible()) {
        let cardContainer = document.querySelector(clientNumberField.id),
            cvvContainer = document.querySelector(clientCvvField.id),
            cardExpiryContainer = document.querySelector(clientExpiryField.id);

        const numberField = cardFields.NumberField({
                placeholder: clientNumberField.placeholder,
                inputEvents: {
                    onBlur: (data) => {
                        return clientNumberField.inputEvents.blur(data, cardContainer)
                    },
                    onFocus: () => {}
                }
            }),
            cvvField = cardFields.CVVField({
                placeholder: clientCvvField.placeholder,
                inputEvents: {
                    onBlur: (data) => {
                        return clientCvvField.inputEvents.blur(data, cvvContainer)
                    },
                    onFocus: () => {}
                }
            }),
            expiryField = cardFields.ExpiryField({
                placeholder: clientExpiryField.placeholder,
                inputEvents: {
                    onBlur: (data) => {
                        return clientExpiryField.inputEvents.blur(data, cardExpiryContainer)
                    },
                    onFocus: () => {}
                }
            });

            if (cardContainer.innerHTML.trim() === "") {
                numberField.render(clientNumberField.id);
            }
            if (cvvContainer.innerHTML.trim() === "") {
                cvvField.render(clientCvvField.id);
            }
            if (cardExpiryContainer.innerHTML.trim() === "") {
                expiryField.render(clientExpiryField.id);
            }

        document.querySelector(clientContext.submitButtonId).addEventListener('click', () => {
            const isValid = clientContext.runAdditionalValidators()
            if (isValid) {
                cardFields.getState().then((data) => {
                    if (data.isFormValid) {
                        cardFields.submit().then(() => {
                            //Submit success
                        }).catch((error) => {
                            console.error(error);
                            clientContext.displayErrorMessage('Cannot validate payment.')
                        });
                    } else {
                        let errorString = '';

                        if (data.errors.includes('INVALID_NUMBER')) {
                            errorString += 'Card number is not valid.';
                        }
                        if (data.errors.includes('INVALID_EXPIRY')) {
                            errorString += ' ' + 'Expiry date is not valid.';
                        }
                        if (data.errors.includes('INVALID_CVV')) {
                            errorString += ' ' + 'CVV is not valid.';
                        }
                        clientContext.displayErrorMessage(errorString)
                    }
                });
            }
        });
    }
}

module.exports = CardPayment;