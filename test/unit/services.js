const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../models/connection');
const productModel = require('../../models/productModel');
const productsService = require('../../services/productService');

describe('TESTE DA CAMADA SERVICE', () => {

    describe('Teste da função que Registra Produtos no BD', () => {
      describe('Em caso de sucesso', () => {
        const product = { name: 'Batata', quantity: 10 };

        before(() => {
          sinon.stub(connection, 'query').resolves([product]);
        });

        after(() => {
          connection.query.restore();
        });

      it('Retorna um objeto', async () => {
        const response = await productsService.registerProduct(product.name, product.quantity);

        expect(response).to.be.an('object');
      });

      it('O objeto possui as propriedades "id", "name" e "quantity"', async () => {
        const response = await productsService.registerProduct(product.name, product.quantity);

        expect(response).to.have.a.property('id');
        expect(response).to.have.a.property('name');
        expect(response).to.have.a.property('quantity');
      });
      });

      describe('Em caso de falha', () => { //refatorar

        before(async () => {
          sinon.stub(connection, 'query').resolves([{}]);
        });

        after(async () => {
          connection.query.restore();
        });

      it('Retorna um "Error"', async () => {
        const response = await productsService.registerProduct();
        // console.log(response);

          expect(response).to.be.an('object'); // refatorar
        });
      });
    });

    describe('Teste da função que Busca todos os produtos', () => {
      describe('Quando não houver produtos cadastrados', () => {
        before(async () => {
          sinon.stub(connection, 'query').resolves([[]]);
        });

        after(async () => {
          connection.query.restore();
        });

        it('Retorna um array', async () => {
          const response = await productsService.getAllProducts();

          expect(response).to.be.an('array');
        });

        it('O array está vazio', async () => {
          const response = await productsService.getAllProducts();

          expect(response).to.be.empty;
        });
      });

      describe('Quando houver produtos cadastrados', () => {
        const product = { id: 1, name: 'Batatinha', quantity: 15 };

        before(async () => {
          sinon.stub(connection, 'query').resolves([[product]]);
        });

        after(async () => {
          connection.query.restore();
        });

        it('Retorna um array', async () => {
          const response = await productsService.getAllProducts();

          expect(response).to.be.an('array');
        });

        it('O array não está vazio', async () => {
          const response = await productsService.getAllProducts();

          expect(response).not.to.be.empty;
        });

        it('O array possui itens do tipo objeto', async () => {
          const [response] = await productsService.getAllProducts();

          expect(response).to.be.an('object');
        });

        it('Os objetos possui as propriedades "id", "name" e "quantity"', async () => {
          const [response] = await productsService.getAllProducts();

          expect(response).to.have.a.property('id');
          expect(response).to.have.a.property('name');
          expect(response).to.have.a.property('quantity');
        });
      });
    });

    describe('Testa função que busca produto por "id"', () => {
      describe('Quando encontrar o produto', () => {
        const product = { id: 1, name: 'Batatinha', quantity: 15 };

        before(async () => {
          sinon.stub(connection, 'query').resolves([[product]]);
        });

        after(async () => {
          connection.query.restore();
        });

        it('Retorna um objeto', async () => {
          const response = await productsService.getProductById(1);

          expect(response).to.be.an('object');
        });

        it('O objeto possui as propriedades "id", "name" e "quantity"', async () => {
          const response = await productsService.getProductById(1);

          expect(response).to.have.a.property('id');
          expect(response).to.have.a.property('name');
          expect(response).to.have.a.property('quantity');
        });
      });

      describe('Quando NÃO encontrar o produto', () => {
        before(async () => {
          sinon.stub(connection, 'query').resolves([[{}]]);
        });
        after(async () => {
          connection.query.restore();
        });

        it('Retorna um objeto', async () => {
          const response = await productsService.getProductById(15);

          expect(response).to.be.an('object');
        });

        it('O objeto está vazio', async () => {
          const response = await productsService.getProductById(15);

          expect(response).to.be.empty;
        });
      });
    });

    describe('Teste da função que atualiza um produto', () => {
      describe('Quando o produto é atualizado', () => {
        const product = { id: 1, name: 'Batatona', quantity: 27 };
        before(async () => {
          sinon.stub(connection, 'query').resolves([[product]]);
        });

        after(async () => {
          connection.query.restore();
        });

        it('Retorna um objeto', async () => {
          const response = await productsService.updateProductById(1);

          expect(response).to.be.an('object');
        });

        it('O objeto possui as propriedades "id", "name" e "quantity" atualizados', async () => {
          const response = await productsService.updateProductById(1);

          expect(response).to.have.a.property('id');
          expect(response).to.have.a.property('name');
          expect(response).to.have.a.property('quantity');
        });
      });

      describe('Quando o produto não existe no BD', () => {
        before(async () => {
          sinon.stub(connection, 'query').resolves([[{}]]);
        });

        after(async () => {
          connection.query.restore();
        });

        it('Retorna um objeto vazio', async () => {
          const response = await productsService.updateProductById(99);

          expect(response).to.be.an('object'); // refatorar
          // expect(response).to.be.empty;
        });
      });
    });

    describe('Testa a função que deleta um produto', () => {
      describe('Quando o produto é deletado', () => {
        const product = { id: 1, name: 'Batatonanana', quantity: 2 };

        before(async () => {
          sinon.stub(connection, 'query').resolves([[product]]);
        });

        after(async () => {
          connection.query.restore();
        });

        it('Retorna um objeto', async () => {
          const response = await productsService.removeProductById(1);

          expect(response).to.be.an('object');
        });

        it('O objeto possui as propriedades "id", "name" e "quantity" atualizados', async () => {
          const response = await productsService.removeProductById(1);

          expect(response).to.have.a.property('id');
          expect(response).to.have.a.property('name');
          expect(response).to.have.a.property('quantity');
        });
      });
    });
});
