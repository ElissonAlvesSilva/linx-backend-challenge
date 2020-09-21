const { Router } = require('express');
const { celebrate } = require('celebrate');

const validationBody = require('./validation');
const product = require('../../../controllers/v1/product');

const router = new Router({ mergeParams: true });

const joiOptions = {
  allowUnknown: true,
};

/**
 * Get Joi Schema query and using celebrate to create a validation middleware
 * to query string
 * @param {Object} req - Request object
 * @param {Object} res - Response bject
 * @param {Object} next - Next object
 */
const validateMiddleware = (req, res, next) => {
  const schema = validationBody;

  celebrate(schema, joiOptions)(req, res, next);
};

router.post(
  '/',
  validateMiddleware,
  product.handle,
);

module.exports = router;
