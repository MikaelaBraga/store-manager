const errorMessages = {
  productRequired: { message: '"product_id" is required' },
  quantityRequired: { message: '"quantity" is required' },
  quantityMin: { message: '"quantity" must be a number larger than or equal to 1' },
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

module.exports = {
  validatedFieldProductId,
  validateFieldQuantity,
};
