const { Joi } = require('celebrate');
const { throwBadRequest } = require('../../../utils/error/bad-request');

const product = Joi.object().keys({
  id: Joi.number().required(),
  name: Joi.string().required(),
});

// validation body
module.exports = {
  body: Joi.object({
    data: Joi.array().items(product).required(),
  }).error((errors) => {
    if (errors[0]) {
      let fields = [];
      if (errors[0].path) {
        fields = errors[0].path;
      }
      // throw bad request with default message
      throwBadRequest({
        fields,
      });
    }
  }),
};
