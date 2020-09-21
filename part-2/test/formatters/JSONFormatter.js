const JSONFormatter = require('../../src/formatters/JSONFormatter');
const File = require('../../src/utils/file');

describe('part-2 /JSON Formatter', () => {
  let sandbox;
  let dumpMock;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return a error if dumpfile is empty', () => {
    const Formatter = JSONFormatter;

    expect(() => {
      Formatter.readFormatter();
    }).to.throw('must be pass a value');
  });

  it('should return a formatted data', async () => {
    dumpMock = await File.getStuff(`${process.cwd()}/part-2/test/__mock__/input-dump`);

    const arrayOfObject = JSONFormatter.readFormatter(dumpMock);

    expect(JSON.parse(arrayOfObject)).to.deep.equal(
      [
        { productId: 'pid482', image: 'http://localhost:4567/images/167410.png' },
        { productId: 'pid1613', image: 'http://localhost:4567/images/122577.png' },
        { productId: 'pid7471', image: 'http://localhost:4567/images/177204.png' },
      ],
    );
  });

  it('should return a formatted response', () => {
    dumpMock = [
      { productId: 'pid482', image: 'http://localhost:4567/images/167410.png' },
      { productId: 'pid1613', image: 'http://localhost:4567/images/122577.png' },
    ];

    const formattedResponse = JSONFormatter.responseFormatter(dumpMock);
    // eslint-disable-next-line max-len
    expect(formattedResponse).to.equal('{"productId":"pid482","image":"http://localhost:4567/images/167410.png"}\n{"productId":"pid1613","image":"http://localhost:4567/images/122577.png"}');
  });
});
