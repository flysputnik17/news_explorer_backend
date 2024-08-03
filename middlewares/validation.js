const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error("string.email");
};
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'the "email" field must be a valid email',
    }),
    password: Joi.string().required().min(8).message({
      "string.min": 'The minimum length of the "password" field is 8',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'the "email" field must be a valid email',
    }),
    password: Joi.string().required().min(8).message({
      "string.min": 'The minimum length of the "password" field is 8',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().hex().length(24).required(),
  }),
});

module.exports.validateNewsBody = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().messages({
      "string.empty": 'The "keyword" is missing',
    }),
    title: Joi.string().required().messages({
      "string.empty": 'The "title" is missing',
    }),
    description: Joi.string().required().messages({
      "string.empty": 'The "description" is missing',
    }),
    publishedAt: Joi.string().required().messages({
      "string.empty": 'The "date" is missing',
    }),
    source: Joi.string().required().messages({
      "string.empty": 'The "source" is missing',
    }),
    url: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "urlToImage" is missing',
      "string.uri": 'the "urlToImage"  must be a valid url',
    }),
    urlToImage: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "urlToImage" is missing',
      "string.uri": 'the "urlToImage"  must be a valid url',
    }),
  }),
});
