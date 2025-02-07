define((()=>{return e={844:(e,n,t)=>{const o=t(427),r="ppcp_apm_payments";let a,i,c,l;e.exports=function(e,n){if(!e||!n)throw new Error("APM payments requires both context and element.");a=e;const t={"client-id":a.productionClientId,intent:"capture",components:"buttons,marks,funding-eligibility,payment-fields",currency:a.currency};"sandbox"===a.environment&&(t["client-id"]=a.sandboxClientId,t["buyer-country"]=a.buyerCountry),o.create("https://www.paypal.com/sdk/js",t,r,a.pageType).catch((e=>{console.error("Error initializing APM Payments:",e)})),document.addEventListener("ppcpScriptLoaded",(e=>{e.detail===r&&function(e){if(!window[`paypal_${r}`])return;const n=window[`paypal_${r}`].FUNDING[e.toUpperCase()];i=window[`paypal_${r}`].Marks({fundingSource:n}),c=window[`paypal_${r}`].PaymentFields({fundingSource:n}),l=window[`paypal_${r}`].Buttons({fundingSource:n,createOrder:()=>a.createOrder(e),onApprove:()=>a.onApprove(e),onClick:a.onClick,onError:a.onError,onCancel:()=>a.onCancel(e)}),function(e){const n=document.getElementById(`paypal_${e}_mark`);if(!n)return;const t=0===n.childNodes.length;i.isEligible()&&n&&t&&i.render(n)}(e),function(e){const n=document.getElementById(`paypal_${e}_fields`);if(!n)return;const t=0===n.childNodes.length;c.isEligible()&&n&&t&&c.render(n)}(e),function(e){const n=document.getElementById(`paypal_${e}_button`);if(!n)return;const t=0===n.childNodes.length;l.isEligible()&&n&&t&&(l.render(n),a.isPaymentMethodAvailable(l.isEligible(),e))}(e)}(n)}))}},58:(e,n,t)=>{const o=t(844);e.exports=function(e,n){return new o(e,n)}},42:(e,n,t)=>{const o=t(427),r="ppcp_applepay";let a,i,c;function l(){const e=new window.ApplePaySession(4,c),n=window[`paypal_${r}`].Applepay();e.onvalidatemerchant=t=>{n.validateMerchant({validationUrl:t.validationURL}).then((n=>{e.completeMerchantValidation(n.merchantSession)})).catch((n=>{console.error(n),a.onClose(),e.abort()}))},e.onshippingcontactselected=n=>{a.onShippingContactSelect(n,e)},e.onshippingmethodselected=n=>{a.onShippingMethodSelect(n,e)},e.onpaymentauthorized=async t=>{a.onPaymentAuthorized(t,e,n)},e.oncancel=()=>{a.onClose()},a.onValidate().then((n=>{n?e.begin():e.abort()})).catch((n=>{console.error("Validation error:",n),e.abort()}))}e.exports=function(e,n){if(!e||!n)throw new Error("Apple Pay requires both context and element.");a=e,i=n;const t={"client-id":a.productionClientId,intent:a.intent,components:"applepay",currency:a.currency};"sandbox"===a.environment&&(t["client-id"]=a.sandboxClientId,t["buyer-country"]=a.buyerCountry),o.create("https://www.paypal.com/sdk/js",t,r,a.pageType).then((()=>new Promise(((e,n)=>"https:"!==window.location.protocol?(console.warn("PPCP Apple Pay requires your checkout be served over HTTPS"),void n(new Error("Apple Pay requires HTTPS."))):!0!==(window.ApplePaySession&&window.ApplePaySession.canMakePayments())?(console.warn("PPCP Apple Pay is not supported on this device/browser"),void n(new Error("Apple Pay is not supported on this device/browser."))):void window[`paypal_${r}`].Applepay().config().then((e=>e.isEligible?a.getPaymentRequest(e):(console.warn("PPCP Apple Pay is not eligible"),void n(new Error("Apple Pay is not eligible."))))).then((n=>{c=n,e()})).catch((e=>{console.error("Error while fetching Apple Pay configuration:",e),n(new Error("Error fetching Apple Pay configuration.")),a.onClose()})))))).then((()=>new Promise((e=>{const n=document.createElement("apple-pay-button");n.onclick=l,document.getElementById(i).appendChild(n),e()}))))}},981:(e,n,t)=>{const o=t(42),r=t(427);e.exports=function(e,n){return r.create("https://applepay.cdn-apple.com/jsapi/v1.1.0/apple-pay-sdk.js",{},"",e.pageType),new o(e,n)}},154:(e,n,t)=>{const o=t(427),r="ppcp_card";let a,i;e.exports=function(e,n){if(!e||!n)throw new Error("Card Payments requires both context and element.");a=e,i=n;const t={"client-id":a.productionClientId,intent:a.intent,components:"card-fields",currency:a.currency};"sandbox"===a.environment&&(t["client-id"]=a.sandboxClientId,t["buyer-country"]=a.buyerCountry),o.create("https://www.paypal.com/sdk/js",t,r,a.pageType).then((()=>{window[`paypal_${r}`]?function(e){const n=a.cardFields.numberField,t=a.cardFields.cvvField,o=a.cardFields.expiryField;if(e.isEligible()){const r=document.querySelector(n.id),c=document.querySelector(t.id),l=document.querySelector(o.id),s=e.NumberField({placeholder:n.placeholder,inputEvents:{onBlur:e=>n.inputEvents.blur(e,r),onChange:()=>n.inputEvents.change(),onFocus:()=>{}}}),p=e.CVVField({placeholder:t.placeholder,inputEvents:{onBlur:e=>t.inputEvents.blur(e,c),onChange:()=>t.inputEvents.change(),onFocus:()=>{}}}),d=e.ExpiryField({placeholder:o.placeholder,inputEvents:{onBlur:e=>o.inputEvents.blur(e,l),onChange:()=>o.inputEvents.change(),onFocus:()=>{}}});""===r.innerHTML.trim()&&s.render(n.id),""===c.innerHTML.trim()&&p.render(t.id),""===l.innerHTML.trim()&&d.render(o.id),document.querySelector(i).addEventListener("click",(async()=>{try{const n=await a.onValidate(),t=await e.getState();if(t.isFormValid&&n)try{await e.submit()}catch(e){console.error(e),a.handleErrors("Cannot validate payment.")}else a.handleErrors(t.errors)}catch(e){console.error("Validation error:",e)}}))}}(window[`paypal_${r}`].CardFields({createOrder:()=>a.createOrder(),onApprove:()=>a.onApprove(),style:a.style})):a.active(!1)}))}},56:(e,n,t)=>{const o=t(427);let r,a,i;function c(e){r.onValidate().then((n=>{if(!n)return!1;const t={...e},o=["PAYMENT_AUTHORIZATION"],i=r.onPaymentDataChanged;i&&o.push("SHIPPING_ADDRESS","SHIPPING_OPTION"),t.allowedPaymentMethods=e.allowedPaymentMethods,t.transactionInfo={countryCode:e.countryCode,currencyCode:r.transactionInfo.currencyCode,totalPriceStatus:r.transactionInfo.totalPriceStatus,totalPrice:r.transactionInfo.totalPrice},t.merchantInfo=e.merchantInfo,t.shippingAddressRequired=!!i,t.shippingAddressParameters={phoneNumberRequired:!!i},t.emailRequired=!0,t.shippingOptionRequired=!!i,t.callbackIntents=o,delete t.countryCode,delete t.isEligible,a.loadPaymentData(t).catch((e=>{"CANCELED"===e.statusCode||"AbortError"===e.name?(console.warn("User canceled the Google Pay payment UI"),r.onCancel&&r.onCancel()):(console.error("Google Pay Error:",e),r.onError&&r.onError(e))}))})).catch((e=>{console.error("Validation error:",e)}))}e.exports=function(e,n){if(!e||!n)throw new Error("Google Payments requires both context and element.");if("function"!=typeof e.placeOrder)return console.error("PPCP Google Pay Context passed does not provide a placeOrder method",e);r=e;const t={"client-id":r.productionClientId,intent:r.intent,components:"googlepay",currency:r.transactionInfo.currencyCode};"sandbox"===r.environment&&(t["client-id"]=r.sandboxClientId,t["buyer-country"]=r.buyerCountry),o.create("https://www.paypal.com/sdk/js",t,"ppcp_googlepay",r.pageType).then((()=>new Promise(((e,n)=>{if("https:"!==window.location.protocol)return console.warn("Google Pay requires your checkout be served over HTTPS"),void n(new Error("Insecure protocol: HTTPS is required for Google Pay"));i=window.paypal_ppcp_googlepay.Googlepay(),i.config().then((t=>{t.isEligible?(t.allowedPaymentMethods.forEach((e=>{e.parameters.billingAddressParameters.phoneNumberRequired=!0})),e(t)):n(new Error("Device not eligible for Google Pay"))})).catch((e=>{n(e)}))})))).then((e=>function(e){const n={onPaymentAuthorized:e=>r.onPaymentAuthorized(e,i)};return r.onPaymentDataChanged&&(n.onPaymentDataChanged=n=>r.onPaymentDataChanged(n,e)),a=new window.google.payments.api.PaymentsClient({environment:"sandbox"===r.environment?"TEST":"PRODUCTION",paymentDataCallbacks:n}),a.isReadyToPay({apiVersion:e.apiVersion,apiVersionMinor:e.apiVersionMinor,allowedPaymentMethods:e.allowedPaymentMethods}).then((n=>n.result?e:null))}(e))).then((e=>function(e){return a.createButton({allowedPaymentMethods:e.allowedPaymentMethods,buttonColor:r.button.buttonColor.toLowerCase(),buttonSizeMode:"fill",onClick:r.beforeOnClick?()=>r.beforeOnClick().then((()=>c(e))):()=>c(e)})}(e))).then((e=>{e&&document.getElementById(n).appendChild(e)})).catch((e=>{console.error("Error initializing Google Pay Button:",e)}))}},958:(e,n,t)=>{const o=t(56),r=t(427);e.exports=function(e,n){return r.create("https://pay.google.com/gp/p/js/pay.js",{},"ppcp_pay",e.pageType),new o(e,n)}},497:(e,n,t)=>{const o=t(58),r=t(981),a=t(154),i=t(958),c=t(740),l=t(139),s=t(936);e.exports={apmPayments:o,applePayment:r,cardPayment:a,googlePayment:i,paypalButtons:c,paypalMessages:l,venmoPayment:s}},427:e=>{const n={};e.exports={create:(e,t,o,r,a)=>{let i=e;t&&(i=new URL(i),i.search=new URLSearchParams(t),i=decodeURIComponent(i.href));const c=((e,n,t="")=>e+n+t)(i,o,a),l=()=>{const e=new CustomEvent("ppcpScriptLoaded",{detail:o});document.dispatchEvent(e)};return n[c]?(l(),n[c]):(n[c]=new Promise((e=>{const n=document.createElement("script");n.src=i,n.dataset.namespace=`paypal_${o}`,n.dataset.partnerAttributionId="GENE_PPCP",n.dataset.pageType=r||"checkout",a&&(n.dataset.userIdToken=a),n.onload=()=>{l(),e()},document.head.appendChild(n)})),n[c])}}},740:(e,n,t)=>{const o=t(177);e.exports=function(e,n){return new o(e,n)}},177:(e,n,t)=>{const o=t(427),r="ppcp_paypal";let a,i,c;const l={};e.exports=function(e,n){if(!e||!n)throw new Error("PaypalButtons requires both context and element.");a=e,i=n;const t={"client-id":a.productionClientId,intent:a.intent,components:"buttons",currency:a.currency};"sandbox"===a.environment&&(t["client-id"]=a.sandboxClientId,t["buyer-country"]=a.buyerCountry),a.isPayLaterMessagingEnabled&&(t.components+=",messages"),a.isPayLaterEnabled&&(t["enable-funding"]="paylater"),o.create("https://www.paypal.com/sdk/js",t,r,a.pageType).then((()=>new Promise((e=>{const n=[window[`paypal_${r}`].FUNDING.PAYPAL];a.isPayLaterEnabled&&n.push(window[`paypal_${r}`].FUNDING.PAYLATER),c=n.filter((e=>{const n=`${i}-${e}`;return document.getElementById(n)?document.getElementById(n):(console.error("Paypal button element does not exist",n),null)})),e()})))).then((()=>new Promise((e=>{c.forEach((e=>{const n={createOrder:a.createOrder,onApprove:a.onApprove,onClick:a.onClick,onCancel:a.onCancel,onError:e=>a.onError(e),onShippingAddressChange:e=>a.onShippingAddressChange(e),onShippingOptionsChange:e=>a.onShippingOptionsChange(e)};n.fundingSource=e,n.style=function(e){const{[e]:{buttonColor:n,buttonLabel:t,buttonShape:o}}=a.buttonStyles||{};return{color:n,label:t,shape:o,height:a.buttonHeight?a.buttonHeight:40}}(e),n.message=function(e){if("paylater"===e&&a.isPayLaterMessagingEnabled&&"checkout"===a.pageType){const e=a.messageStyles.text||{};return{align:e.align,amount:a.amount,color:"black"!==e.color||"white"!==e.color?"black":e.color}}return null}(e),l[e]=window[`paypal_${r}`].Buttons(n)})),e()})))).then((()=>{Object.keys(l).forEach((e=>{const n=document.getElementById(`${i}-${e}`),t=0===n.childNodes.length;l[e].isEligible()&&n&&t&&l[e].render(n),a.isPaymentMethodEligible(l[e].isEligible(),e)}))})).catch((e=>{console.error("Error initializing PayPal Buttons:",e)}))}},139:(e,n,t)=>{const o=t(397);e.exports=function(e,n){return new o(e,n)}},397:(e,n,t)=>{const o=t(427),r="ppcp_paypal_messages";let a,i;const c={components:"messages"};function l(){if(window[`paypal_${r}`].Messages){const e=window[`paypal_${r}`].Messages(a.messageConfig),n=document.getElementById(i);e.render(n)}else o.create("https://www.paypal.com/sdk/js",c,r,a.pageType).then((()=>l()))}e.exports=function(e,n){if(!e||!n)throw new Error("PaypalElements requires both context and element.");a=e,i=n,c["client-id"]=a.clientId,l()}},936:(e,n,t)=>{const o=t(834);e.exports=function(e,n){return new o(e,n)}},834:(e,n,t)=>{const o=t(427),r="ppcp_paypal_venmo";let a,i,c;e.exports=function(e,n){if(!e||!n)throw new Error("Venmo button requires both context and element.");a=e,i=n;const t={"client-id":a.productionClientId,intent:a.intent,components:"buttons",currency:a.currency,"enable-funding":"venmo"};"sandbox"===a.environment&&(t["client-id"]=a.sandboxClientId,t["buyer-country"]=a.buyerCountry),o.create("https://www.paypal.com/sdk/js",t,r,a.pageType).then((()=>new Promise((e=>{const n=window[`paypal_${r}`].FUNDING.VENMO,t={createOrder:a.createOrder,onApprove:a.onApprove,onClick:a.onClick,onError:a.onError,onCancel:a.onCancel,fundingSource:n};t.style=function(){const e=a.buttonStyles;return{color:"gold"===e.buttonColor?"blue":e.buttonColor,label:e.buttonLabel,shape:e.buttonShape,height:a.buttonHeight?a.buttonHeight:40}}(),c=window[`paypal_${r}`].Buttons(t),e()})))).then((()=>{const e=document.getElementById(i),n=0===e.childNodes.length;c.isEligible()&&e&&n&&c.render(e),a.isPaymentMethodEligible(c.isEligible())})).catch((e=>{console.error("Error initializing Venmo Button:",e)}))}}},n={},function t(o){var r=n[o];if(void 0!==r)return r.exports;var a=n[o]={exports:{}};return e[o](a,a.exports,t),a.exports}(497);var e,n}));