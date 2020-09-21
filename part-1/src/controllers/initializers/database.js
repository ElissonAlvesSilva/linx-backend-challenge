const mongoose = require('mongoose');

const conf = require('../../utils/config');
const logger = require('../../utils/logger');

const host = conf.get('mongo:host');
const username = conf.get('mongo:username');
const password = conf.get('mongo:password');
const port = conf.get('mongo:port');
const database = conf.get('mongo:database');
const options = conf.get('mongo:options');

const url = `mongodb://${username}:${password}@${host}:${port}/${database}`;

// connect to database
const connectToMongo = async () => {
  try {
    await mongoose.connect(url, options);
    logger.info('Connected to Mongo database');
  } catch (error) {
    logger.error(`Error to connect to Mongo database - ${error}`);
  }
};

module.exports = connectToMongo;
