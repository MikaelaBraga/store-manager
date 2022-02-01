const { add } = require('../models/salesModel');

const registerSale = async (sales) => add(sales);

module.exports = { registerSale };
