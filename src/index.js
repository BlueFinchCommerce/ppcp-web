const applePayment = require("./apple-payment");
const googlePayment = require("./google-payment");
const paypalButtons = require("./paypal-buttons");

module.exports = {

    /** @type {module:ppcp-web/apple-payment} */
    applePayment: applePayment,

    /** @type {module:ppcp-web/google-payment} */
    googlePayment: googlePayment,

    /** @type {module:ppcp-web/paypal-buttons} */
    paypalButtons: paypalButtons,

};