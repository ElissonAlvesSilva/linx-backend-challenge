const axios = require('axios');

const ImageService = {
  get(url) {
    return axios(url);
  },
};

module.exports = ImageService;
