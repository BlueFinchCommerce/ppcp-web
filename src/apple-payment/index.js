const ApplePayment = require("./apple-payment");

function create(options, element) {
    return new ApplePayment(options, element);
}

module.exports = create;