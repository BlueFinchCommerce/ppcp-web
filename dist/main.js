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

/***/ "./src/google-payment/google-payment.js":
/*!**********************************************!*\
  !*** ./src/google-payment/google-payment.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var createAssets = __webpack_require__(/*! ../lib/create-assets */ \"./src/lib/create-assets.js\");\nvar getConfiguration = __webpack_require__(/*! ../lib/get-configuration */ \"./src/lib/get-configuration.js\");\nvar clientContext, googlePayClient;\nfunction GooglePayment(context, element) {\n  console.log('google pay web context', context);\n  if (!context) return; // @todo - error handling\n\n  if (typeof context.placeOrder !== 'function') {\n    return console.error('PPCP Google Pay Context passed does not provide a placeOrder method', context);\n  }\n  clientContext = context;\n\n  // const configuration = window.checkoutConfig?.ppcp || this.context\n  const configuration = getConfiguration.getConfiguration?.ppcp,\n    params = {\n      'client-id': configuration.clientId,\n      'intent': configuration.intent,\n      'components': 'googlepay',\n      'currency': clientContext.transactionInfo.currencyCode\n    },\n    pageType = 'checkout';\n  console.log('configuration', configuration);\n\n  // @todo - get page type ('checkout')\n  // pageType = configModel.pageType;\n\n  if (configuration.environment === 'sandbox') {\n    params['buyer-country'] = configuration.buyerCountry;\n  }\n\n  // Create Assets\n  createAssets.create('https://www.paypal.com/sdk/js', params, 'ppcp_googlepay', pageType);\n  const that = this;\n  setTimeout(() => {\n    deviceSupported().then(googlepayConfig => createGooglePayClient(googlepayConfig)).then(googlepayConfig => createGooglePayButton(googlepayConfig)).then(googlePayButton => {\n      if (googlePayButton) {\n        const htmlElement = document.getElementById(element);\n        htmlElement.appendChild(googlePayButton); // Append button\n      }\n    });\n  }, 1000);\n  // return deviceSupported.bind(this)\n  //     .then(createGooglePayClient.bind(this))\n  //     .then(createGooglePayButton.bind(this))\n  //     .then(googlePayButton => {\n  //         if (googlePayButton) {\n  //             element.appendChild(googlePayButton);\n  //         }\n  //     })\n  //     .catch((err) => {\n  //         console.warn(err);\n  //     });\n}\nfunction deviceSupported() {\n  return new Promise((resolve, reject) => {\n    if (location.protocol !== 'https:') {\n      console.warn('Google Pay requires your checkout be served over HTTPS');\n      return false;\n    }\n    const googlepay = window.paypal_ppcp_googlepay.Googlepay();\n    googlepay.config().then(googlepayConfig => {\n      if (googlepayConfig.isEligible) {\n        googlepayConfig.allowedPaymentMethods.forEach(method => {\n          method.parameters.billingAddressParameters.phoneNumberRequired = true;\n        });\n        resolve(googlepayConfig);\n      } else {\n        reject();\n      }\n    });\n  });\n}\nfunction createGooglePayClient(googlepayConfig) {\n  console.log('clientContext in createGooglePayClient', clientContext);\n  const paymentDataCallbacks = {\n    onPaymentAuthorized: data => clientContext.onPaymentAuthorized(data, googlepayConfig)\n  };\n\n  // @todo - get config model data\n  // if you make a change to anything - ie billing, shipping etc\n  //  if (this.context.onPaymentDataChanged && !configModel.isVirtual) {\n  if (clientContext.onPaymentDataChanged) {\n    paymentDataCallbacks.onPaymentDataChanged = data => clientContext.onPaymentDataChanged(data, googlepayConfig);\n  }\n  console.log(paymentDataCallbacks);\n  googlePayClient = new window.google.payments.api.PaymentsClient({\n    environment: getEnvironment(),\n    paymentDataCallbacks: paymentDataCallbacks\n  });\n  return googlePayClient.isReadyToPay({\n    apiVersion: googlepayConfig.apiVersion,\n    apiVersionMinor: googlepayConfig.apiVersionMinor,\n    allowedPaymentMethods: googlepayConfig.allowedPaymentMethods\n  }).then(response => {\n    if (response.result) {\n      return googlepayConfig;\n    }\n  });\n}\nfunction createGooglePayButton(googlepayConfig) {\n  return googlePayClient.createButton({\n    allowedPaymentMethods: googlepayConfig.allowedPaymentMethods,\n    buttonColor: clientContext.button.buttonColor.toLowerCase(),\n    buttonSizeMode: 'fill',\n    onClick: clientContext.beforeOnClick ? () => clientContext.beforeOnClick().then(() => onClick(googlepayConfig)) : () => onClick(googlepayConfig)\n  });\n}\nfunction onClick(googlepayConfig) {\n  if (clientContext.validateAdditionalValidators && !clientContext.validateAdditionalValidators()) {\n    return false;\n  }\n\n  // if (!checkGuestCheckout()) {\n  //     return false;\n  // }\n\n  const paymentDataRequest = Object.assign({}, googlepayConfig),\n    callbackIntents = ['PAYMENT_AUTHORIZATION'],\n    //     requiresShipping = this.context.onPaymentDataChanged && !configModel.isVirtual;\n\n    requiresShipping = clientContext.onPaymentDataChanged;\n  if (requiresShipping) {\n    callbackIntents.push('SHIPPING_ADDRESS', 'SHIPPING_OPTION');\n  }\n  paymentDataRequest.allowedPaymentMethods = googlepayConfig.allowedPaymentMethods;\n  paymentDataRequest.transactionInfo = {\n    countryCode: googlepayConfig.countryCode,\n    currencyCode: clientContext.transactionInfo.currencyCode,\n    totalPriceStatus: clientContext.transactionInfo.totalPriceStatus,\n    totalPrice: parseFloat(clientContext.transactionInfo.totalPrice).toFixed(2)\n  };\n  paymentDataRequest.merchantInfo = googlepayConfig.merchantInfo;\n  paymentDataRequest.shippingAddressRequired = !!requiresShipping;\n  paymentDataRequest.shippingAddressParameters = {\n    phoneNumberRequired: !!requiresShipping\n  };\n  paymentDataRequest.emailRequired = true;\n  paymentDataRequest.shippingOptionRequired = !!requiresShipping;\n  paymentDataRequest.callbackIntents = callbackIntents;\n  delete paymentDataRequest.countryCode;\n  delete paymentDataRequest.isEligible;\n  return googlePayClient.loadPaymentData(paymentDataRequest).catch(err => {\n    console.warn(err);\n  });\n}\n\n/**\n * Environment\n */\nfunction getEnvironment() {\n  // return configModel.environment === 'sandbox'\n  //     ? 'TEST'\n  //     : 'PRODUCTION';\n\n  return 'TEST';\n}\nmodule.exports = GooglePayment;\n\n//# sourceURL=webpack://ppcp-web/./src/google-payment/google-payment.js?");

/***/ }),

/***/ "./src/google-payment/index.js":
/*!*************************************!*\
  !*** ./src/google-payment/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var GooglePayment = __webpack_require__(/*! ./google-payment */ \"./src/google-payment/google-payment.js\");\nvar createAssets = __webpack_require__(/*! ../lib/create-assets */ \"./src/lib/create-assets.js\");\nvar getConfiguration = __webpack_require__(/*! ../lib/get-configuration */ \"./src/lib/get-configuration.js\");\nfunction create(options, element) {\n  var name = \"Google Pay\",\n    pageType = 'checkout';\n\n  // Create Assets\n  // @todo - Check if payment method is enabled in magento (in options) & if its enabled in the ppcp portal\n  createAssets.create('https://pay.google.com/gp/p/js/pay.js', {}, 'ppcp_pay', pageType);\n  return new GooglePayment(options, element);\n}\nmodule.exports = create;\n\n//# sourceURL=webpack://ppcp-web/./src/google-payment/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var googlePayment = __webpack_require__(/*! ./google-payment */ \"./src/google-payment/index.js\");\n\n//var VERSION = process.env.npm_package_version;\nmodule.exports = {\n  /** @type {module:ppcp-web/google-payment} */\n  googlePayment: googlePayment\n};\n\n//# sourceURL=webpack://ppcp-web/./src/index.js?");

/***/ }),

/***/ "./src/lib/create-assets.js":
/*!**********************************!*\
  !*** ./src/lib/create-assets.js ***!
  \**********************************/
/***/ ((module) => {

"use strict";
eval("\n\n// Create a cache of all the loaded scripts so that we don't load them multiple times.\nvar createAssets = function (url, params, namespace = 'ppcp', pageType, userIdToken) {\n  return new Promise(function (resolve, reject) {\n    const cache = {},\n      generateKey = (url, namespace, token = '') => {\n        return url + namespace + token;\n      };\n    if (params) {\n      url = new URL(url);\n      url.search = new URLSearchParams(params);\n      url = decodeURIComponent(url.href);\n      console.log(url);\n    }\n    const key = generateKey(url, namespace, userIdToken);\n\n    // If the key has already been used return the existing promise that will already be resolved.\n    if (cache[key]) {\n      return cache[key];\n    }\n\n    // New keys we will add to the cache and then return the pending promise.\n    cache[key] = new Promise(resolve => {\n      const script = document.createElement('script');\n      script.src = url;\n      script.dataset.namespace = `paypal_${namespace}`;\n      script.dataset.partnerAttributionId = 'GENE_PPCP';\n      script.dataset.pageType = pageType || 'checkout';\n      if (userIdToken) {\n        script.dataset.userIdToken = userIdToken;\n      }\n\n      // On load resolve but also emit a global event.\n      script.onload = () => {\n        console.log('script loaded: ', script.src);\n        var event = new CustomEvent(\"ppcpScriptLoaded\", {\n          \"detail\": namespace\n        });\n        document.dispatchEvent(event);\n        resolve();\n      };\n      document.head.appendChild(script);\n    });\n    resolve(cache[key]);\n  });\n};\nmodule.exports = {\n  create: createAssets\n};\n\n//# sourceURL=webpack://ppcp-web/./src/lib/create-assets.js?");

/***/ }),

/***/ "./src/lib/get-configuration.js":
/*!**************************************!*\
  !*** ./src/lib/get-configuration.js ***!
  \**************************************/
/***/ ((module) => {

"use strict";
eval("\n\nfunction configuration() {\n  // @todo - make configurable\n  return {\n    'ppcp': {\n      \"createOrderUrl\": \"https://checkout-workshop.test/rest/V1/ppcp/createOrder\",\n      \"createGuestOrderUrl\": \"https://checkout-workshop.test/rest/V1/ppcp/createGuestOrder\",\n      \"changeShippingAddressUrl\": \"https://checkout-workshop.test/rest/V1/ppcp/changeShippingAddress\",\n      \"changeShippingMethodUrl\": \"https://checkout-workshop.test/rest/V1/ppcp/changeShippingMethod\",\n      \"finishOrderUrl\": \"https://checkout-workshop.test/rest/V1/ppcp/finishOrder\",\n      \"successPageUrl\": \"https://checkout-workshop.test/checkout/onepage/success/\",\n      \"paypalExpressActive\": true,\n      \"applePayExpressActive\": true,\n      \"googlePayExpressActive\": true,\n      \"showExpress\": true,\n      \"amount\": 82,\n      \"currency\": \"USD\",\n      \"environment\": \"sandbox\",\n      \"clientId\": \"BAAaoPlNAgTXQ07GmF1Hu4Mr6vafLpsOaHr9WzR-kUdX58T13gFWv78bPQkkX-5chkDos3t8tP5YlGtt4Y\",\n      \"intent\": \"authorize\",\n      \"buyerCountry\": \"US\",\n      \"isPayLaterEnabled\": false,\n      \"isPayLaterMessagingEnabled\": false,\n      \"apmTitles\": \"{\\\"bancontact\\\":\\\"Bancontact\\\",\\\"blik\\\":\\\"BLIK\\\",\\\"eps\\\":\\\"eps\\\",\\\"ideal\\\":\\\"iDEAL\\\",\\\"multibanco\\\":\\\"Multibanco\\\",\\\"mybank\\\":\\\"MyBank\\\",\\\"p24\\\":\\\"Przelewy24\\\",\\\"trustly\\\":\\\"Trustly\\\"}\"\n    },\n    payment: {\n      \"ccform\": {\n        \"availableTypes\": {\n          \"braintree\": {\n            \"AE\": \"American Express\",\n            \"VI\": \"Visa\",\n            \"MC\": \"MasterCard\",\n            \"DI\": \"Discover\",\n            \"JCB\": \"JCB\",\n            \"DN\": \"Diners\",\n            \"MI\": \"Maestro International\",\n            \"UPD\": \"Union Pay through Discover\"\n          }\n        },\n        \"months\": {\n          \"braintree\": {\n            \"1\": \"01 - January\",\n            \"2\": \"02 - February\",\n            \"3\": \"03 - March\",\n            \"4\": \"04 - April\",\n            \"5\": \"05 - May\",\n            \"6\": \"06 - June\",\n            \"7\": \"07 - July\",\n            \"8\": \"08 - August\",\n            \"9\": \"09 - September\",\n            \"10\": \"10 - October\",\n            \"11\": \"11 - November\",\n            \"12\": \"12 - December\"\n          }\n        },\n        \"years\": {\n          \"braintree\": {\n            \"2024\": 2024,\n            \"2025\": 2025,\n            \"2026\": 2026,\n            \"2027\": 2027,\n            \"2028\": 2028,\n            \"2029\": 2029,\n            \"2030\": 2030,\n            \"2031\": 2031,\n            \"2032\": 2032,\n            \"2033\": 2033,\n            \"2034\": 2034\n          }\n        },\n        \"hasVerification\": {\n          \"braintree\": true\n        },\n        \"cvvImageUrl\": {\n          \"braintree\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Checkout/cvv.png\"\n        },\n        \"icons\": {\n          \"AE\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/ae.png\",\n            \"width\": 46,\n            \"height\": 30,\n            \"title\": \"American Express\"\n          },\n          \"VI\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/vi.png\",\n            \"width\": 46,\n            \"height\": 30,\n            \"title\": \"Visa\"\n          },\n          \"MC\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/mc.png\",\n            \"width\": 46,\n            \"height\": 30,\n            \"title\": \"MasterCard\"\n          },\n          \"DI\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/di.png\",\n            \"width\": 46,\n            \"height\": 30,\n            \"title\": \"Discover\"\n          },\n          \"JCB\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/jcb.png\",\n            \"width\": 46,\n            \"height\": 30,\n            \"title\": \"JCB\"\n          },\n          \"SM\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/sm.png\",\n            \"width\": 46,\n            \"height\": 30,\n            \"title\": \"Switch/Maestro\"\n          },\n          \"DN\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/dn.png\",\n            \"width\": 46,\n            \"height\": 30,\n            \"title\": \"Diners\"\n          },\n          \"SO\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/so.png\",\n            \"width\": 46,\n            \"height\": 30,\n            \"title\": \"Solo\"\n          },\n          \"MI\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/mi.png\",\n            \"width\": 46,\n            \"height\": 30,\n            \"title\": \"Maestro International\"\n          },\n          \"MD\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/md.png\",\n            \"width\": 46,\n            \"height\": 30,\n            \"title\": \"Maestro Domestic\"\n          },\n          \"HC\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/hc.png\",\n            \"width\": 46,\n            \"height\": 30,\n            \"title\": \"Hipercard\"\n          },\n          \"ELO\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/elo.png\",\n            \"width\": 46,\n            \"height\": 30,\n            \"title\": \"Elo\"\n          },\n          \"AU\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/au.png\",\n            \"width\": 46,\n            \"height\": 30,\n            \"title\": \"Aura\"\n          },\n          \"UN\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/un.png\",\n            \"width\": 46,\n            \"height\": 30,\n            \"title\": \"UnionPay\"\n          }\n        }\n      },\n      \"customerBalance\": {\n        \"isAvailable\": false,\n        \"amountSubstracted\": false,\n        \"usedAmount\": 0,\n        \"balance\": 0,\n        \"balanceRemoveUrl\": \"https://checkout-workshop.test/storecredit/cart/remove/\"\n      },\n      \"giftCardAccount\": {\n        \"hasUsage\": false,\n        \"amount\": \"0.0000\",\n        \"cards\": [],\n        \"available_amount\": \"0.0000\"\n      },\n      \"checkmo\": {\n        \"mailingAddress\": \"\",\n        \"payableTo\": null\n      },\n      \"vault\": [],\n      \"paypalExpress\": {\n        \"paymentAcceptanceMarkHref\": \"https://www.paypal.com/us/cgi-bin/webscr?cmd=xpt/Marketing/popup/OLCWhatIsPayPal-outside\",\n        \"paymentAcceptanceMarkSrc\": \"https://www.paypalobjects.com/webstatic/en_US/i/buttons/pp-acceptance-medium.png\",\n        \"isContextCheckout\": false,\n        \"inContextConfig\": []\n      },\n      \"paypalIframe\": [],\n      \"paypalBillingAgreement\": {\n        \"agreements\": [],\n        \"transportName\": \"ba_agreement_id\"\n      },\n      \"iframe\": {\n        \"timeoutTime\": {\n          \"payflowpro\": 30000\n        },\n        \"dateDelim\": {\n          \"payflowpro\": \"\"\n        },\n        \"cardFieldsMap\": {\n          \"payflowpro\": []\n        },\n        \"source\": {\n          \"payflowpro\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/blank.html\"\n        },\n        \"controllerName\": {\n          \"payflowpro\": \"checkout_flow\"\n        },\n        \"cgiUrl\": {\n          \"payflowpro\": \"https://payflowlink.paypal.com\"\n        },\n        \"placeOrderUrl\": {\n          \"payflowpro\": \"https://checkout-workshop.test/paypal/transparent/requestSecureToken/\"\n        },\n        \"saveOrderUrl\": {\n          \"payflowpro\": \"https://checkout-workshop.test/checkout/onepage/saveOrder/\"\n        },\n        \"expireYearLength\": {\n          \"payflowpro\": 2\n        }\n      },\n      \"reward\": {\n        \"isAvailable\": false,\n        \"amountSubstracted\": false,\n        \"usedAmount\": 0,\n        \"balance\": 0,\n        \"label\": \" store reward points available\"\n      },\n      \"\": [],\n      \"payment_services_paypal_hosted_fields\": {\n        \"isVisible\": false\n      },\n      \"payment_services_paypal_smart_buttons\": {\n        \"isVisible\": false\n      },\n      \"payment_services_paypal_apple_pay\": {\n        \"isVisible\": false\n      },\n      \"payment_services_paypal_google_pay\": {\n        \"isVisible\": false\n      },\n      \"ppcp_card\": {\n        \"isActive\": true,\n        \"vaultCode\": \"ppcp_card_vault\",\n        \"intent\": \"authorize\"\n      },\n      \"ppcp_card_vault\": {\n        \"isActive\": true,\n        \"cardBrandMapper\": {\n          \"AMEX\": \"AE\",\n          \"DISCOVER\": \"DI\",\n          \"JCB\": \"JCB\",\n          \"MASTERCARD\": \"MC\",\n          \"MASTER_CARD\": \"MC\",\n          \"VISA\": \"VI\",\n          \"MAESTRO\": \"MI\",\n          \"DINERS\": \"DN\"\n        }\n      },\n      \"ppcp_paypal\": {\n        \"isActive\": true,\n        \"vaultCode\": \"ppcp_paypal_vault\",\n        \"paymentAcceptanceMarkSrc\": \"https://www.paypalobjects.com/webstatic/en_US/i/buttons/pp-acceptance-medium.png\",\n        \"paymentIcon\": {\n          \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_PPCP/images/paypal.png\",\n          \"width\": null,\n          \"height\": null\n        },\n        \"isPayLaterEnabled\": false,\n        \"isPayLaterMessagingEnabled\": false,\n        \"messageStyles\": {\n          \"layout\": \"text\",\n          \"logo\": {\n            \"type\": \"primary\",\n            \"position\": \"left\"\n          },\n          \"text\": {\n            \"color\": \"black\",\n            \"size\": 12,\n            \"align\": \"left\"\n          }\n        },\n        \"styles\": {\n          \"primary\": {\n            \"buttonLabel\": \"paypal\",\n            \"buttonColor\": \"gold\",\n            \"buttonShape\": \"rect\"\n          }\n        },\n        \"intent\": \"authorize\",\n        \"sortOrder\": 0\n      },\n      \"ppcp_paypal_vault\": {\n        \"isActive\": true,\n        \"createAccessTokenUrl\": \"https://checkout-workshop.test/rest/V1/ppcp/createAccessToken\",\n        \"buttonLabel\": \"paypal\",\n        \"buttonColor\": \"gold\",\n        \"buttonShape\": \"rect\"\n      },\n      \"ppcp_applepay\": {\n        \"isActive\": true,\n        \"merchantName\": \"Store\",\n        \"paymentMarkSrc\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_PPCP/images/applepaymark.png\",\n        \"intent\": \"authorize\",\n        \"sortOrder\": 0\n      },\n      \"ppcp_venmo\": {\n        \"isActive\": true,\n        \"paymentMarkSrc\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_PPCP/images/venmo_logo_blue.png\",\n        \"vaultCode\": \"ppcp_venmo_vault\",\n        \"intent\": \"authorize\"\n      },\n      \"ppcp_venmo_vault\": {\n        \"isActive\": false,\n        \"paymentMarkSrc\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_PPCP/images/venmo_logo_blue.png\",\n        \"createAccessTokenUrl\": \"https://checkout-workshop.test/rest/V1/ppcp/createAccessToken\"\n      },\n      \"ppcp_googlepay\": {\n        \"isActive\": true,\n        \"paymentMarkSrc\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_PPCP/images/googlepaymark.png\",\n        \"buttonColor\": \"white\",\n        \"intent\": \"authorize\",\n        \"sortOrder\": 0\n      },\n      \"ppcp_apm\": {\n        \"isActive\": true,\n        \"allowed_methods\": \"bancontact,blik,eps,ideal,multibanco,mybank,p24,trustly\",\n        \"trustly_logo\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_PPCP/images/trustly.png\",\n        \"intent\": \"capture\"\n      },\n      \"braintree\": {\n        \"isActive\": true,\n        \"clientToken\": \"eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNkltaDBkSEJ6T2k4dllYQnBMbk5oYm1SaWIzZ3VZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpZlEuZXlKbGVIQWlPakUzTXpJeE1qWTNOekVzSW1wMGFTSTZJalpqTTJaa056QTBMVEJpTldFdE5EVTNZaTFpWkRReExXVTBOV1F4WmprNVpHVmhNaUlzSW5OMVlpSTZJbTVxZDJRemVXYzVaR000TldScmEzRWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aWJXVnlZMmhoYm5RaU9uc2ljSFZpYkdsalgybGtJam9pYm1wM1pETjVaemxrWXpnMVpHdHJjU0lzSW5abGNtbG1lVjlqWVhKa1gySjVYMlJsWm1GMWJIUWlPblJ5ZFdWOUxDSnlhV2RvZEhNaU9sc2liV0Z1WVdkbFgzWmhkV3gwSWwwc0luTmpiM0JsSWpwYklrSnlZV2x1ZEhKbFpUcFdZWFZzZENJc0lrSnlZV2x1ZEhKbFpUcEJXRThpWFN3aWIzQjBhVzl1Y3lJNmUzMTkuYXBFMTZWN3VhcVVWU2lCM3lKNElYWldmM2lwa0E1ZTlweE95cVJlbi1DM00zTFFhWlJ2ZUc4bW8tdzNyWUp0TzUzd1RtcXBoV2VGb0ctVjVNbU1QN3ciLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvbmp3ZDN5ZzlkYzg1ZGtrcS9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJncmFwaFFMIjp7InVybCI6Imh0dHBzOi8vcGF5bWVudHMuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9ncmFwaHFsIiwiZGF0ZSI6IjIwMTgtMDUtMDgiLCJmZWF0dXJlcyI6WyJ0b2tlbml6ZV9jcmVkaXRfY2FyZHMiXX0sImNsaWVudEFwaVVybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy9uandkM3lnOWRjODVka2txL2NsaWVudF9hcGkiLCJlbnZpcm9ubWVudCI6InNhbmRib3giLCJtZXJjaGFudElkIjoibmp3ZDN5ZzlkYzg1ZGtrcSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwidmVubW8iOiJvZmYiLCJjaGFsbGVuZ2VzIjpbImN2diJdLCJ0aHJlZURTZWN1cmVFbmFibGVkIjp0cnVlLCJhbmFseXRpY3MiOnsidXJsIjoiaHR0cHM6Ly9vcmlnaW4tYW5hbHl0aWNzLXNhbmQuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9uandkM3lnOWRjODVka2txIn0sInBheXBhbEVuYWJsZWQiOnRydWUsImJyYWludHJlZV9hcGkiOnsidXJsIjoiaHR0cHM6Ly9wYXltZW50cy5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tIiwiYWNjZXNzX3Rva2VuIjoiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKRlV6STFOaUlzSW10cFpDSTZJakl3TVRnd05ESTJNVFl0YzJGdVpHSnZlQ0lzSW1semN5STZJbWgwZEhCek9pOHZZWEJwTG5OaGJtUmliM2d1WW5KaGFXNTBjbVZsWjJGMFpYZGhlUzVqYjIwaWZRLmV5SmxlSEFpT2pFM016SXhNalkzTlRJc0ltcDBhU0k2SWpJNE1qRTNNalF5TFRZNE16QXROR00xWlMxaVpXWmhMVGc0TmpFd1pXWTNORGxpTmlJc0luTjFZaUk2SW01cWQyUXplV2M1WkdNNE5XUnJhM0VpTENKcGMzTWlPaUpvZEhSd2N6b3ZMMkZ3YVM1ellXNWtZbTk0TG1KeVlXbHVkSEpsWldkaGRHVjNZWGt1WTI5dElpd2liV1Z5WTJoaGJuUWlPbnNpY0hWaWJHbGpYMmxrSWpvaWJtcDNaRE41Wnpsa1l6ZzFaR3RyY1NJc0luWmxjbWxtZVY5allYSmtYMko1WDJSbFptRjFiSFFpT25SeWRXVjlMQ0p5YVdkb2RITWlPbHNpZEc5clpXNXBlbVVpTENKdFlXNWhaMlZmZG1GMWJIUWlYU3dpYzJOdmNHVWlPbHNpUW5KaGFXNTBjbVZsT2xaaGRXeDBJaXdpUW5KaGFXNTBjbVZsT2tGWVR5SmRMQ0p2Y0hScGIyNXpJanA3ZlgwLk9uemQwOEFBOEdhSEg2bk1yb05NQi1melVZamp3bDVEdVZNU1RoMUQ0dGlTVW56VEJwZGlvWXNtMXlncjlDR1BHSXAxcUxYa0xzUzNjMlB3djE3WWlnIn0sInBheXBhbCI6eyJiaWxsaW5nQWdyZWVtZW50c0VuYWJsZWQiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjpmYWxzZSwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImFsbG93SHR0cCI6dHJ1ZSwiZGlzcGxheU5hbWUiOiJHZW5lIENvbW1lcmNlIiwiY2xpZW50SWQiOiJBWWtyeWk5bXRlMjNadUtvNjJ0QVhueURpa0FZWENKY25NRGN2T3FzcEg4S21oT1JhU1A2dHF1M2VDTldFMy10d2kxWUlGWFYtNFh3b2liYiIsImJhc2VVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFzc2V0c1VybCI6Imh0dHBzOi8vY2hlY2tvdXQucGF5cGFsLmNvbSIsImRpcmVjdEJhc2VVcmwiOm51bGwsImVudmlyb25tZW50Ijoib2ZmbGluZSIsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsIm1lcmNoYW50QWNjb3VudElkIjoiZ2VuZS11c2QiLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifX0=\",\n        \"ccTypesMapper\": {\n          \"american-express\": \"AE\",\n          \"discover\": \"DI\",\n          \"jcb\": \"JCB\",\n          \"mastercard\": \"MC\",\n          \"master-card\": \"MC\",\n          \"visa\": \"VI\",\n          \"maestro\": \"MI\",\n          \"uk-maestro\": \"MI\",\n          \"diners-club\": \"DN\",\n          \"unionpay\": \"UPD\"\n        },\n        \"countrySpecificCardTypes\": [],\n        \"availableCardTypes\": [\"AE\", \"VI\", \"MC\", \"DI\", \"JCB\", \"DN\", \"MI\", \"UPD\"],\n        \"useCvv\": true,\n        \"environment\": \"sandbox\",\n        \"merchantId\": \"njwd3yg9dc85dkkq\",\n        \"ccVaultCode\": \"braintree_cc_vault\",\n        \"style\": {\n          \"shape\": \"rect\",\n          \"color\": \"gold\"\n        },\n        \"disabledFunding\": {\n          \"card\": false,\n          \"elv\": false\n        },\n        \"icons\": {\n          \"AE\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/cc/AE.png\",\n            \"alt\": \"AE\",\n            \"width\": 48,\n            \"height\": 48\n          },\n          \"VI\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/cc/VI.png\",\n            \"alt\": \"VI\",\n            \"width\": 48,\n            \"height\": 48\n          },\n          \"MC\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/cc/MC.png\",\n            \"alt\": \"MC\",\n            \"width\": 48,\n            \"height\": 48\n          },\n          \"DI\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/cc/DI.png\",\n            \"alt\": \"DI\",\n            \"width\": 48,\n            \"height\": 48\n          },\n          \"JCB\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/cc/JCB.png\",\n            \"alt\": \"JCB\",\n            \"width\": 48,\n            \"height\": 48\n          },\n          \"DN\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/cc/DN.png\",\n            \"alt\": \"DN\",\n            \"width\": 50,\n            \"height\": 47\n          },\n          \"MI\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/cc/MI.png\",\n            \"alt\": \"MI\",\n            \"width\": 48,\n            \"height\": 48\n          },\n          \"UPD\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/cc/UPD.png\",\n            \"alt\": \"UPD\",\n            \"width\": 48,\n            \"height\": 48\n          },\n          \"NONE\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/cc/NONE.png\",\n            \"alt\": \"NONE\",\n            \"width\": 48,\n            \"height\": 48\n          }\n        }\n      },\n      \"braintree_cc_vault\": {\n        \"cvvVerify\": false\n      },\n      \"braintree_googlepay\": {\n        \"environment\": \"TEST\",\n        \"clientToken\": \"eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNkltaDBkSEJ6T2k4dllYQnBMbk5oYm1SaWIzZ3VZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpZlEuZXlKbGVIQWlPakUzTXpJeE1qWTNOekVzSW1wMGFTSTZJbUUzTnprM01EZ3dMVEF4Wm1JdE5EWmhZeTA1WW1KbUxUZGhNamhsWTJObU1ETm1aU0lzSW5OMVlpSTZJbTVxZDJRemVXYzVaR000TldScmEzRWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aWJXVnlZMmhoYm5RaU9uc2ljSFZpYkdsalgybGtJam9pYm1wM1pETjVaemxrWXpnMVpHdHJjU0lzSW5abGNtbG1lVjlqWVhKa1gySjVYMlJsWm1GMWJIUWlPblJ5ZFdWOUxDSnlhV2RvZEhNaU9sc2liV0Z1WVdkbFgzWmhkV3gwSWwwc0luTmpiM0JsSWpwYklrSnlZV2x1ZEhKbFpUcFdZWFZzZENJc0lrSnlZV2x1ZEhKbFpUcEJXRThpWFN3aWIzQjBhVzl1Y3lJNmUzMTkuQ0lZMGdHUENJcE9WNWh1ZkVhR2hjZFFOTFRYUFlEaTZFQWtnQlhTTHdlX1F5TGgtSHBoUDFNaE9PVmh6bWJESV9hRUdubUlHZER6Uk40NjB4aHoza3ciLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvbmp3ZDN5ZzlkYzg1ZGtrcS9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJncmFwaFFMIjp7InVybCI6Imh0dHBzOi8vcGF5bWVudHMuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9ncmFwaHFsIiwiZGF0ZSI6IjIwMTgtMDUtMDgiLCJmZWF0dXJlcyI6WyJ0b2tlbml6ZV9jcmVkaXRfY2FyZHMiXX0sImNsaWVudEFwaVVybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy9uandkM3lnOWRjODVka2txL2NsaWVudF9hcGkiLCJlbnZpcm9ubWVudCI6InNhbmRib3giLCJtZXJjaGFudElkIjoibmp3ZDN5ZzlkYzg1ZGtrcSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwidmVubW8iOiJvZmYiLCJjaGFsbGVuZ2VzIjpbImN2diJdLCJ0aHJlZURTZWN1cmVFbmFibGVkIjp0cnVlLCJhbmFseXRpY3MiOnsidXJsIjoiaHR0cHM6Ly9vcmlnaW4tYW5hbHl0aWNzLXNhbmQuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9uandkM3lnOWRjODVka2txIn0sInBheXBhbEVuYWJsZWQiOnRydWUsImJyYWludHJlZV9hcGkiOnsidXJsIjoiaHR0cHM6Ly9wYXltZW50cy5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tIiwiYWNjZXNzX3Rva2VuIjoiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKRlV6STFOaUlzSW10cFpDSTZJakl3TVRnd05ESTJNVFl0YzJGdVpHSnZlQ0lzSW1semN5STZJbWgwZEhCek9pOHZZWEJwTG5OaGJtUmliM2d1WW5KaGFXNTBjbVZsWjJGMFpYZGhlUzVqYjIwaWZRLmV5SmxlSEFpT2pFM016SXhNalkzTlRJc0ltcDBhU0k2SWpJNE1qRTNNalF5TFRZNE16QXROR00xWlMxaVpXWmhMVGc0TmpFd1pXWTNORGxpTmlJc0luTjFZaUk2SW01cWQyUXplV2M1WkdNNE5XUnJhM0VpTENKcGMzTWlPaUpvZEhSd2N6b3ZMMkZ3YVM1ellXNWtZbTk0TG1KeVlXbHVkSEpsWldkaGRHVjNZWGt1WTI5dElpd2liV1Z5WTJoaGJuUWlPbnNpY0hWaWJHbGpYMmxrSWpvaWJtcDNaRE41Wnpsa1l6ZzFaR3RyY1NJc0luWmxjbWxtZVY5allYSmtYMko1WDJSbFptRjFiSFFpT25SeWRXVjlMQ0p5YVdkb2RITWlPbHNpZEc5clpXNXBlbVVpTENKdFlXNWhaMlZmZG1GMWJIUWlYU3dpYzJOdmNHVWlPbHNpUW5KaGFXNTBjbVZsT2xaaGRXeDBJaXdpUW5KaGFXNTBjbVZsT2tGWVR5SmRMQ0p2Y0hScGIyNXpJanA3ZlgwLk9uemQwOEFBOEdhSEg2bk1yb05NQi1melVZamp3bDVEdVZNU1RoMUQ0dGlTVW56VEJwZGlvWXNtMXlncjlDR1BHSXAxcUxYa0xzUzNjMlB3djE3WWlnIn0sInBheXBhbCI6eyJiaWxsaW5nQWdyZWVtZW50c0VuYWJsZWQiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjpmYWxzZSwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImFsbG93SHR0cCI6dHJ1ZSwiZGlzcGxheU5hbWUiOiJHZW5lIENvbW1lcmNlIiwiY2xpZW50SWQiOiJBWWtyeWk5bXRlMjNadUtvNjJ0QVhueURpa0FZWENKY25NRGN2T3FzcEg4S21oT1JhU1A2dHF1M2VDTldFMy10d2kxWUlGWFYtNFh3b2liYiIsImJhc2VVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFzc2V0c1VybCI6Imh0dHBzOi8vY2hlY2tvdXQucGF5cGFsLmNvbSIsImRpcmVjdEJhc2VVcmwiOm51bGwsImVudmlyb25tZW50Ijoib2ZmbGluZSIsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsIm1lcmNoYW50QWNjb3VudElkIjoiZ2VuZS11c2QiLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifX0=\",\n        \"merchantId\": \"testmode\",\n        \"cardTypes\": [\"VISA\", \"MASTERCARD\", \"AMEX\"],\n        \"btnColor\": 0,\n        \"paymentMarkSrc\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/GooglePay_AcceptanceMark_WhiteShape_RGB_60x36pt@4x.png\",\n        \"vaultCode\": \"braintree_googlepay_vault\",\n        \"icons\": {\n          \"ae\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/googlepay/ae.png\",\n            \"width\": 46,\n            \"height\": 30,\n            \"title\": \"Google Pay - American Express\"\n          },\n          \"di\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/googlepay/di.png\",\n            \"width\": 46,\n            \"height\": 30,\n            \"title\": \"Google Pay - Discover\"\n          },\n          \"mc\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/googlepay/mc.png\",\n            \"width\": 46,\n            \"height\": 30,\n            \"title\": \"Google Pay - MasterCard\"\n          },\n          \"vi\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/googlepay/vi.png\",\n            \"width\": 46,\n            \"height\": 30,\n            \"title\": \"Google Pay - Visa\"\n          },\n          \"googlepaymark\": {\n            \"url\": \"https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/GooglePay_AcceptanceMark_WhiteShape_RGB_60x36pt@4x.png\",\n            \"width\": 46,\n            \"height\": 30,\n            \"title\": \"Google Pay\"\n          }\n        }\n      },\n      \"three_d_secure\": {\n        \"enabled\": false,\n        \"challengeRequested\": false,\n        \"thresholdAmount\": 0,\n        \"specificCountries\": [],\n        \"ccVaultCode\": \"braintree_cc_vault\",\n        \"useCvvVault\": false,\n        \"ipAddress\": \"192.168.65.1\"\n      }\n    }\n  };\n}\nmodule.exports = {\n  getConfiguration: configuration()\n};\n\n//# sourceURL=webpack://ppcp-web/./src/lib/get-configuration.js?");

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