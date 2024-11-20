var getConfiguration = require("../lib/get-configuration")
function GooglePayment(context, element) {
    alert('new google payment')
    console.log(context)
    console.log(element)

    if (!context) {
        console.log('no context')
        return;
    }

    if (typeof context.placeOrder !== 'function') {
        console.error('PPCP Google Pay Context passed does not provide a placeOrder method', context);
        return;
    }

    this.context = context;

    return deviceSupported()
    // return deviceSupported.bind(this)
    //     .then(createGooglePayClient.bind(this))
    //     .then(createGooglePayButton.bind(this))
    //     .then(googlePayButton => {
    //         if (googlePayButton) {
    //             element.appendChild(googlePayButton);
    //         }
    //     })
    //     .catch((err) => {
    //         console.warn(err);
    //     });
}

function deviceSupported() {
    return new Promise((resolve, reject) => {

        alert('is device supported')
        if (location.protocol !== 'https:') {
            console.warn('Google Pay requires your checkout be served over HTTPS');
            return false;
        }

        this.googlepay = window.paypal_ppcp_googlepay.Googlepay();

        this.googlepay.config()
            .then(googlepayConfig => {
                if (googlepayConfig.isEligible) {
                    googlepayConfig.allowedPaymentMethods.forEach((method) => {
                        method.parameters.billingAddressParameters.phoneNumberRequired = true;
                    });

                    resolve(googlepayConfig);
                } else {
                    reject();
                }
            });
    });
}

function createGooglePayClient(googlepayConfig) {
    const paymentDataCallbacks = {
        onPaymentAuthorized: this.onPaymentAuthorized.bind(this)
    };

    if (this.context.onPaymentDataChanged && !configModel.isVirtual) {
        paymentDataCallbacks.onPaymentDataChanged = (data) => {
            return this.context.onPaymentDataChanged(data, googlepayConfig);
        };
    }

    this.googlePayClient
        = new window.google.payments.api.PaymentsClient({
        environment: this.getEnvironment(),
        paymentDataCallbacks: paymentDataCallbacks
    });

    return this.googlePayClient.isReadyToPay({
        apiVersion: googlepayConfig.apiVersion,
        apiVersionMinor: googlepayConfig.apiVersionMinor,
        allowedPaymentMethods: googlepayConfig.allowedPaymentMethods
    })
        .then((response) => {
            if (response.result) {
                return googlepayConfig;
            }
        });
}

function createGooglePayButton(googlepayConfig) {
    const button = this.googlePayClient.createButton({
        allowedPaymentMethods: googlepayConfig.allowedPaymentMethods,
        buttonColor: this.context.buttonColor.toLowerCase(),
        buttonSizeMode: 'fill',
        onClick: this.context.beforeOnClick
            ? () => this.context.beforeOnClick().then(() => this.onClick(googlepayConfig))
            : () => this.onClick(googlepayConfig)
    });

    return button;
}

function onClick(googlepayConfig) {
    if (this.context.validateAdditionalValidators && !this.context.validateAdditionalValidators()) {
        return false;
    }

    if (!checkGuestCheckout()) {
        return false;
    }

    const paymentDataRequest = Object.assign({}, googlepayConfig),
        callbackIntents = ['PAYMENT_AUTHORIZATION'],
        requiresShipping = this.context.onPaymentDataChanged && !configModel.isVirtual;

    if (requiresShipping) {
        callbackIntents.push('SHIPPING_ADDRESS', 'SHIPPING_OPTION');
    }

    paymentDataRequest.allowedPaymentMethods = googlepayConfig.allowedPaymentMethods;
    paymentDataRequest.transactionInfo = {
        countryCode: googlepayConfig.countryCode,
        currencyCode: configModel.currencyCode,
        totalPriceStatus: 'FINAL',
        totalPrice: parseFloat(configModel.grandTotalAmount).toFixed(2)
    };
    paymentDataRequest.merchantInfo = googlepayConfig.merchantInfo;
    paymentDataRequest.shippingAddressRequired = requiresShipping;
    paymentDataRequest.shippingAddressParameters = {
        phoneNumberRequired: requiresShipping
    };
    paymentDataRequest.emailRequired = true;
    paymentDataRequest.shippingOptionRequired = requiresShipping;
    paymentDataRequest.callbackIntents = callbackIntents;
    delete paymentDataRequest.countryCode;
    delete paymentDataRequest.isEligible;

    return this.googlePayClient.loadPaymentData(paymentDataRequest)
        .catch((err) => {
            console.warn(err);
        });
}

function onPaymentAuthorized(paymentData) {
    return new Promise(async (resolve) => {
        try {
            this.context.setAddresses(paymentData)
                .then(this.context.createOrder.bind(this.context))
                .then((orderId) => {
                    return this.googlepay.confirmOrder({
                        orderId,
                        paymentMethodData: paymentData.paymentMethodData
                    });
                })
                .then((data) => this.context.onApprove(data, paymentData))
                .then(() => {
                    resolve({
                        transactionState: 'SUCCESS'
                    });
                })
                .catch((error) => {
                    $('body').trigger('processStop');

                    const message = error.message || $t('We’re unable to take that order right now.');

                    resolve({
                        error: {
                            reason: 'PAYMENT_DATA_INVALID',
                            message,
                            intent: 'PAYMENT_AUTHORIZATION'
                        }
                    });
                });
        } catch (error) {
            console.log(error);
        }
    });
}

/**
 * Environment
 */
function getEnvironment() {
    return configModel.environment === 'sandbox'
        ? 'TEST'
        : 'PRODUCTION';
}

module.exports = GooglePayment;