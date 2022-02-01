const errorMessages = {
  productRequired: { message: '"product_id" is required' },
  quantityRequired: { message: '"quantity" is required' },
  quantityMin: { message: '"quantity" must be a number larger than or equal 1' },
};

const validatedFieldProductId = (req, res, next) => {
  const sales = req.body;

  const existsFieldProductId = sales.every((sale) => sale.product_id);

  if (!existsFieldProductId) return res.status(400).json(errorMessages.productRequired);

  next();
};

const validateFieldQuantity = (req, res, next) => {
  const sales = req.body;

  const existsFieldQuantity = sales.every((sale) => sale.quantity);
  console.log(existsFieldQuantity);
  if (!existsFieldQuantity) return res.status(400).json(errorMessages.quantityRequired);

  const quantity = sales.some((sale) => typeof sale.quantity === 'string' || sale.quantity <= 0);
  console.log(quantity);
  if (quantity) return res.status(422).json(errorMessages.quantityMin);

  next();
};

module.exports = {
  validatedFieldProductId,
  validateFieldQuantity,
};
