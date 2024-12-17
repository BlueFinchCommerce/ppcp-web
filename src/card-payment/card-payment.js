const createAssets = require('../lib/create-assets');

const namespace = 'ppcp_card_new';
let clientContext;
let formElement;

function CardPayment(context, element) {
  if (!context || !element) {
    throw new Error('Card Payments requires both context and element.');
  }

  clientContext = context;
  formElement = element;

  const params = {
    'client-id': clientContext.clientId,
    intent: clientContext.intent,
    components: 'card-fields',
    currency: clientContext.currency,
  };

  createAssets.create('https://www.paypal.com/sdk/js', params, namespace, clientContext.pageType)
    .then(() => createFields());
}

function createFields() {
  if (window[`paypal_${namespace}`]) {
    const cardFields = window[`paypal_${namespace}`].CardFields({
      createOrder() {
        return clientContext.createOrder();
      },
      onApprove() {
        return clientContext.onApprove();
      },
      onError() {
        return clientContext.onError();
      },
      style: clientContext.style,
    });
    renderFields(cardFields);
  } else {
    clientContext.active(false);
  }
}

function renderFields(cardFields) {
  const clientNumberField = clientContext.cardFields.numberField;
  const clientCvvField = clientContext.cardFields.cvvField;
  const clientExpiryField = clientContext.cardFields.expiryField;

  if (cardFields.isEligible()) {
    const cardContainer = document.querySelector(clientNumberField.id);
    const cvvContainer = document.querySelector(clientCvvField.id);
    const cardExpiryContainer = document.querySelector(clientExpiryField.id);

    const numberField = cardFields.NumberField({
      placeholder: clientNumberField.placeholder,
      inputEvents: {
        onBlur: (data) => clientNumberField.inputEvents.blur(data, cardContainer),
        onFocus: () => {},
      },
    });
    const cvvField = cardFields.CVVField({
      placeholder: clientCvvField.placeholder,
      inputEvents: {
        onBlur: (data) => clientCvvField.inputEvents.blur(data, cvvContainer),
        onFocus: () => {},
      },
    });
    const expiryField = cardFields.ExpiryField({
      placeholder: clientExpiryField.placeholder,
      inputEvents: {
        onBlur: (data) => clientExpiryField.inputEvents.blur(data, cardExpiryContainer),
        onFocus: () => {},
      },
    });

    if (cardContainer.innerHTML.trim() === '') {
      numberField.render(clientNumberField.id);
    }
    if (cvvContainer.innerHTML.trim() === '') {
      cvvField.render(clientCvvField.id);
    }
    if (cardExpiryContainer.innerHTML.trim() === '') {
      expiryField.render(clientExpiryField.id);
    }

    document.querySelector(clientContext.submitButtonId).addEventListener('click', () => {
      const isValid = clientContext.runAdditionalValidators();
      if (isValid) {
        cardFields.getState().then((data) => {
          if (data.isFormValid) {
            cardFields.submit().then(() => {
              // Submit success
            }).catch((error) => {
              console.error(error);
              clientContext.displayErrorMessage('Cannot validate payment.');
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
            clientContext.displayErrorMessage(errorString);
          }
        });
      }
    });
  }
}

module.exports = CardPayment;
