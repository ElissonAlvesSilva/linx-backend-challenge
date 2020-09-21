const express = require('express');

const errorHandler = require('./middlewares/error-handler');
const { applyMiddlewares } = require('./middlewares/index');
const {
  versionRoute,
  healthRoute,
  productRoute,
} = require('./routes');

const app = express();
applyMiddlewares(app);

app.use('/version', versionRoute);

app.use('/health', healthRoute);

app.use('/v1/products', productRoute);

app.use(errorHandler);

module.exports = app;
