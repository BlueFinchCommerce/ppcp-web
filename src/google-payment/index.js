const GooglePayment = require('./google-payment');
const createAssets = require('../lib/create-assets');

function create(options, element) {
  createAssets.create('https://pay.google.com/gp/p/js/pay.js', {}, 'ppcp_pay', options.pageType);

  return new GooglePayment(options, element);
}

module.exports = create;
