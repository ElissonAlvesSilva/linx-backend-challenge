const { expect } = require('chai');
const rewire = require('rewire');

const busApp = rewire('../../src/businesses');
const Businesses = busApp.__get__('Businesses');

describe('PART-2', () => {
  describe('part-2 /Businesses', () => {
    let sandbox;
    let mockDump;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      mockDump = [
        { productId: 'pid482', image: 'http://localhost:4567/images/167410.png' },
        { productId: 'pid1613', image: 'http://localhost:4567/images/122577.png' },
        { productId: 'pid7471', image: 'http://localhost:4567/images/177204.png' },
        { productId: 'pid482', image: 'http://localhost:4567/images/177204.png' },
      ];
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return a empty array if inst pass value', async () => {
      const response = await Businesses.sanitize();

      expect(response.length).to.equal(0);
    });

    it('should return a sanitized response', async () => {
      const stub = sandbox.stub();
      stub.returns(Promise.resolve(true));
      const unset = busApp.__set__('isValidImage', stub);

      const response = await Businesses.sanitize(mockDump);
      expect(response).to.deep.equal([
        {
          productId: 'pid482',
          images: [
            'http://localhost:4567/images/167410.png',
            'http://localhost:4567/images/177204.png',
          ],
        },
        {
          productId: 'pid1613',
          images: ['http://localhost:4567/images/122577.png'],
        },
        {
          productId: 'pid7471',
          images: ['http://localhost:4567/images/177204.png'],
        },
      ]);
      unset();
    });
  });
});
