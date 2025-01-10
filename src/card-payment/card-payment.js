const createAssets = require('../lib/create-assets');

const namespace = 'ppcp_card';
let clientContext;
let buttonElement;

/**
 * Render card payment fields.
 */
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

    document.querySelector(buttonElement).addEventListener('click', async () => {
      try {
        const isValid = await clientContext.onValidate();
        const data = await cardFields.getState();

        if (data.isFormValid && isValid) {
          try {
            await cardFields.submit();
            // Submit success
          } catch (error) {
            console.error(error);
            clientContext.handleErrors('Cannot validate payment.');
          }
        } else {
          clientContext.handleErrors(data.errors);
        }
      } catch (error) {
        console.error('Validation error:', error);
      }
    });
  }
}

/**
 * Create card payment fields.
 */
function createFields() {
  if (window[`paypal_${namespace}`]) {
    const cardFields = window[`paypal_${namespace}`].CardFields({
      createOrder() {
        return clientContext.createOrder();
      },
      onApprove() {
        return clientContext.onApprove();
      },
      style: clientContext.style,
    });
    renderFields(cardFields);
  } else {
    clientContext.active(false);
  }
}

/**
 * Initialize card payment fields.
 */
function CardPayment(context, element) {
  if (!context || !element) {
    throw new Error('Card Payments requires both context and element.');
  }

  clientContext = context;
  buttonElement = element;

  const params = {
    'client-id': clientContext.productionClientId,
    intent: clientContext.intent,
    components: 'card-fields',
    currency: clientContext.currency,
  };

  if (clientContext.environment === 'sandbox') {
    params['client-id'] = clientContext.sandboxClientId;
    params['buyer-country'] = clientContext.buyerCountry;
  }

  createAssets.create('https://www.paypal.com/sdk/js', params, namespace, clientContext.pageType)
    .then(() => createFields());
}

module.exports = CardPayment;
