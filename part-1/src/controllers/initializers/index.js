const redisClient = require('../../clients/redis');
const database = require('./database');

const initilizer = async () => {
  await database();

  await redisClient.connect();
};

module.exports = initilizer;
