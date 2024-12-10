const CardPayment = require("./card-payment");

function create(options, element) {
    return new CardPayment(options, element);
}

module.exports = create;