const PaypalButtons = require("./paypal-buttons");
const createAssets = require("../lib/create-assets");

function create(options, element) {

    var name = "Paypal",
        pageType = 'checkout'

    // Create Assets
    // @todo - Check if payment method is enabled in magento (in options) & if its enabled in the ppcp portal
    // createAssets.create('https://pay.google.com/gp/p/js/pay.js', {}, 'ppcp_pay', pageType)

    return new PaypalButtons(options, element);
}

module.exports = create;