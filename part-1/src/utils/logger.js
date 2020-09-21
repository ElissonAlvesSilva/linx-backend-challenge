const pino = require('pino');
const config = require('./config');

const level = 'info';
console.log(level);

module.exports = pino({ level });
