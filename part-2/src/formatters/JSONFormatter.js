const JSONFormatter = {
  readFormatter(dumpFile = []) {
    const dump = dumpFile.split('\n').join(',');

    const JSONFormatted = JSON.parse(
      JSON.stringify(`[${dump.substring(0, dump.length - 1)}]`),
    );

    return JSONFormatted;
  },
  responseFormatter(dump = []) {
    if (dump) {
      return JSON.stringify(dump).substring(1).slice(0, -1).replace(/},/g, '}\n');
    }
    return dump;
  },
};

module.exports = JSONFormatter;
