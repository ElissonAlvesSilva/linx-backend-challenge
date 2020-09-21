const ProductBusinesses = require('../../../businesses/v1/product');
const logger = require('../../../utils/logger');

const ProductController = {
  async handle(req, res, next) {
    try {
      const data = await ProductBusinesses.handle(req.body);
      return res.status(data.httpCode).json(data.response);
    } catch (e) {
      logger.error('Product Controller:', e.message);
      logger.debug(e);
      // error handler middleware
      return next(e);
    }
  },
};

module.exports = ProductController;
