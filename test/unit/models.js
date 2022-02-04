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
        expect(listProducts).to.be.length(0);
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
        expect(listProducts).not.to.be.length(0);
      });
    });
  });

  describe('Busca um produto pelo seu "id" no BD', () => {

    describe('Quando o produto NÃO é encontrado', () => {

      it('Retorna uma mensagem de "Product not found"', async () => {});

    });

    describe('Quando o produto É encontrado', () => {

      it('Retorna um array com UM objeto', async () => {});

    });

  });
});

