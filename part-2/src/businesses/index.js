const MemoryDB = require('../utils/memoryDB');
const ImageService = require('../services/image');
const Strings = require('../utils/strings');

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

const Businesses = {
  async sanitize(dump = []) {
    const response = [];

    for await (const value of dump) {
      const { productId, image } = value;
      const isInArrayIndex = response.findIndex((item) => item.productId === productId);

      if (isInArrayIndex >= 0) {
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
  },
};

module.exports = Businesses;
