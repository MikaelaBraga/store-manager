const { add, getAll, getById, update, remove } = require('../models/salesModel');
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

const updateSale = async (id, sale) => {
  await getSaleById(id);
  await Promise.all(
    sale.map(async (p) => {
      await getProductById(p.product_id);
    }),
  );
  const updatedSale = await update(id, sale);
  return updatedSale;
};

const removeSale = async (id) => {
  const row = await getSaleById(id);
  await remove(id);

  return row;
};

module.exports = { registerSale, getAllSales, getSaleById, updateSale, removeSale };
