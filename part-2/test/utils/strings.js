const { expect } = require('chai');
const Strings = require('../../src/utils/strings');

describe('PART-2', () => {
  describe('part-2 /Strings', () => {
    let sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return a number hash', () => {
      const hash = Strings.hashCode('abc');

      expect(typeof hash).to.be.equal('number');
    });

    it('should return a error if empty string', () => {
      expect(() => {
        Strings.hashCode();
      }).to.throw('must be pass a string');
    });
  });
});
