const { add, getAll, getById } = require('../models/salesModel');
const errorConstructor = require('../utils/errorConstructor');
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

const getAllSales = async () => {
  const allSales = await getAll();

  return allSales;
};

const getSaleById = async (id) => {
  const sale = await getById(id);

  if (sale === null) {
    throw errorConstructor('notFound', 'Sale not found');
  }

  return sale;
};

module.exports = { registerSale, getAllSales, getSaleById };
