const _ = require('lodash');
const ProductService = require('../../../services/product');
const RequestError = require('../../../utils/error/request-error');
const Cache = require('../../../utils/cache');
const conf = require('../../../utils/config');

const lockTtl = conf.get('config:ttlLock');

const ProductBusinesses = {
  async handle({ data }) {
    let httpCode = 200;
    let response = '';
    let cacheKey = '';
    const updatedProduct = [];

    if (_.isEmpty(data)) {
      throw new RequestError({
        message: 'Must be pass a value',
      });
    }

    cacheKey = Cache.generateCacheKey(data);
    const cacheResponse = await Cache.get({ key: cacheKey });

    if (cacheResponse) {
      httpCode = 403;
      response = {
        message: 'Forbidden',
      };

      return {
        httpCode,
        response,
      };
    }

    try {
      for await (const item of data) {
        const resp = await ProductService.exec(item);
        updatedProduct.push(resp);
      }
    } catch (error) {
      httpCode = 500;

      response = {
        message: 'Erro to update products',
        error: error.message,
      };

      return {
        httpCode,
        response,
      };
    }

    response = {
      message: 'updated products',
      products: updatedProduct,
    };

    Cache.set({
      key: cacheKey,
      value: 'lock',
      ttl: lockTtl,
    });

    return {
      httpCode,
      response,
    };
  },
};

module.exports = ProductBusinesses;
