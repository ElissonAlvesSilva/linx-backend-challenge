const fs = require('fs');
const tar = require('tar');
const { promisify } = require('util');
const logger = require('./logger');
const { NAME_RESPONSE_DUMP } = require('./constants');

const readDump = promisify(fs.readFile);

const File = {
  async unzipFile(pathfile) {
    try {
      logger.info('[ START ] - EXTRACTING FILE');
      await tar.extract({
        file: pathfile,
        cwd: '.',
      });
      logger.info('[ END ] - EXTRACTING FILE');

      return true;
    } catch (error) {
      logger.err(error.message);
      return false;
    }
  },
  getStuff(file) {
    return readDump(file, 'utf-8');
  },
  writeFile(data) {
    logger.info('[ START ] - CREATE FILE RESPONSE');
    fs.writeFileSync(`${process.cwd()}/${NAME_RESPONSE_DUMP}`, data);
    logger.info('[ END ] - CREATE FILE RESPONSE');
  },
};

module.exports = File;
