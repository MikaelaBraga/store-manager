const connect = require('./connection');

const add = async (sales) => {
  const [sale] = await connect.query('INSERT INTO sales (date) VALUES (NOW());');
  sales.map(async (s) => {
    await connect.query(
      'INSERT INTO sales_products (product_id, quantity, sale_id) VALUES (?, ?, ?);',
    [s.product_id, s.quantity, sale.insertId],
  );
  await connect.execute('UPDATE products SET quantity = quantity - ? WHERE id = ?;',
  [s.quantity, s.product_id]);
  });

  return { id: sale.insertId, itemsSold: sales };
};

module.exports = {
  add,
};
