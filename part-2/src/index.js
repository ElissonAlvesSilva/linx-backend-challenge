const program = require('commander');
const path = require('path');

const File = require('./utils/file');
const logger = require('./utils/logger');
const Strings = require('./utils/strings');
const JSONFormatter = require('./formatters/JSONFormatter');
const ImageService = require('./services/image');
const MemoryDB = require('./utils/memoryDB');

const db = MemoryDB();

const isValidImage = async (url) => {
  const key = Strings.hashCode(url);
  const inArray = db.get(key);

  if (inArray && inArray === 200) {
    return true;
  }

  try {
    const response = await ImageService.get(url);

    db.insert(key, response.status);
    return true;
  } catch (error) {
    db.insert(key, error.response.status);
    return false;
  }
};

const sanitize = async (dump = []) => {
  const response = [];

  for await (const value of dump) {
    const { productId, image } = value;
    const isInArrayIndex = response.findIndex((item) => item.productId === productId);
    if (isInArrayIndex > 0) {
      if (response[isInArrayIndex].images.length < 3) {
        const isValid = await isValidImage(image);
        if (isValid) {
          response[isInArrayIndex].images.push(image);
        }
      }
    } else {
      const isValid = await isValidImage(image);

      if (isValid) {
        const obj = {
          productId,
          images: [image],
        };
        response.push(obj);
      } else {
        const obj = {
          productId,
          images: [],
        };
        response.push(obj);
      }
    }
  }

  return response;
};

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
    const sanitizedData = await sanitize(JSON.parse(parsedDump));
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
