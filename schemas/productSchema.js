const joi = require('joi');

const productSchema = joi.object({
  name: joi.string().min(5).required(),
  quantity: joi.number().min(1).required().messages({
    'number.min': '"quantity" must be a number larger than or equal to 1',
    'number.base': '"quantity" must be a number larger than or equal to 1',
  }),
});

const validateProductSchema = ({ name, quantity }) => {
  const { error } = productSchema.validate({ name, quantity });

  if (error) {
    throw error;
  }
};

module.exports = { validateProductSchema };
