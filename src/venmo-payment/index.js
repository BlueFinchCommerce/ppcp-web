const VenmoPayment = require('./venmo-payment');

function create(options, element) {
  return new VenmoPayment(options, element);
}

module.exports = create;
