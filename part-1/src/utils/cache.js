const _ = require('lodash');
const hash = require('object-hash');

const redisClient = require('../clients/redis');
const logger = require('./logger');

const Cache = {
  get({ key }) {
    const redis = redisClient.getRedis();

    return redis
      .get(key)
      .then((data) => {
        if (!_.isEmpty(data) && data) {
          return JSON.parse(data);
        }
        return null;
      });
  },
  set({ key, value, ttl }) {
    const redis = redisClient.getRedis();
    let setParams = [key, JSON.stringify(value)];

    if (ttl) {
      setParams = setParams.concat(['EX', ttl]);
    }

    return redis
      .set(...setParams)
      .catch((err) => (
        logger.debug(`Failed setting the key ${key}:`, err.message)
      ));
  },
  generateCacheKey(data) {
    if (!_.isEmpty(data)) {
      const key = hash(data);
      return key;
    }
    return '';
  },
};

module.exports = Cache;
