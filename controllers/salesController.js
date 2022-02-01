const rescue = require('express-rescue');
const sales = require('express').Router();
const {
  validatedFieldProductId,
  validateFieldQuantity } = require('../middlewares/validatedSaleMiddleware');
const {
  registerSale,
} = require('../services/salesService');

sales.post('/',
validatedFieldProductId,
validateFieldQuantity,
rescue(async (req, res) => {
  const sale = await registerSale(req.body);

  return res.status(200).json(sale);
}));

module.exports = sales;
