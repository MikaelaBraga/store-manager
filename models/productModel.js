const connect = require('./connection');

const add = async (name, quantity) => {
  const [products] = await connect.query('INSERT INTO products (name, quantity) VALUES (?, ?);',
  [name, quantity]);

  return { id: products.insertId, name, quantity };
};

const getByName = async (name) => {
  const [products] = await connect.query('SELECT * FROM products WHERE name = ?', [name]);

  if (!products.length) return null;
  return products[0];
};

const getAll = async () => {
 const [products] = await connect.query('SELECT * FROM products');

 return products;
};

const getById = async (id) => {
  const [products] = await connect.query('SELECT * FROM products WHERE id = ?', [id]);

  if (!products.length) return null;
  return products[0];
};

module.exports = {
  add,
  getByName,
  getAll,
  getById,
};
