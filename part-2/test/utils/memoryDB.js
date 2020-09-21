const MemoryDB = require('../../src/utils/memoryDB');

describe('part-2 /MemoryDB', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return a object', () => {
    const memoryDB = MemoryDB();
    expect(typeof memoryDB.db).to.be.equal('object');
  });

  it('should insert a value in db', () => {
    const memoryDB = MemoryDB();

    memoryDB.insert(1, 'value');
    const addedValue = memoryDB.get(1);
    expect(addedValue).to.be.equal('value');
  });

  it('should insert a error if key inst pass', () => {
    const memoryDB = MemoryDB();

    expect(() => {
      memoryDB.insert();
    }).throw('must be pass a key');
  });

  it('should insert a error if value inst pass', () => {
    const memoryDB = MemoryDB();

    expect(() => {
      memoryDB.insert(1);
    }).throw('must be pass a value, cannot be null');
  });

  it('should return a inserted value in db', () => {
    const memoryDB = MemoryDB();

    memoryDB.insert(123, 'value');
    memoryDB.insert(1234, 'value2');

    const addedValue = memoryDB.get(1234);
    expect(addedValue).to.be.equal('value2');
  });

  it('should return false if value isnt db', () => {
    const memoryDB = MemoryDB();

    memoryDB.insert(123, 'value');
    memoryDB.insert(1234, 'value2');

    const addedValue = memoryDB.get(444);
    expect(addedValue).to.be.equal(false);
  });
});
