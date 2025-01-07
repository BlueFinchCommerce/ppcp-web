const AmpPayments = require('./apm-payments');

function create(options, element) {
  return new AmpPayments(options, element);
}

module.exports = create;
