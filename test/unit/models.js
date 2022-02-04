const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');
const productsModel = require('../../models/productModel');

describe('Teste da camada Model Products', () => {
  describe('Insere um novo produto no BD', () => {
    describe('Quando o produto é inserido com sucesso', () => {

      const payloadProduct = {
        id: 1,
        name: 'Batatinha',
        quantity: 10
      }

      before(async () => {
        const execute = [{ insertId: 1 }];

        sinon.stub(connection, 'execute').resolves(execute);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await productsModel.add(payloadProduct);

        expect(response).to.be.an('object');
      });

      it('O objeto possui o "id", o "name" e o "quantity" do produto', async () => {
        const response = await productsModel.add(payloadProduct);

        expect(response).to.have.keys('id', 'name', 'quantity');
      });
    });
  });

  describe('Lista os produtos cadastrados no BD', () => {
    describe('Quando NÃO HÁ produtos cadastrado no BD', () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves([[]]);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Retorna um array vazio', async () => {
        const listProducts = await productsModel.getAll();

        expect(listProducts).to.be.an('array');
        expect(listProducts).to.be.empty;
      });
    });

    describe('Quando HÁ produtos cadastrados no BD', () => {
      const fakeArray = [{
        id: 1,
        name: 'Batata',
        quantity: 10
      },
      {
        id: 2,
        name: 'Batatinha',
        quantity: 15
      }];

      before(async () => {
        sinon.stub(connection, 'execute').resolves([fakeArray]);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Retorna um array de objetos', async () => {
        const listProducts = await productsModel.getAll();

        expect(listProducts).to.be.an('array');
        expect([listProducts]).to.be.an('object');
      });

      it('O objetos dod produtos possui as propriedades "id", "name" e "quantity"', async () => {
        const [itemProduct] = await productsModel.getAll();

        expect(itemProduct).to.include.all.keys('id', 'name', 'quantity');
      });
    });
  });

  describe('Busca um produto pelo seu "id" no BD', () => {
    describe('Quando o produto NÃO é encontrado', () => {
      before(async () => {
        sinon.stub(connection, 'execute').resolves([[]]);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Retorna um array vazio', async () => {
        const response = await productsModel.getById(1);

        expect(response).to.be.an('array');
        expect(response).to.be.empty;
      });

    });

    describe('Quando o produto É encontrado', () => {
      const product = {
        id: 1,
        name: 'Batata',
        quantity: 10
      }

      before(async () => {
        sinon.stub(connection, 'execute').resolves([product]);
      });

      after(async () => {
        connection.execute.restore();
      });

      it('Retorna um array com UM objeto', async () => {
        const response = await productsModel.getById(1);

        expect(response).to.be.an('array');
        expect([response]).to.be.an('object');
      });

      it('O objeto do produto possui as propriedades "id", "name" e "quantity"', async () => {
        const [product] = await productsModel.getById(1);

        expect(product).to.include.all.keys('id', 'name', 'quantity');
      });
    });
  });
});

