const PaypalButtons = require("./paypal-buttons");

function create(options, element) {
    return new PaypalButtons(options, element);
}

module.exports = create;