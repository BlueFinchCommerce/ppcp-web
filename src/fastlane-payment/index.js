const FastlanePayment = require('./fastlane-payment');

function create(options, element) {
  return new FastlanePayment(options, element);
}

module.exports = create;
