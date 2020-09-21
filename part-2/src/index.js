const program = require('commander');
const path = require('path');

const File = require('./utils/file');
const logger = require('./utils/logger');
const JSONFormatter = require('./formatters/JSONFormatter');
const Businesses = require('./businesses');

async function run() {
  if (!program.input_dump || !program.output) {
    help();
    process.exit();
  }

  const unzipResponse = await File.unzipFile(program.input_dump);

  if (!unzipResponse) {
    return 'Error to unzip file';
  }

  const pathFileUnziped = path.dirname(program.input_dump);

  try {
    const dumpFile = await File.getStuff(`${pathFileUnziped}/input-dump`);
    const parsedDump = JSONFormatter.readFormatter(dumpFile);

    logger.info('[ START ] - SANITIZING DUMP');
    const sanitizedData = await Businesses.sanitize(JSON.parse(parsedDump));
    const response = JSONFormatter.responseFormatter(sanitizedData);
    logger.info('[ END ] - SANITIZING DUMP');

    File.writeFile(response);
  } catch (error) {
    logger.err(error.message);
    process.exit();
  }
  return null;
}

const help = () => {
  logger.info(`
      Usage: node part-2/src/index.js -i <PATH_INPUT> -o <PATH_OUTPUT>
      [Options]:
        -i, --input-dump <input-dump> Input dump
        -o, --output <output> Output
  `);
};

program
  .option('-i, --input_dump <input-dump>', 'Input dump')
  .option('-o, --output <output>', 'Output')
  .option('-h, --help [help]', 'help')
  .parse(process.argv);

run();
