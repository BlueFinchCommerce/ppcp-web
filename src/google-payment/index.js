const GooglePayment = require("./google-payment");
const createAssets = require("../lib/create-assets");
const getConfiguration = require("../lib/get-configuration")

function create(options, element) {

    // Create Assets
    // @todo - Check if payment method is enabled in magento (in options) & if its enabled in the ppcp portal
    createAssets.create('https://pay.google.com/gp/p/js/pay.js', {}, 'ppcp_pay', options.pageType)

    return new GooglePayment(options, element);
}

module.exports = create;