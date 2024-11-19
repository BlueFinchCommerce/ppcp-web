"use strict";
function configuration() {
    // @todo - make configurable
    return {
        'ppcp': {
            "createOrderUrl": "https://checkout-workshop.test/rest/V1/ppcp/createOrder",
            "createGuestOrderUrl": "https://checkout-workshop.test/rest/V1/ppcp/createGuestOrder",
            "changeShippingAddressUrl": "https://checkout-workshop.test/rest/V1/ppcp/changeShippingAddress",
            "changeShippingMethodUrl": "https://checkout-workshop.test/rest/V1/ppcp/changeShippingMethod",
            "finishOrderUrl": "https://checkout-workshop.test/rest/V1/ppcp/finishOrder",
            "successPageUrl": "https://checkout-workshop.test/checkout/onepage/success/",
            "paypalExpressActive": true,
            "applePayExpressActive": true,
            "googlePayExpressActive": true,
            "showExpress": true,
            "amount": 82,
            "currency": "USD",
            "environment": "sandbox",
            "clientId": "BAAaoPlNAgTXQ07GmF1Hu4Mr6vafLpsOaHr9WzR-kUdX58T13gFWv78bPQkkX-5chkDos3t8tP5YlGtt4Y",
            "intent": "authorize",
            "buyerCountry": "US",
            "isPayLaterEnabled": false,
            "isPayLaterMessagingEnabled": false,
            "apmTitles": "{\"bancontact\":\"Bancontact\",\"blik\":\"BLIK\",\"eps\":\"eps\",\"ideal\":\"iDEAL\",\"multibanco\":\"Multibanco\",\"mybank\":\"MyBank\",\"p24\":\"Przelewy24\",\"trustly\":\"Trustly\"}"
        },
        payment: {
            "ccform": {
                "availableTypes": {
                    "braintree": {
                        "AE": "American Express",
                        "VI": "Visa",
                        "MC": "MasterCard",
                        "DI": "Discover",
                        "JCB": "JCB",
                        "DN": "Diners",
                        "MI": "Maestro International",
                        "UPD": "Union Pay through Discover"
                    }
                },
                "months": {
                    "braintree": {
                        "1": "01 - January",
                        "2": "02 - February",
                        "3": "03 - March",
                        "4": "04 - April",
                        "5": "05 - May",
                        "6": "06 - June",
                        "7": "07 - July",
                        "8": "08 - August",
                        "9": "09 - September",
                        "10": "10 - October",
                        "11": "11 - November",
                        "12": "12 - December"
                    }
                },
                "years": {
                    "braintree": {
                        "2024": 2024,
                        "2025": 2025,
                        "2026": 2026,
                        "2027": 2027,
                        "2028": 2028,
                        "2029": 2029,
                        "2030": 2030,
                        "2031": 2031,
                        "2032": 2032,
                        "2033": 2033,
                        "2034": 2034
                    }
                },
                "hasVerification": {
                    "braintree": true
                },
                "cvvImageUrl": {
                    "braintree": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Checkout/cvv.png"
                },
                "icons": {
                    "AE": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/ae.png",
                        "width": 46,
                        "height": 30,
                        "title": "American Express"
                    },
                    "VI": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/vi.png",
                        "width": 46,
                        "height": 30,
                        "title": "Visa"
                    },
                    "MC": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/mc.png",
                        "width": 46,
                        "height": 30,
                        "title": "MasterCard"
                    },
                    "DI": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/di.png",
                        "width": 46,
                        "height": 30,
                        "title": "Discover"
                    },
                    "JCB": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/jcb.png",
                        "width": 46,
                        "height": 30,
                        "title": "JCB"
                    },
                    "SM": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/sm.png",
                        "width": 46,
                        "height": 30,
                        "title": "Switch/Maestro"
                    },
                    "DN": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/dn.png",
                        "width": 46,
                        "height": 30,
                        "title": "Diners"
                    },
                    "SO": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/so.png",
                        "width": 46,
                        "height": 30,
                        "title": "Solo"
                    },
                    "MI": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/mi.png",
                        "width": 46,
                        "height": 30,
                        "title": "Maestro International"
                    },
                    "MD": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/md.png",
                        "width": 46,
                        "height": 30,
                        "title": "Maestro Domestic"
                    },
                    "HC": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/hc.png",
                        "width": 46,
                        "height": 30,
                        "title": "Hipercard"
                    },
                    "ELO": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/elo.png",
                        "width": 46,
                        "height": 30,
                        "title": "Elo"
                    },
                    "AU": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/au.png",
                        "width": 46,
                        "height": 30,
                        "title": "Aura"
                    },
                    "UN": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/Magento_Payment/images/cc/un.png",
                        "width": 46,
                        "height": 30,
                        "title": "UnionPay"
                    }
                }
            },
            "customerBalance": {
                "isAvailable": false,
                "amountSubstracted": false,
                "usedAmount": 0,
                "balance": 0,
                "balanceRemoveUrl": "https://checkout-workshop.test/storecredit/cart/remove/"
            },
            "giftCardAccount": {
                "hasUsage": false,
                "amount": "0.0000",
                "cards": [],
                "available_amount": "0.0000"
            },
            "checkmo": {
                "mailingAddress": "",
                "payableTo": null
            },
            "vault": [],
            "paypalExpress": {
                "paymentAcceptanceMarkHref": "https://www.paypal.com/us/cgi-bin/webscr?cmd=xpt/Marketing/popup/OLCWhatIsPayPal-outside",
                "paymentAcceptanceMarkSrc": "https://www.paypalobjects.com/webstatic/en_US/i/buttons/pp-acceptance-medium.png",
                "isContextCheckout": false,
                "inContextConfig": []
            },
            "paypalIframe": [],
            "paypalBillingAgreement": {
                "agreements": [],
                "transportName": "ba_agreement_id"
            },
            "iframe": {
                "timeoutTime": {
                    "payflowpro": 30000
                },
                "dateDelim": {
                    "payflowpro": ""
                },
                "cardFieldsMap": {
                    "payflowpro": []
                },
                "source": {
                    "payflowpro": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/blank.html"
                },
                "controllerName": {
                    "payflowpro": "checkout_flow"
                },
                "cgiUrl": {
                    "payflowpro": "https://payflowlink.paypal.com"
                },
                "placeOrderUrl": {
                    "payflowpro": "https://checkout-workshop.test/paypal/transparent/requestSecureToken/"
                },
                "saveOrderUrl": {
                    "payflowpro": "https://checkout-workshop.test/checkout/onepage/saveOrder/"
                },
                "expireYearLength": {
                    "payflowpro": 2
                }
            },
            "reward": {
                "isAvailable": false,
                "amountSubstracted": false,
                "usedAmount": 0,
                "balance": 0,
                "label": " store reward points available"
            },
            "": [],
            "payment_services_paypal_hosted_fields": {
                "isVisible": false
            },
            "payment_services_paypal_smart_buttons": {
                "isVisible": false
            },
            "payment_services_paypal_apple_pay": {
                "isVisible": false
            },
            "payment_services_paypal_google_pay": {
                "isVisible": false
            },
            "ppcp_card": {
                "isActive": true,
                "vaultCode": "ppcp_card_vault",
                "intent": "authorize"
            },
            "ppcp_card_vault": {
                "isActive": true,
                "cardBrandMapper": {
                    "AMEX": "AE",
                    "DISCOVER": "DI",
                    "JCB": "JCB",
                    "MASTERCARD": "MC",
                    "MASTER_CARD": "MC",
                    "VISA": "VI",
                    "MAESTRO": "MI",
                    "DINERS": "DN"
                }
            },
            "ppcp_paypal": {
                "isActive": true,
                "vaultCode": "ppcp_paypal_vault",
                "paymentAcceptanceMarkSrc": "https://www.paypalobjects.com/webstatic/en_US/i/buttons/pp-acceptance-medium.png",
                "paymentIcon": {
                    "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_PPCP/images/paypal.png",
                    "width": null,
                    "height": null
                },
                "isPayLaterEnabled": false,
                "isPayLaterMessagingEnabled": false,
                "messageStyles": {
                    "layout": "text",
                    "logo": {
                        "type": "primary",
                        "position": "left"
                    },
                    "text": {
                        "color": "black",
                        "size": 12,
                        "align": "left"
                    }
                },
                "styles": {
                    "primary": {
                        "buttonLabel": "paypal",
                        "buttonColor": "gold",
                        "buttonShape": "rect"
                    }
                },
                "intent": "authorize",
                "sortOrder": 0
            },
            "ppcp_paypal_vault": {
                "isActive": true,
                "createAccessTokenUrl": "https://checkout-workshop.test/rest/V1/ppcp/createAccessToken",
                "buttonLabel": "paypal",
                "buttonColor": "gold",
                "buttonShape": "rect"
            },
            "ppcp_applepay": {
                "isActive": true,
                "merchantName": "Store",
                "paymentMarkSrc": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_PPCP/images/applepaymark.png",
                "intent": "authorize",
                "sortOrder": 0
            },
            "ppcp_venmo": {
                "isActive": true,
                "paymentMarkSrc": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_PPCP/images/venmo_logo_blue.png",
                "vaultCode": "ppcp_venmo_vault",
                "intent": "authorize"
            },
            "ppcp_venmo_vault": {
                "isActive": false,
                "paymentMarkSrc": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_PPCP/images/venmo_logo_blue.png",
                "createAccessTokenUrl": "https://checkout-workshop.test/rest/V1/ppcp/createAccessToken"
            },
            "ppcp_googlepay": {
                "isActive": true,
                "paymentMarkSrc": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_PPCP/images/googlepaymark.png",
                "buttonColor": "white",
                "intent": "authorize",
                "sortOrder": 0
            },
            "ppcp_apm": {
                "isActive": true,
                "allowed_methods": "bancontact,blik,eps,ideal,multibanco,mybank,p24,trustly",
                "trustly_logo": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_PPCP/images/trustly.png",
                "intent": "capture"
            },
            "braintree": {
                "isActive": true,
                "clientToken": "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNkltaDBkSEJ6T2k4dllYQnBMbk5oYm1SaWIzZ3VZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpZlEuZXlKbGVIQWlPakUzTXpJeE1qWTNOekVzSW1wMGFTSTZJalpqTTJaa056QTBMVEJpTldFdE5EVTNZaTFpWkRReExXVTBOV1F4WmprNVpHVmhNaUlzSW5OMVlpSTZJbTVxZDJRemVXYzVaR000TldScmEzRWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aWJXVnlZMmhoYm5RaU9uc2ljSFZpYkdsalgybGtJam9pYm1wM1pETjVaemxrWXpnMVpHdHJjU0lzSW5abGNtbG1lVjlqWVhKa1gySjVYMlJsWm1GMWJIUWlPblJ5ZFdWOUxDSnlhV2RvZEhNaU9sc2liV0Z1WVdkbFgzWmhkV3gwSWwwc0luTmpiM0JsSWpwYklrSnlZV2x1ZEhKbFpUcFdZWFZzZENJc0lrSnlZV2x1ZEhKbFpUcEJXRThpWFN3aWIzQjBhVzl1Y3lJNmUzMTkuYXBFMTZWN3VhcVVWU2lCM3lKNElYWldmM2lwa0E1ZTlweE95cVJlbi1DM00zTFFhWlJ2ZUc4bW8tdzNyWUp0TzUzd1RtcXBoV2VGb0ctVjVNbU1QN3ciLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvbmp3ZDN5ZzlkYzg1ZGtrcS9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJncmFwaFFMIjp7InVybCI6Imh0dHBzOi8vcGF5bWVudHMuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9ncmFwaHFsIiwiZGF0ZSI6IjIwMTgtMDUtMDgiLCJmZWF0dXJlcyI6WyJ0b2tlbml6ZV9jcmVkaXRfY2FyZHMiXX0sImNsaWVudEFwaVVybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy9uandkM3lnOWRjODVka2txL2NsaWVudF9hcGkiLCJlbnZpcm9ubWVudCI6InNhbmRib3giLCJtZXJjaGFudElkIjoibmp3ZDN5ZzlkYzg1ZGtrcSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwidmVubW8iOiJvZmYiLCJjaGFsbGVuZ2VzIjpbImN2diJdLCJ0aHJlZURTZWN1cmVFbmFibGVkIjp0cnVlLCJhbmFseXRpY3MiOnsidXJsIjoiaHR0cHM6Ly9vcmlnaW4tYW5hbHl0aWNzLXNhbmQuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9uandkM3lnOWRjODVka2txIn0sInBheXBhbEVuYWJsZWQiOnRydWUsImJyYWludHJlZV9hcGkiOnsidXJsIjoiaHR0cHM6Ly9wYXltZW50cy5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tIiwiYWNjZXNzX3Rva2VuIjoiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKRlV6STFOaUlzSW10cFpDSTZJakl3TVRnd05ESTJNVFl0YzJGdVpHSnZlQ0lzSW1semN5STZJbWgwZEhCek9pOHZZWEJwTG5OaGJtUmliM2d1WW5KaGFXNTBjbVZsWjJGMFpYZGhlUzVqYjIwaWZRLmV5SmxlSEFpT2pFM016SXhNalkzTlRJc0ltcDBhU0k2SWpJNE1qRTNNalF5TFRZNE16QXROR00xWlMxaVpXWmhMVGc0TmpFd1pXWTNORGxpTmlJc0luTjFZaUk2SW01cWQyUXplV2M1WkdNNE5XUnJhM0VpTENKcGMzTWlPaUpvZEhSd2N6b3ZMMkZ3YVM1ellXNWtZbTk0TG1KeVlXbHVkSEpsWldkaGRHVjNZWGt1WTI5dElpd2liV1Z5WTJoaGJuUWlPbnNpY0hWaWJHbGpYMmxrSWpvaWJtcDNaRE41Wnpsa1l6ZzFaR3RyY1NJc0luWmxjbWxtZVY5allYSmtYMko1WDJSbFptRjFiSFFpT25SeWRXVjlMQ0p5YVdkb2RITWlPbHNpZEc5clpXNXBlbVVpTENKdFlXNWhaMlZmZG1GMWJIUWlYU3dpYzJOdmNHVWlPbHNpUW5KaGFXNTBjbVZsT2xaaGRXeDBJaXdpUW5KaGFXNTBjbVZsT2tGWVR5SmRMQ0p2Y0hScGIyNXpJanA3ZlgwLk9uemQwOEFBOEdhSEg2bk1yb05NQi1melVZamp3bDVEdVZNU1RoMUQ0dGlTVW56VEJwZGlvWXNtMXlncjlDR1BHSXAxcUxYa0xzUzNjMlB3djE3WWlnIn0sInBheXBhbCI6eyJiaWxsaW5nQWdyZWVtZW50c0VuYWJsZWQiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjpmYWxzZSwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImFsbG93SHR0cCI6dHJ1ZSwiZGlzcGxheU5hbWUiOiJHZW5lIENvbW1lcmNlIiwiY2xpZW50SWQiOiJBWWtyeWk5bXRlMjNadUtvNjJ0QVhueURpa0FZWENKY25NRGN2T3FzcEg4S21oT1JhU1A2dHF1M2VDTldFMy10d2kxWUlGWFYtNFh3b2liYiIsImJhc2VVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFzc2V0c1VybCI6Imh0dHBzOi8vY2hlY2tvdXQucGF5cGFsLmNvbSIsImRpcmVjdEJhc2VVcmwiOm51bGwsImVudmlyb25tZW50Ijoib2ZmbGluZSIsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsIm1lcmNoYW50QWNjb3VudElkIjoiZ2VuZS11c2QiLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifX0=",
                "ccTypesMapper": {
                    "american-express": "AE",
                    "discover": "DI",
                    "jcb": "JCB",
                    "mastercard": "MC",
                    "master-card": "MC",
                    "visa": "VI",
                    "maestro": "MI",
                    "uk-maestro": "MI",
                    "diners-club": "DN",
                    "unionpay": "UPD"
                },
                "countrySpecificCardTypes": [],
                "availableCardTypes": [
                    "AE",
                    "VI",
                    "MC",
                    "DI",
                    "JCB",
                    "DN",
                    "MI",
                    "UPD"
                ],
                "useCvv": true,
                "environment": "sandbox",
                "merchantId": "njwd3yg9dc85dkkq",
                "ccVaultCode": "braintree_cc_vault",
                "style": {
                    "shape": "rect",
                    "color": "gold"
                },
                "disabledFunding": {
                    "card": false,
                    "elv": false
                },
                "icons": {
                    "AE": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/cc/AE.png",
                        "alt": "AE",
                        "width": 48,
                        "height": 48
                    },
                    "VI": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/cc/VI.png",
                        "alt": "VI",
                        "width": 48,
                        "height": 48
                    },
                    "MC": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/cc/MC.png",
                        "alt": "MC",
                        "width": 48,
                        "height": 48
                    },
                    "DI": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/cc/DI.png",
                        "alt": "DI",
                        "width": 48,
                        "height": 48
                    },
                    "JCB": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/cc/JCB.png",
                        "alt": "JCB",
                        "width": 48,
                        "height": 48
                    },
                    "DN": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/cc/DN.png",
                        "alt": "DN",
                        "width": 50,
                        "height": 47
                    },
                    "MI": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/cc/MI.png",
                        "alt": "MI",
                        "width": 48,
                        "height": 48
                    },
                    "UPD": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/cc/UPD.png",
                        "alt": "UPD",
                        "width": 48,
                        "height": 48
                    },
                    "NONE": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/cc/NONE.png",
                        "alt": "NONE",
                        "width": 48,
                        "height": 48
                    }
                }
            },
            "braintree_cc_vault": {
                "cvvVerify": false
            },
            "braintree_googlepay": {
                "environment": "TEST",
                "clientToken": "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpGVXpJMU5pSXNJbXRwWkNJNklqSXdNVGd3TkRJMk1UWXRjMkZ1WkdKdmVDSXNJbWx6Y3lJNkltaDBkSEJ6T2k4dllYQnBMbk5oYm1SaWIzZ3VZbkpoYVc1MGNtVmxaMkYwWlhkaGVTNWpiMjBpZlEuZXlKbGVIQWlPakUzTXpJeE1qWTNOekVzSW1wMGFTSTZJbUUzTnprM01EZ3dMVEF4Wm1JdE5EWmhZeTA1WW1KbUxUZGhNamhsWTJObU1ETm1aU0lzSW5OMVlpSTZJbTVxZDJRemVXYzVaR000TldScmEzRWlMQ0pwYzNNaU9pSm9kSFJ3Y3pvdkwyRndhUzV6WVc1a1ltOTRMbUp5WVdsdWRISmxaV2RoZEdWM1lYa3VZMjl0SWl3aWJXVnlZMmhoYm5RaU9uc2ljSFZpYkdsalgybGtJam9pYm1wM1pETjVaemxrWXpnMVpHdHJjU0lzSW5abGNtbG1lVjlqWVhKa1gySjVYMlJsWm1GMWJIUWlPblJ5ZFdWOUxDSnlhV2RvZEhNaU9sc2liV0Z1WVdkbFgzWmhkV3gwSWwwc0luTmpiM0JsSWpwYklrSnlZV2x1ZEhKbFpUcFdZWFZzZENJc0lrSnlZV2x1ZEhKbFpUcEJXRThpWFN3aWIzQjBhVzl1Y3lJNmUzMTkuQ0lZMGdHUENJcE9WNWh1ZkVhR2hjZFFOTFRYUFlEaTZFQWtnQlhTTHdlX1F5TGgtSHBoUDFNaE9PVmh6bWJESV9hRUdubUlHZER6Uk40NjB4aHoza3ciLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvbmp3ZDN5ZzlkYzg1ZGtrcS9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJncmFwaFFMIjp7InVybCI6Imh0dHBzOi8vcGF5bWVudHMuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9ncmFwaHFsIiwiZGF0ZSI6IjIwMTgtMDUtMDgiLCJmZWF0dXJlcyI6WyJ0b2tlbml6ZV9jcmVkaXRfY2FyZHMiXX0sImNsaWVudEFwaVVybCI6Imh0dHBzOi8vYXBpLnNhbmRib3guYnJhaW50cmVlZ2F0ZXdheS5jb206NDQzL21lcmNoYW50cy9uandkM3lnOWRjODVka2txL2NsaWVudF9hcGkiLCJlbnZpcm9ubWVudCI6InNhbmRib3giLCJtZXJjaGFudElkIjoibmp3ZDN5ZzlkYzg1ZGtrcSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwidmVubW8iOiJvZmYiLCJjaGFsbGVuZ2VzIjpbImN2diJdLCJ0aHJlZURTZWN1cmVFbmFibGVkIjp0cnVlLCJhbmFseXRpY3MiOnsidXJsIjoiaHR0cHM6Ly9vcmlnaW4tYW5hbHl0aWNzLXNhbmQuc2FuZGJveC5icmFpbnRyZWUtYXBpLmNvbS9uandkM3lnOWRjODVka2txIn0sInBheXBhbEVuYWJsZWQiOnRydWUsImJyYWludHJlZV9hcGkiOnsidXJsIjoiaHR0cHM6Ly9wYXltZW50cy5zYW5kYm94LmJyYWludHJlZS1hcGkuY29tIiwiYWNjZXNzX3Rva2VuIjoiZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKRlV6STFOaUlzSW10cFpDSTZJakl3TVRnd05ESTJNVFl0YzJGdVpHSnZlQ0lzSW1semN5STZJbWgwZEhCek9pOHZZWEJwTG5OaGJtUmliM2d1WW5KaGFXNTBjbVZsWjJGMFpYZGhlUzVqYjIwaWZRLmV5SmxlSEFpT2pFM016SXhNalkzTlRJc0ltcDBhU0k2SWpJNE1qRTNNalF5TFRZNE16QXROR00xWlMxaVpXWmhMVGc0TmpFd1pXWTNORGxpTmlJc0luTjFZaUk2SW01cWQyUXplV2M1WkdNNE5XUnJhM0VpTENKcGMzTWlPaUpvZEhSd2N6b3ZMMkZ3YVM1ellXNWtZbTk0TG1KeVlXbHVkSEpsWldkaGRHVjNZWGt1WTI5dElpd2liV1Z5WTJoaGJuUWlPbnNpY0hWaWJHbGpYMmxrSWpvaWJtcDNaRE41Wnpsa1l6ZzFaR3RyY1NJc0luWmxjbWxtZVY5allYSmtYMko1WDJSbFptRjFiSFFpT25SeWRXVjlMQ0p5YVdkb2RITWlPbHNpZEc5clpXNXBlbVVpTENKdFlXNWhaMlZmZG1GMWJIUWlYU3dpYzJOdmNHVWlPbHNpUW5KaGFXNTBjbVZsT2xaaGRXeDBJaXdpUW5KaGFXNTBjbVZsT2tGWVR5SmRMQ0p2Y0hScGIyNXpJanA3ZlgwLk9uemQwOEFBOEdhSEg2bk1yb05NQi1melVZamp3bDVEdVZNU1RoMUQ0dGlTVW56VEJwZGlvWXNtMXlncjlDR1BHSXAxcUxYa0xzUzNjMlB3djE3WWlnIn0sInBheXBhbCI6eyJiaWxsaW5nQWdyZWVtZW50c0VuYWJsZWQiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjpmYWxzZSwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImFsbG93SHR0cCI6dHJ1ZSwiZGlzcGxheU5hbWUiOiJHZW5lIENvbW1lcmNlIiwiY2xpZW50SWQiOiJBWWtyeWk5bXRlMjNadUtvNjJ0QVhueURpa0FZWENKY25NRGN2T3FzcEg4S21oT1JhU1A2dHF1M2VDTldFMy10d2kxWUlGWFYtNFh3b2liYiIsImJhc2VVcmwiOiJodHRwczovL2Fzc2V0cy5icmFpbnRyZWVnYXRld2F5LmNvbSIsImFzc2V0c1VybCI6Imh0dHBzOi8vY2hlY2tvdXQucGF5cGFsLmNvbSIsImRpcmVjdEJhc2VVcmwiOm51bGwsImVudmlyb25tZW50Ijoib2ZmbGluZSIsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsIm1lcmNoYW50QWNjb3VudElkIjoiZ2VuZS11c2QiLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifX0=",
                "merchantId": "testmode",
                "cardTypes": [
                    "VISA",
                    "MASTERCARD",
                    "AMEX"
                ],
                "btnColor": 0,
                "paymentMarkSrc": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/GooglePay_AcceptanceMark_WhiteShape_RGB_60x36pt@4x.png",
                "vaultCode": "braintree_googlepay_vault",
                "icons": {
                    "ae": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/googlepay/ae.png",
                        "width": 46,
                        "height": 30,
                        "title": "Google Pay - American Express"
                    },
                    "di": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/googlepay/di.png",
                        "width": 46,
                        "height": 30,
                        "title": "Google Pay - Discover"
                    },
                    "mc": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/googlepay/mc.png",
                        "width": 46,
                        "height": 30,
                        "title": "Google Pay - MasterCard"
                    },
                    "vi": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/googlepay/vi.png",
                        "width": 46,
                        "height": 30,
                        "title": "Google Pay - Visa"
                    },
                    "googlepaymark": {
                        "url": "https://checkout-workshop.test/static/version1732037999/frontend/Magento/luma/en_US/PayPal_Braintree/images/GooglePay_AcceptanceMark_WhiteShape_RGB_60x36pt@4x.png",
                        "width": 46,
                        "height": 30,
                        "title": "Google Pay"
                    }
                }
            },
            "three_d_secure": {
                "enabled": false,
                "challengeRequested": false,
                "thresholdAmount": 0,
                "specificCountries": [],
                "ccVaultCode": "braintree_cc_vault",
                "useCvvVault": false,
                "ipAddress": "192.168.65.1"
            }
        }
    }
}

module.exports = {
    getConfiguration: configuration(),
};