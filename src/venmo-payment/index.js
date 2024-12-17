const VenmoPayment = require("./venmo-payment");

function create(options, element) {
    console.log('here')
    return new VenmoPayment(options, element);
}

module.exports = create;