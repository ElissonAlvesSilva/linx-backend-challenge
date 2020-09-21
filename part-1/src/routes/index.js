const versionRoute = require('./version');
const healthRoute = require('./health');
const productRoute = require('./v1/product');

const routes = {
  versionRoute,
  healthRoute,
  productRoute,
};

module.exports = routes;
