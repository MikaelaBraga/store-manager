const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');
const productsModel = require('../../models/productModel');
const salesModel = require('../../models/salesModel');

describe('TESTE DA CAMADA MODEL', () => {

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

          sinon.stub(connection, 'query').resolves(execute);
        });

        after(async () => {
          connection.query.restore();
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
          sinon.stub(connection, 'query').resolves([[]]);
        });

        after(async () => {
          connection.query.restore();
        });

        it('Retorna um array vazio', async () => {
          const response = await productsModel.getAll();

          expect(response).to.be.an('array');
          expect(response).to.be.empty;
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
          sinon.stub(connection, 'query').resolves([fakeArray]);
        });

        after(async () => {
          connection.query.restore();
        });

        it('Retorna um array de objetos', async () => {
          const response = await productsModel.getAll();

          expect(response).to.be.an('array');
          expect([response]).to.be.an('object');
        });

        it('O objetos dod produtos possui as propriedades "id", "name" e "quantity"', async () => {
          const [response] = await productsModel.getAll();

          expect(response).to.include.all.keys('id', 'name', 'quantity');
        });
      });
    });

    describe('Busca um produto pelo seu "id" no BD', () => {
      describe('Quando o produto NÃO é encontrado', () => {
        before(async () => {
          sinon.stub(connection, 'query').resolves([[]]);
        });

        after(async () => {
          connection.query.restore();
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
          sinon.stub(connection, 'query').resolves([product]);
        });

        after(async () => {
          connection.query.restore();
        });

        it('Retorna um array com UM objeto', async () => {
          const response = await productsModel.getById(1);

          expect(response).to.be.an('array');
          expect([response]).to.be.an('object');
        });

        it('O objeto do produto possui as propriedades "id", "name" e "quantity"', async () => {
          const [response] = await productsModel.getById(1);

          expect(response).to.include.all.keys('id', 'name', 'quantity');
        });

        describe('Atualiza um produto no BD', () => {
          describe('Em caso de sucesso', () => {
            const payloadProduct = {
              id: 1,
              name: 'Batatinha',
              quantity: 10
            }

            before(async () => {
              sinon.stub(connection, 'query').resolves([{ changedRows: 1 }]);
            });

            after(async () => {
              connection.query.restore();
            });

            it('Retorna um objeto com a propriedade "changedRows"', async () => {
              const response = await productsModel.update(payloadProduct);

              expect(response.changedRows).to.be.equal(1);

              it('Retorna um objeto com novo valor atualizado', async () => {
                const response = await productsModel.update(payloadProduct);

                expect(response).to.include.all.keys('id', 'name', 'quantity');
              });
            });
          });
        });
      });
    });

    describe('Deleta um produto do BD pelo seu "id"', () => {
      describe('Em caso de sucesso', () => {
        before(async () => {
          sinon.stub(connection, 'query').resolves([{ affectedRows: 1 }]);
        });

        after(async () => {
          connection.query.restore();
        });

        it('Retorna objeto com a propriedade "affectRows"', async () => {
          const response = await productsModel.remove(1);

          expect(response.affectedRows).to.be.equal(1);
        });
      });
    });
  });

  describe('Teste da camada Model Sales', () => {
    describe('Insere uma nova venda no BD', () => {
      const payloadSale = [{
        product_id: 1,
        quantity: 10
      }];

      before(async () => {
        sinon.stub(connection, 'query').resolves([{ insertId: 1 }]);
      });

      after(async () => {
        connection.query.restore();
      });

      it('Retorna um objeto', async () => {
        const response = await salesModel.add(payloadSale);

        expect(response).to.be.an('object');
      });

      it('O objeto possui as propriedades "id" e "itemsSold"', async () => {
        const response = await salesModel.add(payloadSale);

        expect(response).to.include.all.keys('id', 'itemsSold');
      });
    });

    describe('Lista as vendas cadastradas no BD', () => {
      describe('Quando NÃO HÁ vendas cadastras', () => {
        before(async () => {
          sinon.stub(connection, 'query').resolves([[]]);
        });

        after(async () => {
          connection.query.restore();
        });

        it('Retorna um array vazio', async () => {
          const response = await salesModel.getAll();

          expect(response).to.be.an('array');
          expect(response).to.be.empty;
        });
      });

      describe('Quando HÁ vendas cadastradas', () => {
        const fakeArray = [
          {
            saleId: 4,
            date: "2022-02-03T03:10:42.000Z",
            product_id: 1,
            quantity: 2
          },
          {
            saleId: 4,
            date: "2022-02-03T03:10:42.000Z",
            product_id: 1,
            quantity: 2
          }];

          before(async () => {
            sinon.stub(connection, 'query').resolves([fakeArray]);
          });

          after(async () => {
            connection.execute.restore();
          });

          it('Retorna um array de objetos', async () => {
            const response = await salesModel.getAll();

            expect(response).to.be.an('array');
            expect(response).to.be.not.be.empty;
          });

          it('Os objetos possui as propriedades "saleId", "date", "product_id", "quantity"', async () => {
            const response = await salesModel.getAll();

            expect(response).to.include.all.keys('saleId', 'date', 'product_id', 'quantity');
        });
      });
    });

    describe('Busca uma venda pelo seu "id" no BD', () => {
      describe('Quando a venda NÃO é encontrada', () => {
        before(async () => {
          sinon.stub(connection, 'query').resolves([[]]);
        });

        after(async () => {
          connection.query.restore();
        });

        it('Retorna um array vazio', async () => {
          const response = await salesModel.getById(1);

          expect(response).to.be.an('array');
          expect(response).to.be.empty;
        });

      });

      describe('Quando a venda É encontrada', () => {
        const sale = [
          {
            date: "2022-02-03T03:10:42.000Z",
            product_id: 4,
            quantity: 5
          },
          {
            date: "2022-02-03T03:10:42.000Z",
            product_id: 3,
            quantity: 5
          }
        ]

        before(async () => {
          sinon.stub(connection, 'query').resolves([sale]);
        });

        after(async () => {
          connection.query.restore();
        });

        it('Retorna um array de objetos', async () => {
          const response = await salesModel.getById(1);

          expect(response).to.be.an('array');
          expect([response]).to.be.an('object');
        });

        it('O objeto do produto possui as propriedades "date", "product_id" e "quantity"', async () => {
          const [response] = await salesModel.getById(1);

          expect(response).to.include.all.keys('date', 'product_id', 'quantity');
        });
      });
    });
  });
});
