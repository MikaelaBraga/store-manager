const { add, getByName, getAll, getById } = require('../models/productModel');
const errorConstructor = require('../utils/errorConstructor');

const registerProduct = (name, quantity) => add(name, quantity);

const getProductByName = async (name) => {
  const product = await getByName(name);

  if (product !== null) {
    throw errorConstructor('conflicts', 'Product already exists');
  }

  return false;
};

const getAllProducts = async () => {
 const products = await getAll();

 return products;
};

const getProductById = async (id) => {
  const product = await getById(id);

  if (product === null) {
    throw errorConstructor('notFound', 'Product not found');
  }

  return product;
};

module.exports = {
  registerProduct,
  getProductByName,
  getAllProducts,
  getProductById,
};
