const joi = require('joi');

const productId = 'product_id';

// validação joi para array https://stackoverflow.com/questions/42656549/joi-validation-of-array
const saleSchema = joi.array().items(joi.object({
  [productId]: joi.number().required(),
  quantity: joi.number().min(1).required().messages({
    'number.min': '"quantity" must be a number larger than or equal to 1',
    'number.base': '"quantity" must be a number larger than or equal to 1',
  }),
}));

const validatedSaleSchema = (sales) => {
  const { error } = saleSchema.validate(sales);

  if (error) {
    throw error;
  }
};

module.exports = { validatedSaleSchema };
