const { log, error } = console;

const Logger = {
  info(message = '') {
    log('\x1b[32m', message);
  },
  err(err = '') {
    error('\x1b[37m%s\x1b[41m', err);
  },
};

module.exports = Logger;
