[![CircleCI](https://dl.circleci.com/status-badge/img/gh/BlueFinchCommerce/ppcp-web/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/BlueFinchCommerce/ppcp-web/tree/master)

[![GNU General Public License Version 3](./assets/license-GPLv3.svg)](https://github.com/BlueFinchCommerce/ppcp-web/?tab=GPL-3.0-1-ov-file#readme)

![PPCP-web package Powered by BlueFinch](./assets/logo.svg)

# BlueFinch PPCP Web

bluefinch-ppcp-web is a supporting package for integrating PayPal PPCP functionality into BlueFinch Checkout for Magento 2. 
This package provides essential utilities for seamless interaction between your checkout module and PayPal PPCP.

## Requirements
- Magento 2.4.6 or higher
- Node 16 or higher
- [BlueFinch Checkout](https://github.com/bluefinchcommerce/module-checkout)
- [BlueFinch Checkout PPCP Module](https://github.com/bluefinchcommerce/module-checkout-ppcp)

## Installation
Ensure you have both BlueFinch Checkout and BlueFinch Checkout PPCP installed. 
Then, inside the module-checkout-ppcp/view/frontend/web/js/checkout directory, run:

npm install bluefinch-ppcp-web

This will install the necessary dependencies for integrating PayPal PPCP into your checkout module.

## Usage
This package is designed to be used within module-checkout-ppcp. 
Once installed, it enables PayPal PPCP functionality in your BlueFinch-powered checkout.

For further details, refer to the [BlueFinch Checkout PPCP Module documentation](https://github.com/bluefinchcommerce/module-checkout-ppcp).
