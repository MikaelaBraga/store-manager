require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const productController = require('./controllers/productController');
const middleware = require('./middlewares/errors/index');

const app = express();

app.use(bodyParser.json());

app.use('/products', productController);

app.use(middleware.joiError);
app.use(middleware.domainError);
app.use(middleware.internalError);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
