require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const productController = require('./controllers/productController');
const middelware = require('./middlewares/index');

const app = express();

app.use(bodyParser.json());

app.use('/products', productController);

app.use(middelware.joiError);
app.use(middelware.domainError);
app.use(middelware.internalError);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
