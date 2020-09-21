const _ = require('lodash');

const Product = require('../../models/Product');

const ProductClient = {
  async exec(params) {
    const {
      id,
    } = params;

    let product = '';

    product = await Product.findOne({ id });
    if (_.isEmpty(product)) {
      product = await Product.create(params);
      return product;
    }

    product = await Product.updateOne({ id }, params);
    return product;
  },
};

module.exports = ProductClient;
