"use strict";

var Client = require("./client");

function create(options) {

        // Check for authorization and init client
        if (!options.authorization) {
            return Promise.reject('options.authorization is required when instantiating a client.');
        }

        return Client.initialize(options);
}

module.exports = {
    create: create
};
