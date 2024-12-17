const ApplePayment = require('./apple-payment');
const createAssets = require('../lib/create-assets');

function create(options, element) {
  createAssets.create('https://applepay.cdn-apple.com/jsapi/v1.1.0/apple-pay-sdk.js', {}, '', options.pageType);
  return new ApplePayment(options, element);
}

module.exports = create;
