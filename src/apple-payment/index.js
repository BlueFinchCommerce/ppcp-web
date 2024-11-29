var ApplePayment = require("./apple-payment");
var createAssets = require("../lib/create-assets");

function create(options, element) {

    var name = "Apple Pay",
        pageType = 'checkout'

    // Create Assets
    // @todo - Check if payment method is enabled in magento (in options) & if its enabled in the ppcp portal
    // createAssets.create('https://pay.google.com/gp/p/js/pay.js', {}, 'ppcp_pay', pageType)

    return new ApplePayment(options, element);
}

module.exports = create;