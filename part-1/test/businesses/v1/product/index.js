const { expect } = require('chai');
const ProductBusinesses = require('../../../../src/businesses/v1/product');
const Cache = require('../../../../src/utils/cache');
const RedisClient = require('../../../../src/clients/redis');
const ProductService = require('../../../../src/services/product');

describe('PART-1', () => {
  describe('ProductBusinesses', () => {
    let sandbox;
    let mockProduct;

    beforeEach(() => {
      sandbox = sinon.createSandbox();

      mockProduct = [
        {
          id: 1,
          name: 'camisa',
        },
        {
          id: 2,
          name: 'camisa nike',
        },
      ];
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return a error if pass a empty data', async () => {
      try {
        await ProductBusinesses.handle({ data: [] });
      } catch (error) {
        expect(error.message).to.be.eql('Must be pass a value');
      }
    });

    it('should return a success response', async () => {
      sandbox.stub(RedisClient, 'getRedis').returns(null);

      sandbox.stub(Cache, 'get').returns(
        Promise.resolve(null),
      );

      sandbox.stub(Cache, 'set').returns(
        Promise.resolve(null),
      );

      sandbox.stub(ProductService, 'exec')
        .onFirstCall().returns({
          id: 1,
          name: 'camisa',
        })
        .onSecondCall()
        .returns({
          id: 2,
          name: 'camisa nike',
        });

      const response = await ProductBusinesses.handle({ data: mockProduct });

      expect(response).to.deep.equal({
        httpCode: 200,
        response: {
          message: 'updated products',
          products: mockProduct,
        },
      });
    });

    it('should return a error if  an error occurred while registering ', async () => {
      sandbox.stub(RedisClient, 'getRedis').returns(null);

      sandbox.stub(Cache, 'get').returns(
        Promise.resolve(null),
      );

      sandbox.stub(Cache, 'set').returns(
        Promise.resolve(null),
      );

      sandbox.stub(ProductService, 'exec').returns(
        // eslint-disable-next-line prefer-promise-reject-errors
        Promise.reject(new Error('Error')),
      );

      const response = await ProductBusinesses.handle({ data: mockProduct });
      expect(response).to.deep.equal({
        httpCode: 500,
        response: {
          message: 'Erro to update products',
          error: 'Error',
        },
      });
    });

    it('should return a error if key is with lock in cache', async () => {
      sandbox.stub(RedisClient, 'getRedis').returns(null);

      sandbox.stub(Cache, 'get').returns(
        Promise.resolve('abc'),
      );

      const response = await ProductBusinesses.handle({ data: mockProduct });

      expect(response).to.deep.equal({
        httpCode: 403,
        response: {
          message: 'Forbidden',
        },
      });
    });
  });
});
