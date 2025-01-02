/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
define(() => { return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/apple-payment/apple-payment.js":
/*!********************************************!*\
  !*** ./src/apple-payment/apple-payment.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const createAssets = __webpack_require__(/*! ../lib/create-assets */ \"./src/lib/create-assets.js\");\n\n// Global Variables\nconst namespace = 'ppcp_applepay_new';\nlet clientContext;\nlet buttonElement;\nlet paymentRequest;\n\n/**\n * Starts an Apple Pay session for processing payments.\n * It handles the merchant validation, shipping contact and method selection,\n * and payment authorisation.\n */\nfunction start() {\n  const session = new window.ApplePaySession(4, paymentRequest);\n  const applepay = window[`paypal_${namespace}`].Applepay();\n  session.onvalidatemerchant = event => {\n    applepay.validateMerchant({\n      validationUrl: event.validationURL\n    }).then(payload => {\n      session.completeMerchantValidation(payload.merchantSession);\n    }).catch(err => {\n      console.error(err);\n      session.abort();\n    });\n  };\n  session.onshippingcontactselected = event => {\n    clientContext.onShippingContactSelect(event, session);\n  };\n  session.onshippingmethodselected = event => {\n    clientContext.onShippingMethodSelect(event, session);\n  };\n  session.onpaymentauthorized = async event => {\n    clientContext.onPaymentAuthorized(event, session, applepay);\n  };\n  session.begin();\n}\n\n/**\n * Creates the Apple Pay button and appends it to the DOM element.\n * The button triggers the `start` function when clicked to begin the payment flow.\n * @returns {Promise} Resolves when the button is successfully created and appended.\n */\nfunction createButton() {\n  return new Promise(resolve => {\n    const applePayButton = document.createElement('apple-pay-button');\n    applePayButton.onclick = () => {\n      start();\n    };\n    const container = document.getElementById(buttonElement);\n    container.appendChild(applePayButton);\n    resolve();\n  });\n}\n\n/**\n * Checks if Apple Pay can be shown,\n * ensuring the page is served over HTTPS and the device supports Apple Pay.\n * It fetches the Apple Pay configuration and prepares the payment request.\n * @returns {Promise} Resolves when Apple Pay is ready to be shown,\n * or rejects if not eligible or there is an error.\n */\nfunction showApplePay() {\n  return new Promise((resolve, reject) => {\n    if (window.location.protocol !== 'https:') {\n      console.warn('PPCP Apple Pay requires your checkout be served over HTTPS');\n      reject();\n      return;\n    }\n    if ((window.ApplePaySession && window.ApplePaySession.canMakePayments()) !== true) {\n      console.warn('PPCP Apple Pay is not supported on this device/browser');\n      reject();\n      return;\n    }\n    const applepay = window[`paypal_${namespace}`].Applepay();\n    applepay.config().then(applepayConfig => {\n      if (!applepayConfig.isEligible) {\n        console.warn('PPCP Apple Pay is not eligible');\n        reject();\n      }\n      return clientContext.getPaymentRequest(applepayConfig);\n    }).then(paymentRequestData => {\n      paymentRequest = paymentRequestData;\n      resolve();\n    }).catch(() => {\n      console.error('Error while fetching Apple Pay configuration.');\n      reject();\n    });\n  });\n}\n\n/**\n * Initializes the Apple Pay button and renders it in the specified DOM element.\n * This is the main entry point for integrating Apple Pay.\n * @param {object} context - The client context containing payment and configuration details.\n * @param {string} element - The DOM element ID where the Apple Pay button will be rendered.\n */\nfunction ApplePayment(context, element) {\n  if (!context || !element) {\n    throw new Error('Apple Pay requires both context and element.');\n  }\n  clientContext = context;\n  buttonElement = element;\n  const params = {\n    'client-id': clientContext.productionClientId,\n    intent: clientContext.intent,\n    components: 'applepay',\n    currency: clientContext.currency\n  };\n  if (clientContext.environment === 'sandbox') {\n    params['client-id'] = clientContext.sandboxClientId;\n    params['buyer-country'] = clientContext.buyerCountry;\n  }\n  createAssets.create('https://www.paypal.com/sdk/js', params, namespace, clientContext.pageType).then(() => showApplePay()).then(() => createButton());\n}\nmodule.exports = ApplePayment;\n\n//# sourceURL=webpack://ppcp-web/./src/apple-payment/apple-payment.js?");

/***/ }),

/***/ "./src/apple-payment/index.js":
/*!************************************!*\
  !*** ./src/apple-payment/index.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const ApplePayment = __webpack_require__(/*! ./apple-payment */ \"./src/apple-payment/apple-payment.js\");\nconst createAssets = __webpack_require__(/*! ../lib/create-assets */ \"./src/lib/create-assets.js\");\nfunction create(options, element) {\n  createAssets.create('https://applepay.cdn-apple.com/jsapi/v1.1.0/apple-pay-sdk.js', {}, '', options.pageType);\n  return new ApplePayment(options, element);\n}\nmodule.exports = create;\n\n//# sourceURL=webpack://ppcp-web/./src/apple-payment/index.js?");

/***/ }),

/***/ "./src/card-payment/card-payment.js":
/*!******************************************!*\
  !*** ./src/card-payment/card-payment.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const createAssets = __webpack_require__(/*! ../lib/create-assets */ \"./src/lib/create-assets.js\");\nconst namespace = 'ppcp_card_new';\nlet clientContext;\n\n/**\n * Render card payment fields.\n */\nfunction renderFields(cardFields) {\n  const clientNumberField = clientContext.cardFields.numberField;\n  const clientCvvField = clientContext.cardFields.cvvField;\n  const clientExpiryField = clientContext.cardFields.expiryField;\n  if (cardFields.isEligible()) {\n    const cardContainer = document.querySelector(clientNumberField.id);\n    const cvvContainer = document.querySelector(clientCvvField.id);\n    const cardExpiryContainer = document.querySelector(clientExpiryField.id);\n    const numberField = cardFields.NumberField({\n      placeholder: clientNumberField.placeholder,\n      inputEvents: {\n        onBlur: data => clientNumberField.inputEvents.blur(data, cardContainer),\n        onFocus: () => {}\n      }\n    });\n    const cvvField = cardFields.CVVField({\n      placeholder: clientCvvField.placeholder,\n      inputEvents: {\n        onBlur: data => clientCvvField.inputEvents.blur(data, cvvContainer),\n        onFocus: () => {}\n      }\n    });\n    const expiryField = cardFields.ExpiryField({\n      placeholder: clientExpiryField.placeholder,\n      inputEvents: {\n        onBlur: data => clientExpiryField.inputEvents.blur(data, cardExpiryContainer),\n        onFocus: () => {}\n      }\n    });\n    if (cardContainer.innerHTML.trim() === '') {\n      numberField.render(clientNumberField.id);\n    }\n    if (cvvContainer.innerHTML.trim() === '') {\n      cvvField.render(clientCvvField.id);\n    }\n    if (cardExpiryContainer.innerHTML.trim() === '') {\n      expiryField.render(clientExpiryField.id);\n    }\n    document.querySelector(clientContext.submitButtonId).addEventListener('click', () => {\n      const isValid = clientContext.runAdditionalValidators();\n      if (isValid) {\n        cardFields.getState().then(data => {\n          if (data.isFormValid) {\n            cardFields.submit().then(() => {\n              // Submit success\n            }).catch(error => {\n              console.error(error);\n              clientContext.displayErrorMessage('Cannot validate payment.');\n            });\n          } else {\n            let errorString = '';\n            if (data.errors.includes('INVALID_NUMBER')) {\n              errorString += 'Card number is not valid.';\n            }\n            if (data.errors.includes('INVALID_EXPIRY')) {\n              errorString += ' Expiry date is not valid.';\n            }\n            if (data.errors.includes('INVALID_CVV')) {\n              errorString += ' CVV is not valid.';\n            }\n            clientContext.displayErrorMessage(errorString);\n          }\n        });\n      }\n    });\n  }\n}\n\n/**\n * Create card payment fields.\n */\nfunction createFields() {\n  if (window[`paypal_${namespace}`]) {\n    const cardFields = window[`paypal_${namespace}`].CardFields({\n      createOrder() {\n        return clientContext.createOrder();\n      },\n      onApprove() {\n        return clientContext.onApprove();\n      },\n      onError() {\n        return clientContext.onError();\n      },\n      style: clientContext.style\n    });\n    renderFields(cardFields);\n  } else {\n    clientContext.active(false);\n  }\n}\n\n/**\n * Initialize card payment fields.\n */\nfunction CardPayment(context, element) {\n  if (!context || !element) {\n    throw new Error('Card Payments requires both context and element.');\n  }\n  clientContext = context;\n  const params = {\n    'client-id': clientContext.clientId,\n    intent: clientContext.intent,\n    components: 'card-fields',\n    currency: clientContext.currency\n  };\n  createAssets.create('https://www.paypal.com/sdk/js', params, namespace, clientContext.pageType).then(() => createFields());\n}\nmodule.exports = CardPayment;\n\n//# sourceURL=webpack://ppcp-web/./src/card-payment/card-payment.js?");

/***/ }),

/***/ "./src/google-payment/google-payment.js":
/*!**********************************************!*\
  !*** ./src/google-payment/google-payment.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const createAssets = __webpack_require__(/*! ../lib/create-assets */ \"./src/lib/create-assets.js\");\nlet clientContext;\nlet googlePayClient;\nlet googlepay;\n\n/**\n * Determines the Google Pay environment (TEST or PRODUCTION) based on the client context.\n * @returns {string} The environment string ('TEST' or 'PRODUCTION').\n */\nfunction getEnvironment() {\n  return clientContext.environment === 'sandbox' ? 'TEST' : 'PRODUCTION';\n}\n\n/**\n * Checks if the device supports Google Pay and configures payment methods.\n * Ensures the page is served over HTTPS.\n * @returns {Promise<object>} Resolves with Google Pay configuration if the device is supported.\n */\nfunction deviceSupported() {\n  return new Promise((resolve, reject) => {\n    if (window.location.protocol !== 'https:') {\n      console.warn('Google Pay requires your checkout be served over HTTPS');\n      reject(new Error('Insecure protocol: HTTPS is required for Google Pay'));\n      return;\n    }\n    googlepay = window.paypal_ppcp_googlepay.Googlepay();\n    googlepay.config().then(googlepayConfig => {\n      if (googlepayConfig.isEligible) {\n        googlepayConfig.allowedPaymentMethods.forEach(method => {\n          //  eslint-disable-next-line no-param-reassign\n          method.parameters.billingAddressParameters.phoneNumberRequired = true;\n        });\n        resolve(googlepayConfig);\n      } else {\n        reject(new Error('Device not eligible for Google Pay'));\n      }\n    }).catch(error => {\n      reject(error);\n    });\n  });\n}\n\n/**\n * Creates a Google Pay client and checks if Google Pay is ready to be used.\n * @param {object} googlepayConfig - Google Pay configuration data.\n * @returns {Promise<object|null>} Resolves with the configuration if ready; otherwise null.\n */\nfunction createGooglePayClient(googlepayConfig) {\n  const paymentDataCallbacks = {\n    onPaymentAuthorized: data => clientContext.onPaymentAuthorized(data, googlepay)\n  };\n  if (clientContext.onPaymentDataChanged) {\n    paymentDataCallbacks.onPaymentDataChanged = data => clientContext.onPaymentDataChanged(data, googlepayConfig);\n  }\n  googlePayClient = new window.google.payments.api.PaymentsClient({\n    environment: getEnvironment(),\n    paymentDataCallbacks\n  });\n  return googlePayClient.isReadyToPay({\n    apiVersion: googlepayConfig.apiVersion,\n    apiVersionMinor: googlepayConfig.apiVersionMinor,\n    allowedPaymentMethods: googlepayConfig.allowedPaymentMethods\n  }).then(response => {\n    if (response.result) {\n      return googlepayConfig;\n    }\n    return null;\n  });\n}\n\n/**\n * Handles the onClick event for the Google Pay button.\n * Builds a payment data request and loads payment data.\n * @param {object} googlepayConfig - Google Pay configuration data.\n * @returns {Promise|boolean} Returns false if validation fails;\n * otherwise, initiates the payment request.\n */\nfunction onClick(googlepayConfig) {\n  if (clientContext.validateAdditionalValidators && !clientContext.validateAdditionalValidators()) {\n    return false;\n  }\n  const paymentDataRequest = {\n    ...googlepayConfig\n  };\n  const callbackIntents = ['PAYMENT_AUTHORIZATION'];\n  const requiresShipping = clientContext.onPaymentDataChanged;\n  if (requiresShipping) {\n    callbackIntents.push('SHIPPING_ADDRESS', 'SHIPPING_OPTION');\n  }\n  paymentDataRequest.allowedPaymentMethods = googlepayConfig.allowedPaymentMethods;\n  paymentDataRequest.transactionInfo = {\n    countryCode: googlepayConfig.countryCode,\n    currencyCode: clientContext.transactionInfo.currencyCode,\n    totalPriceStatus: clientContext.transactionInfo.totalPriceStatus,\n    totalPrice: clientContext.transactionInfo.totalPrice\n  };\n  paymentDataRequest.merchantInfo = googlepayConfig.merchantInfo;\n  paymentDataRequest.shippingAddressRequired = !!requiresShipping;\n  paymentDataRequest.shippingAddressParameters = {\n    phoneNumberRequired: !!requiresShipping\n  };\n  paymentDataRequest.emailRequired = true;\n  paymentDataRequest.shippingOptionRequired = !!requiresShipping;\n  paymentDataRequest.callbackIntents = callbackIntents;\n  delete paymentDataRequest.countryCode;\n  delete paymentDataRequest.isEligible;\n  return googlePayClient.loadPaymentData(paymentDataRequest).catch(error => {\n    if (error.statusCode === 'CANCELED' || error.name === 'AbortError') {\n      console.warn('User canceled the Google Pay payment UI');\n      if (clientContext.onCancel) {\n        clientContext.onCancel();\n      }\n    } else {\n      console.error('Google Pay Error:', error);\n      if (clientContext.onError) {\n        clientContext.onError(error);\n      }\n    }\n  });\n}\n\n/**\n * Creates a Google Pay button with the specified configuration.\n * @param {object} googlepayConfig - Google Pay configuration data.\n * @returns {Element} A Google Pay button element ready to be added to the DOM.\n */\nfunction createGooglePayButton(googlepayConfig) {\n  return googlePayClient.createButton({\n    allowedPaymentMethods: googlepayConfig.allowedPaymentMethods,\n    buttonColor: clientContext.button.buttonColor.toLowerCase(),\n    buttonSizeMode: 'fill',\n    onClick: clientContext.beforeOnClick ? () => clientContext.beforeOnClick().then(() => onClick(googlepayConfig)) : () => onClick(googlepayConfig)\n  });\n}\n\n/**\n * Initializes and renders a Google Pay button in the specified DOM element.\n * This is the main entry point for integrating Google Pay.\n * @param {object} context - The client context containing payment and configuration details.\n * @param {string} element - The DOM element ID where the Google Pay button will be rendered.\n */\nfunction GooglePayment(context, element) {\n  if (!context || !element) {\n    throw new Error('Google Payments requires both context and element.');\n  }\n  if (typeof context.placeOrder !== 'function') {\n    return console.error('PPCP Google Pay Context passed does not provide a placeOrder method', context);\n  }\n  clientContext = context;\n  const params = {\n    'client-id': clientContext.productionClientId,\n    intent: clientContext.intent,\n    components: 'googlepay',\n    currency: clientContext.transactionInfo.currencyCode\n  };\n  if (clientContext.environment === 'sandbox') {\n    params['client-id'] = clientContext.sandboxClientId;\n    params['buyer-country'] = clientContext.buyerCountry;\n  }\n\n  // Create Assets\n  createAssets.create('https://www.paypal.com/sdk/js', params, 'ppcp_googlepay', clientContext.pageType).then(() => deviceSupported()).then(googlepayConfig => createGooglePayClient(googlepayConfig)).then(googlepayConfig => createGooglePayButton(googlepayConfig)).then(googlePayButton => {\n    if (googlePayButton) {\n      const htmlElement = document.getElementById(element);\n      htmlElement.appendChild(googlePayButton); // Append button\n    }\n  }).catch(error => {\n    console.error('Error initializing Google Pay Button:', error);\n  });\n}\nmodule.exports = GooglePayment;\n\n//# sourceURL=webpack://ppcp-web/./src/google-payment/google-payment.js?");

/***/ }),

/***/ "./src/google-payment/index.js":
/*!*************************************!*\
  !*** ./src/google-payment/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const GooglePayment = __webpack_require__(/*! ./google-payment */ \"./src/google-payment/google-payment.js\");\nconst createAssets = __webpack_require__(/*! ../lib/create-assets */ \"./src/lib/create-assets.js\");\nfunction create(options, element) {\n  // Create Assets\n  // @todo - Check if payment method is enabled in magento (in options)\n  // if its enabled in the ppcp portal\n  createAssets.create('https://pay.google.com/gp/p/js/pay.js', {}, 'ppcp_pay', options.pageType);\n  return new GooglePayment(options, element);\n}\nmodule.exports = create;\n\n//# sourceURL=webpack://ppcp-web/./src/google-payment/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const applePayment = __webpack_require__(/*! ./apple-payment */ \"./src/apple-payment/index.js\");\nconst cardPayment = __webpack_require__(/*! ./card-payment/card-payment */ \"./src/card-payment/card-payment.js\");\nconst googlePayment = __webpack_require__(/*! ./google-payment */ \"./src/google-payment/index.js\");\nconst paypalButtons = __webpack_require__(/*! ./paypal-payment/paypal-buttons */ \"./src/paypal-payment/paypal-buttons/index.js\");\nconst paypalMessages = __webpack_require__(/*! ./paypal-payment/paypal-messages */ \"./src/paypal-payment/paypal-messages/index.js\");\nconst venmoPayment = __webpack_require__(/*! ./venmo-payment */ \"./src/venmo-payment/index.js\");\nmodule.exports = {\n  /** @type {module:ppcp-web/apple-payment} */\n  applePayment,\n  /** @type {module:ppcp-web/card-payment} */\n  cardPayment,\n  /** @type {module:ppcp-web/google-payment} */\n  googlePayment,\n  /** @type {module:ppcp-web/paypal-payment/paypal-buttons} */\n  paypalButtons,\n  /** @type {module:ppcp-web/paypal-payment/paypal-messages} */\n  paypalMessages,\n  /** @type {module:ppcp-web/venmo-payment} */\n  venmoPayment\n};\n\n//# sourceURL=webpack://ppcp-web/./src/index.js?");

/***/ }),

/***/ "./src/lib/create-assets.js":
/*!**********************************!*\
  !*** ./src/lib/create-assets.js ***!
  \**********************************/
/***/ ((module) => {

eval("const cache = {};\n// Create a cache of all the loaded scripts so that we don't load them multiple times.\nconst createAssets = (url, params, namespace, pageType, userIdToken) => {\n  const generateKey = (urlParam, namespaceParam, tokenParam = '') => urlParam + namespaceParam + tokenParam;\n  let finalUrl = url;\n  if (params) {\n    finalUrl = new URL(finalUrl);\n    finalUrl.search = new URLSearchParams(params);\n    finalUrl = decodeURIComponent(finalUrl.href);\n  }\n  const key = generateKey(finalUrl, namespace, userIdToken);\n\n  // If the key has already been used return the existing promise that will already be resolved.\n  if (cache[key]) {\n    return cache[key];\n  }\n\n  // New keys we will add to the cache and then return the pending promise.\n  cache[key] = new Promise(resolve => {\n    const script = document.createElement('script');\n    script.src = finalUrl;\n    script.dataset.namespace = `paypal_${namespace}`;\n    script.dataset.partnerAttributionId = 'GENE_PPCP';\n    script.dataset.pageType = pageType || 'checkout';\n    if (userIdToken) {\n      script.dataset.userIdToken = userIdToken;\n    }\n\n    // On load resolve but also emit a global event.\n    script.onload = () => {\n      const event = new CustomEvent('ppcpScriptLoaded', {\n        detail: namespace\n      });\n      document.dispatchEvent(event);\n      resolve();\n    };\n    document.head.appendChild(script);\n  });\n  return cache[key];\n};\nmodule.exports = {\n  create: createAssets\n};\n\n//# sourceURL=webpack://ppcp-web/./src/lib/create-assets.js?");

/***/ }),

/***/ "./src/paypal-payment/paypal-buttons/index.js":
/*!****************************************************!*\
  !*** ./src/paypal-payment/paypal-buttons/index.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const PaypalButtons = __webpack_require__(/*! ./paypal-buttons */ \"./src/paypal-payment/paypal-buttons/paypal-buttons.js\");\nfunction create(options, element) {\n  return new PaypalButtons(options, element);\n}\nmodule.exports = create;\n\n//# sourceURL=webpack://ppcp-web/./src/paypal-payment/paypal-buttons/index.js?");

/***/ }),

/***/ "./src/paypal-payment/paypal-buttons/paypal-buttons.js":
/*!*************************************************************!*\
  !*** ./src/paypal-payment/paypal-buttons/paypal-buttons.js ***!
  \*************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const createAssets = __webpack_require__(/*! ../../lib/create-assets */ \"./src/lib/create-assets.js\");\n\n// ToDo remove the _new from the namespace, need to leave it for now for development\n// needs a unique namespace compared to the old buttons\nconst namespace = 'ppcp_paypal_new';\nlet clientContext;\nlet buttonElement;\nlet fundingButtons;\nconst buttons = {};\n\n/**\n * Set available funding sources based on button availability in the DOM.\n * Filters funding sources and ensures that buttons for those sources exist.\n *\n * @returns {Promise<void>}\n */\nfunction setFunding() {\n  return new Promise(resolve => {\n    const fundings = [window[`paypal_${namespace}`].FUNDING.PAYPAL];\n    if (clientContext.isPayLaterEnabled) {\n      fundings.push(window[`paypal_${namespace}`].FUNDING.PAYLATER);\n    }\n\n    // Filter the funding based on which elements are available.\n    fundingButtons = fundings.filter(funding => {\n      const buttonSelector = `${buttonElement}-${funding}`;\n      const button = document.getElementById(buttonSelector);\n      if (button) {\n        return document.getElementById(buttonSelector);\n      }\n      console.error('Paypal button element does not exist', buttonSelector);\n      return null;\n    });\n    resolve();\n  });\n}\n\n/**\n * Get style configuration for a specific funding button.\n *\n * @param {string} funding - The funding source (e.g., 'paypal', 'paylater').\n * @returns {Object} - Style configuration object for the button.\n */\nfunction getStyles(funding) {\n  const {\n    [funding]: {\n      buttonColor,\n      buttonLabel,\n      buttonShape\n    }\n  } = clientContext.buttonStyles || {};\n  return {\n    color: buttonColor,\n    label: buttonLabel,\n    shape: buttonShape,\n    height: clientContext.buttonHeight ? clientContext.buttonHeight : 40\n  };\n}\n\n/**\n * Add messaging configuration for the Pay Later button, if applicable.\n *\n * @param {string} funding - The funding source (e.g., 'paylater').\n * @returns {Object|null} - Messaging configuration object or null if not applicable.\n */\nfunction addMessage(funding) {\n  // Only add the paylater messaging on the paylater button, if it's enabled and in the checkout.\n  if (funding === 'paylater' && clientContext.isPayLaterMessagingEnabled && clientContext.pageType === 'checkout') {\n    const config = clientContext.messageStyles.text || {};\n    return {\n      align: config.align,\n      amount: clientContext.amount,\n      // Button doesn't support monochrome or greyscale so in either of these cases return black.\n      color: config.color !== 'black' || config.color !== 'white' ? 'black' : config.color\n    };\n  }\n  return null;\n}\n\n/**\n * Create PayPal buttons for the available funding sources.\n *\n * @returns {Promise<void>}\n */\nfunction createButtons() {\n  return new Promise(resolve => {\n    fundingButtons.forEach(funding => {\n      const properties = {\n        createOrder: clientContext.createOrder,\n        onApprove: clientContext.onApprove,\n        onClick: clientContext.onClick,\n        onCancel: clientContext.onCancel,\n        onError: err => clientContext.onError(err),\n        onShippingAddressChange: data => clientContext.onShippingAddressChange(data),\n        onShippingOptionsChange: data => clientContext.onShippingOptionsChange(data)\n      };\n      properties.fundingSource = funding;\n      properties.style = getStyles(funding);\n      properties.message = addMessage(funding);\n      buttons[funding] = window[`paypal_${namespace}`].Buttons(properties);\n    });\n    resolve();\n  });\n}\n\n/**\n * Initialize and render PayPal buttons in the specified element.\n *\n * @param {Object} context - Context containing configuration for the buttons.\n * @param {string} element - The ID of the DOM element where the buttons will be rendered.\n */\nfunction PaypalButtons(context, element) {\n  if (!context || !element) {\n    throw new Error('PaypalButtons requires both context and element.');\n  }\n  clientContext = context;\n  buttonElement = element;\n  const params = {\n    'client-id': clientContext.productionClientId,\n    intent: clientContext.intent,\n    components: 'buttons',\n    currency: clientContext.currency\n  };\n  if (clientContext.environment === 'sandbox') {\n    params['client-id'] = clientContext.sandboxClientId;\n    params['buyer-country'] = clientContext.buyerCountry;\n  }\n  if (clientContext.isPayLaterMessagingEnabled) {\n    params.components += ',messages';\n  }\n  if (clientContext.isPayLaterEnabled) {\n    params['enable-funding'] = 'paylater';\n  }\n  createAssets.create('https://www.paypal.com/sdk/js', params, namespace, clientContext.pageType).then(() => setFunding()).then(() => createButtons()).then(() => {\n    Object.keys(buttons).forEach(funding => {\n      const buttonSelector = document.getElementById(`${buttonElement}-${funding}`);\n      const elementIsEmpty = buttonSelector.childNodes.length === 0;\n      if (buttons[funding].isEligible() && buttonSelector && elementIsEmpty) {\n        buttons[funding].render(buttonSelector);\n      }\n    });\n  }).catch(error => {\n    console.error('Error initializing PayPal Buttons:', error);\n  });\n}\nmodule.exports = PaypalButtons;\n\n//# sourceURL=webpack://ppcp-web/./src/paypal-payment/paypal-buttons/paypal-buttons.js?");

/***/ }),

/***/ "./src/paypal-payment/paypal-messages/index.js":
/*!*****************************************************!*\
  !*** ./src/paypal-payment/paypal-messages/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const PaypalMessages = __webpack_require__(/*! ./paypal-messages */ \"./src/paypal-payment/paypal-messages/paypal-messages.js\");\nfunction create(options, element) {\n  return new PaypalMessages(options, element);\n}\nmodule.exports = create;\n\n//# sourceURL=webpack://ppcp-web/./src/paypal-payment/paypal-messages/index.js?");

/***/ }),

/***/ "./src/paypal-payment/paypal-messages/paypal-messages.js":
/*!***************************************************************!*\
  !*** ./src/paypal-payment/paypal-messages/paypal-messages.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const createAssets = __webpack_require__(/*! ../../lib/create-assets */ \"./src/lib/create-assets.js\");\nconst namespace = 'ppcp_paypal_messages';\nlet clientContext;\nlet messageElement;\nconst params = {\n  components: 'messages'\n};\n\n/**\n * Attach a listener to subscribe for Pay Later message rendering.\n * This function ensures the PayPal SDK is loaded asynchronously before rendering the message.\n *\n * @returns {Promise<void>}\n */\nfunction attachPayLaterMessageSubscription() {\n  return createAssets.create('https://www.paypal.com/sdk/js', params, namespace, clientContext.pageType).then(() => renderMessage());\n}\n\n/**\n * Render the PayPal messaging component in the specified DOM element.\n * Ensures the PayPal SDK and messaging component are loaded before attempting to render.\n */\nfunction renderMessage() {\n  // Check that the messages component is available before calling it.\n  if (window[`paypal_${namespace}`].Messages) {\n    const message = window[`paypal_${namespace}`].Messages(clientContext.messageConfig);\n    const messageSelector = document.getElementById(messageElement);\n    message.render(messageSelector);\n  } else {\n    // Otherwise attach a wait for the component to load.\n    attachPayLaterMessageSubscription();\n  }\n}\n\n/**\n * Initialize and render PayPal messages in the specified DOM element.\n *\n * @param {Object} context - Context containing configuration for the messaging component.\n * @param {string} element - The ID of the DOM element where the message will be rendered.\n */\nfunction PaypalMessages(context, element) {\n  if (!context || !element) {\n    throw new Error('PaypalElements requires both context and element.');\n  }\n  clientContext = context;\n  messageElement = element;\n  params['client-id'] = clientContext.clientId;\n  renderMessage();\n}\nmodule.exports = PaypalMessages;\n\n//# sourceURL=webpack://ppcp-web/./src/paypal-payment/paypal-messages/paypal-messages.js?");

/***/ }),

/***/ "./src/venmo-payment/index.js":
/*!************************************!*\
  !*** ./src/venmo-payment/index.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const VenmoPayment = __webpack_require__(/*! ./venmo-payment */ \"./src/venmo-payment/venmo-payment.js\");\nfunction create(options, element) {\n  return new VenmoPayment(options, element);\n}\nmodule.exports = create;\n\n//# sourceURL=webpack://ppcp-web/./src/venmo-payment/index.js?");

/***/ }),

/***/ "./src/venmo-payment/venmo-payment.js":
/*!********************************************!*\
  !*** ./src/venmo-payment/venmo-payment.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const createAssets = __webpack_require__(/*! ../lib/create-assets */ \"./src/lib/create-assets.js\");\n\n// Global Variables\nconst namespace = 'ppcp_paypal_venmo';\nlet clientContext;\nlet buttonElement;\nlet button;\n\n/**\n * Create a Venmo payment button.\n *\n * @returns {Promise<void>} - Resolves when the Venmo button is created.\n */\nfunction createButton() {\n  return new Promise(resolve => {\n    const funding = window[`paypal_${namespace}`].FUNDING.VENMO;\n    const properties = {\n      createOrder: clientContext.createOrder,\n      onApprove: clientContext.onApprove,\n      onClick: clientContext.onClick,\n      onError: clientContext.onError,\n      fundingSource: funding\n    };\n    button = window[`paypal_${namespace}`].Buttons(properties);\n    resolve();\n  });\n}\n\n/**\n * Initialize and render a Venmo payment button.\n *\n * @param {Object} context - Configuration context for Venmo payment.\n * @param {string} element - ID of the DOM element where the button will be rendered.\n */\nfunction VenmoPayment(context, element) {\n  if (!context || !element) {\n    throw new Error('Venmo button requires both context and element.');\n  }\n  clientContext = context;\n  buttonElement = element;\n  const params = {\n    'client-id': clientContext.clientId,\n    intent: clientContext.intent,\n    components: 'buttons',\n    currency: clientContext.currency,\n    'enable-funding': 'venmo'\n  };\n  if (clientContext.environment === 'sandbox') {\n    params['buyer-country'] = clientContext.buyerCountry;\n  }\n  createAssets.create('https://www.paypal.com/sdk/js', params, namespace, clientContext.pageType).then(() => createButton()).then(() => {\n    const buttonSelector = document.getElementById(buttonElement);\n    const elementIsEmpty = buttonSelector.childNodes.length === 0;\n    if (button.isEligible() && buttonSelector && elementIsEmpty) {\n      button.render(buttonSelector);\n    }\n  }).catch(error => {\n    console.error('Error initializing Venmo Button:', error);\n  });\n}\nmodule.exports = VenmoPayment;\n\n//# sourceURL=webpack://ppcp-web/./src/venmo-payment/venmo-payment.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});;