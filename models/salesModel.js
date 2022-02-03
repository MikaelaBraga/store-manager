const connect = require('./connection');

const add = async (sales) => {
  const [sale] = await connect.query('INSERT INTO sales (date) VALUES (NOW());');
  await Promise.all(sales.map(async (s) => {
    await connect.query(
      'INSERT INTO sales_products (product_id, quantity, sale_id) VALUES (?, ?, ?);',
    [s.product_id, s.quantity, sale.insertId],
  );
  await connect.execute('UPDATE products SET quantity = quantity - ? WHERE id = ?;',
  [s.quantity, s.product_id]);
  }));

  return { id: sale.insertId, itemsSold: sales };
};

const getAll = async () => {
  const [sales] = await connect.query(
    `SELECT sp.sale_id AS saleId, s.date, sp.product_id, sp.quantity
    FROM sales_products AS sp
    INNER JOIN sales AS s ON sp.sale_id = s.id;`,
  );
  return sales;
};

const getById = async (id) => {
  const [sales] = await connect.query(
    `SELECT s.date, sp.product_id, sp.quantity FROM sales_products AS sp
    INNER JOIN sales AS s ON sp.sale_id = s.id WHERE s.id = ?;`, [id],
  );

  if (!sales.length) return null;
  return sales;
};

const update = async (id, sale) => {
  const [sales] = await connect.query(
    'UPDATE sales_products SET product_id = ?, quantity = ? WHERE sale_id = ?',
    [sale[0].product_id, sale[0].quantity, id],
  );

  if (!sales.changedRows) return null;

  return { saleId: parseInt(id, 10), itemUpdated: sale };
};

const remove = async (id) => {
  const sale = await getById(id);
  if (!sale) return null;
  await connect.query('DELETE FROM sales_products WHERE sale_id = ?', [id]);
  await connect.query('DELETE FROM sales WHERE id = ?', [id]);

  await Promise.all(sale.map(async (s) => {
    await connect.execute('UPDATE products SET quantity = quantity + ? WHERE id = ?;',
  [s.quantity, s.product_id]);
  }));

  return sale;
};

module.exports = {
  add,
  getAll,
  getById,
  update,
  remove,
};
