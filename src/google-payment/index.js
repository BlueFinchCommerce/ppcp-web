var GooglePayment = require("./google-payment");
var createAssets = require("../lib/create-assets");
var getConfiguration = require("../lib/get-configuration")

function create(options, element) {
    var name = "Google Pay",
        pageType = 'checkout'

    // Create Assets
    // @todo - Check if payment method is enabled in magento (in options) & if its enabled in the ppcp portal
    createAssets.create('https://pay.google.com/gp/p/js/pay.js', {}, 'ppcp_pay', pageType)

    return new GooglePayment(options, element);
}

module.exports = create;