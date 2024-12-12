const applePayment = require("./apple-payment");
const googlePayment = require("./google-payment");
const cardPayment = require("./card-payment/card-payment");
const paypalButtons = require("./paypal-payment/paypal-buttons");
const paypalMessages = require("./paypal-payment/paypal-messages");


module.exports = {

    /** @type {module:ppcp-web/apple-payment} */
    applePayment: applePayment,

    /** @type {module:ppcp-web/google-payment} */
    googlePayment: googlePayment,

    /** @type {module:ppcp-web/card-payment} */
    cardPayment: cardPayment,

    /** @type {module:ppcp-web/paypal-payment/paypal-buttons} */
    paypalButtons: paypalButtons,

    /** @type {module:ppcp-web/paypal-payment/paypal-messages} */
    paypalMessages: paypalMessages,

};