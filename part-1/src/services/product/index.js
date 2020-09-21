const ProductClient = require('../../clients/product');
const logger = require('../../utils/logger');

const ProductService = {
  async exec(params) {
    let productResponse = '';
    try {
      productResponse = await ProductClient.exec(params);
    } catch (error) {
      logger.error(error);
      productResponse = {
        error: true,
        message: error.message,
      };
    }

    return productResponse;
  },
};

module.exports = ProductService;
