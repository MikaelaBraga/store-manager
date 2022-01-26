const { add, getByName } = require('../models/productModel');
const errorConstructor = require('../utils/errorConstructor');

const registerProduct = (name, quantity) => add(name, quantity);

const getProductByName = async (name) => {
  const product = await getByName(name);

  if (product !== null) {
    throw errorConstructor('conflicts', 'Product already exists');
  }

  return product;
};

module.exports = {
  registerProduct,
  getProductByName,
};
