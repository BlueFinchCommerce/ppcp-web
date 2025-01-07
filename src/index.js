const apmPayments = require('./apm-payments');
const applePayment = require('./apple-payment');
const cardPayment = require('./card-payment/card-payment');
const googlePayment = require('./google-payment');
const paypalButtons = require('./paypal-payment/paypal-buttons');
const paypalMessages = require('./paypal-payment/paypal-messages');
const venmoPayment = require('./venmo-payment');

module.exports = {

  /** @type {module:ppcp-web/apm-payments} */
  apmPayments,

  /** @type {module:ppcp-web/apple-payment} */
  applePayment,

  /** @type {module:ppcp-web/card-payment} */
  cardPayment,

  /** @type {module:ppcp-web/google-payment} */
  googlePayment,

  /** @type {module:ppcp-web/paypal-payment/paypal-buttons} */
  paypalButtons,

  /** @type {module:ppcp-web/paypal-payment/paypal-messages} */
  paypalMessages,

  /** @type {module:ppcp-web/venmo-payment} */
  venmoPayment,

};
