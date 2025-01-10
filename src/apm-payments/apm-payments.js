const createAssets = require('../lib/create-assets');

// Global Variables
const namespace = 'ppcp_apm_payments';
let clientContext;
let mark;
let paymentFields;
let button;

// Renders the PayPal Mark component if eligible and not already rendered
function renderMark(element) {
  const markSelector = document.getElementById(`paypal_${element}_mark`);
  const markIsEmpty = markSelector.childNodes.length === 0;

  if (mark.isEligible() && markSelector && markIsEmpty) {
    mark.render(markSelector);
  }
}

// Renders the PayPal Payment Fields component if eligible and not already rendered
function renderFields(element) {
  const fieldSelector = document.getElementById(`paypal_${element}_fields`);
  const fieldIsEmpty = fieldSelector.childNodes.length === 0;

  if (paymentFields.isEligible() && fieldSelector && fieldIsEmpty) {
    paymentFields.render(fieldSelector);
  }
}

// Renders the PayPal Button component if eligible and not already rendered
function renderButton(element) {
  const buttonSelector = document.getElementById(`paypal_${element}_button`);
  const buttonIsEmpty = buttonSelector.childNodes.length === 0;

  if (button.isEligible() && buttonSelector && buttonIsEmpty) {
    button.render(buttonSelector);
    clientContext.isPaymentMethodAvailable(
      button.isEligible(),
      element,
    );
  }
}

// Initializes the PayPal components (mark, fields, button) for a specific funding source
function initialiseMethod(element) {
  if (!window[`paypal_${namespace}`]) return;
  const funding = window[`paypal_${namespace}`].FUNDING[element.toUpperCase()];
  mark = window[`paypal_${namespace}`].Marks({
    fundingSource: funding,
  });

  paymentFields = window[`paypal_${namespace}`].PaymentFields({
    fundingSource: funding,
  });

  button = window[`paypal_${namespace}`].Buttons({
    fundingSource: funding,
    createOrder: () => clientContext.createOrder(element),
    onApprove: () => clientContext.onApprove(element),
    onClick: clientContext.onClick,
    onError: clientContext.onError,
    onCancel: () => clientContext.onCancel(element),
  });

  renderMark(element);
  renderFields(element);
  renderButton(element);
}

// Main entry point for initializing the APM payments integration
function ApmPayments(context, element) {
  if (!context || !element) {
    throw new Error('APM payments requires both context and element.');
  }

  clientContext = context;

  const params = {
    'client-id': clientContext.productionClientId,
    intent: 'capture',
    components: 'buttons,marks,funding-eligibility,payment-fields',
    currency: clientContext.currency,
  };

  if (clientContext.environment === 'sandbox') {
    params['client-id'] = clientContext.sandboxClientId;
    params['buyer-country'] = clientContext.buyerCountry;
  }

  createAssets.create('https://www.paypal.com/sdk/js', params, namespace, clientContext.pageType)
    .catch((error) => {
      console.error('Error initializing APM Payments:', error);
    });

  document.addEventListener('ppcpScriptLoaded', (event) => {
    if (event.detail === namespace) {
      initialiseMethod(element);
    }
  });
}

module.exports = ApmPayments;
