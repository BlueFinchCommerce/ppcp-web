const PaypalMessages = require('./paypal-messages');

function create(options, element) {
  return new PaypalMessages(options, element);
}

module.exports = create;
