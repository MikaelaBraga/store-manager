const rescue = require('express-rescue');
const product = require('express').Router();
const {
  registerProduct,
  getProductByName,
  getAllProducts,
  getProductById,
  updateProductById,
 } = require('../services/productService');
const { validateProductSchema } = require('../schemas/productSchema');

product.post('/', rescue(async (req, res) => {
  const { name, quantity } = req.body;
  validateProductSchema({ name, quantity });
  await getProductByName(name);

  const newProduct = await registerProduct(name, quantity);

  return res.status(201).json(newProduct);
}));

product.get('/', rescue(async (req, res) => {
  const products = await getAllProducts();

  return res.status(200).json(products);
}));

product.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const products = await getProductById(id);

  return res.status(200).json(products);
}));

product.put('/:id', rescue(async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  validateProductSchema({ name, quantity });

  const updateProduct = await updateProductById({ id, name, quantity });

  return res.status(200).json(updateProduct);
}));

module.exports = product;
