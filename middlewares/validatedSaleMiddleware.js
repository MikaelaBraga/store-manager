const { getById } = require('../models/productModel');

const errorMessages = {
  productRequired: { message: '"product_id" is required' },
  quantityRequired: { message: '"quantity" is required' },
  quantityMin: { message: '"quantity" must be a number larger than or equal to 1' },
  suchAmount: { message: 'Such amount is not permitted to sell' },
};

const validatedFieldProductId = (req, res, next) => {
  const sales = req.body;

  const existsFieldProductId = sales.every((sale) => sale.product_id);

  if (!existsFieldProductId) return res.status(400).json(errorMessages.productRequired);

  next();
};

const validateFieldQuantity = (req, res, next) => {
  const sales = req.body;

  const quantity = sales.some((sale) => typeof sale.quantity === 'string' || sale.quantity <= 0);
  if (quantity) return res.status(422).json(errorMessages.quantityMin);

  const existsFieldQuantity = sales.every((sale) => sale.quantity);
  if (!existsFieldQuantity) return res.status(400).json(errorMessages.quantityRequired);

  next();
};

const validateQuantityProduct = (req, res, next) => {
  const sales = req.body;
  // console.log(sales);

  sales.forEach(async (sale) => {
    const product = await getById(sale.product_id);
    // console.log(product);

    if (product.quantity < sale.quantity) return res.status(422).json(errorMessages.suchAmount);
  });

  next();
};

module.exports = {
  validatedFieldProductId,
  validateFieldQuantity,
  validateQuantityProduct,
};
