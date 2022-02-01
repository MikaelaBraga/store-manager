const { add } = require('../models/salesModel');
const { getProductById } = require('./productService');

const registerSale = async (sales) => {
  await Promise.all(
    sales.map(async (sale) => {
      await getProductById(sale.product_id);
    }),
  );

  const createSale = add(sales);
  return createSale;
};

module.exports = { registerSale };
