const Joi = require('@hapi/joi');

function validateUser(user) {
  const schema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(6)
      .max(20)
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/) // At least 1 special char, number, and capital letter
      .required(),
    cart: Joi.array(),
    orders: Joi.array(),
    contact: Joi.number(),
    picture: Joi.string(),
  });

  return schema.validate(user);
}

module.exports = { validateUser };