const rescue = require('express-rescue');
const sales = require('express').Router();
const {
  validatedFieldProductId,
  validateFieldQuantity } = require('../middlewares/validatedSaleMiddleware');
const {
  registerSale, getAllSales, getSaleById,
} = require('../services/salesService');

sales.post('/',
validatedFieldProductId,
validateFieldQuantity,
rescue(async (req, res) => {
  const sale = await registerSale(req.body);

  return res.status(201).json(sale);
}));

sales.get('/', rescue(async (req, res) => {
  const allSales = await getAllSales();

  return res.status(200).json(allSales);
}));

sales.get('/:id', rescue(async (req, res) => {
  const sale = await getSaleById(req.params.id);

  return res.status(200).json(sale);
}));

module.exports = sales;
