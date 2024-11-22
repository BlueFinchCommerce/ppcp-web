var client = require("./client");
var googlePayment = require("./google-payment");

//var VERSION = process.env.npm_package_version;
module.exports = {

    /** @type {module:ppcp-web/client} */
    client: client,

    /** @type {module:ppcp-web/google-payment} */
    googlePayment: googlePayment,

    /**
     * @description The current version of the SDK, i.e. `{@pkg version}`.
     * @type {string}
     */
  // VERSION: VERSION,
};