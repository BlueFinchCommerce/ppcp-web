const createAssets = require('../lib/create-assets');

const namespace = 'ppcp_fastlane';
let ctx;
let paymentComponent;

function bindSubmitButton() {
  const btn = document.querySelector(ctx.buttonElement);
  
  if (!btn) return;
  
  const handler = async (evt) => {
    if (evt.type === 'keydown' && evt.key !== 'Enter') return;
    
    try {
      if (await ctx.onValidate() !== true) return;
      
      const { id: token } = await paymentComponent.getPaymentToken();
      if (!token) throw new Error('Could not obtain Fastlane payment token.');
      
      await ctx.createPayment(token);
      await ctx.onApprove?.();
    } catch (err) {
      console.error(err);
      ctx.handleErrors?.(err.message || err);
    }
  };
  
  btn.addEventListener('click', handler);
  btn.addEventListener('keydown', handler);
}

async function hydrateFastlane() {
  const paypalNs = window[`paypal_${namespace}`];
  if (!paypalNs?.Connect) {
    ctx.active?.(false);
    return;
  }
  
  try {
    const fastlaneInstance = await paypalNs.Connect({
      shippingAddressOptions: {
        allowedLocations: ctx.shippingAddressOptions,
      },
      styles: {
        root: {
          backgroundColor: ctx.styles.root.bg,
          errorColor: ctx.styles.root.errorColor,
          fontFamily: ctx.styles.root.fontFamily,
          fontSize: ctx.styles.root.fontSize,
          padding: ctx.styles.root.paddings,
          primaryColor: ctx.styles.root.primaryColor,
          textColor: ctx.styles.root.textColor,
        },
        input: {
          backgroundColor: ctx.styles.inputs.bg,
          borderColor: ctx.styles.inputs.borderColor,
          borderRadius: ctx.styles.inputs.borderRadius,
          borderWidth: ctx.styles.inputs.borderWidth,
          focusBorderColor: ctx.styles.inputs.focusBorderColor,
          textColor: ctx.styles.inputs.textColor,
        },
      },
    });
    
    paymentComponent = await fastlaneInstance.FastlanePaymentComponent({
      fields: ctx.fields,
      shippingAddress: ctx.shippingAddress,
    });
    
    await paymentComponent.render(ctx.containerSelector);
    bindSubmitButton();
    ctx.onReady?.({paymentComponent, fastlaneInstance});
  } catch (err) {
    console.error('Fastlane render failed:', err);
    ctx.handleErrors?.(err.message || err);
  }
}

function fastlanePayment(userContext) {
  ctx = userContext;
  if (!ctx || !ctx.containerSelector || !ctx.buttonElement) {
    throw new Error('fastlanePayment(): { containerSelector, buttonElement } are required.');
  }
  
  // ── Build SDK URL params ────────────────────────────────────────────────
  const params = {
    'client-id': ctx.environment === 'sandbox' ? ctx.sandboxClientId : ctx.productionClientId,
    components: 'buttons,fastlane',
    currency: ctx.currency,
  };
  
  if (ctx.environment === 'sandbox') {
    params['buyer-country'] = ctx.buyerCountry || 'US';
  }
  
  createAssets
    .create('https://www.paypal.com/sdk/js', params, namespace, ctx.pageType || 'checkout', '', ctx.clientToken)
    .then(hydrateFastlane);
}


fastlanePayment.teardown = async () => {
  try {
    await paymentComponent?.teardown?.();
    // eslint-disable-next-line no-empty
  } catch (_) {}
  paymentComponent = null;
};

module.exports = fastlanePayment;
