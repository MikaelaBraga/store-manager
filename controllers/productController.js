const rescue = require('express-rescue');
const product = require('express').Router();
const { registerProduct, getProductByName } = require('../services/productService');
const { validateProductSchema } = require('../schemas/productSchema');

product.post('/', rescue(async (req, res) => {
  const { name, quantity } = req.body;
  validateProductSchema({ name, quantity });
  await getProductByName(name);

  const newProduct = await registerProduct(name, quantity);

  return res.status(201).json(newProduct);
}));

module.exports = product;
