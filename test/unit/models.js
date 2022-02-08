const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');
const productsModel = require('../../models/productModel');
const salesModel = require('../../models/salesModel');
const { not } = require('joi');

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

          expect(response).to.have.property('id');
          expect(response).to.have.property('name');
          expect(response).to.have.property('quantity');
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
          expect(response).not.to.be.empty;
        });

        it('O objetos dod produtos possui as propriedades "id", "name" e "quantity"', async () => {
          const [response] = await productsModel.getAll();

          expect(response).to.have.property('id');
          expect(response).to.have.property('name');
          expect(response).to.have.property('quantity');
        });
      });
    });

    describe('Busca um produto pelo seu "name" no BD', () => {
      const product = [{
        id: 1,
        name: 'Batata',
        quantity: 10
      }];

      before(async () => {
        sinon.stub(connection, 'query').resolves([[product]]);
      });

      after(async () => {
        connection.query.restore();
      });

      it('Retorna um array com um objeto', async () => {
        const response = await productsModel.getByName('Batata');

        expect(response).to.be.an('array');
        expect(response).not.to.be.empty;
      });

      it('O objeto do produto possui as propriedades "id", "name" e "quantity"', async () => {
        const response = await productsModel.getByName('Batata');

        expect(response[0]).to.have.property('id');
        expect(response[0]).to.have.property('name');
        expect(response[0]).to.have.property('quantity');
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

        it('Retorna "null", não existe', async () => {
          const response = await productsModel.getById(5);

          expect(response).not.to.exist;
        });
      });

      describe('Quando o produto É encontrado', () => {
        const product = [{
          id: 1,
          name: 'Batata',
          quantity: 10
        }];

        before(async () => {
          sinon.stub(connection, 'query').resolves([[product]]);
        });

        after(async () => {
          connection.query.restore();
        });

        it('Retorna um array com um objeto', async () => {
          const response = await productsModel.getById(1);

          expect(response).to.be.an('array');
          expect(response).not.to.be.empty;
        });

        it('O objeto do produto possui as propriedades "id", "name" e "quantity"', async () => {
          const response = await productsModel.getById(1);

          expect(response[0]).to.have.property('id');
          expect(response[0]).to.have.property('name');
          expect(response[0]).to.have.property('quantity');
        });
      });
    });

      describe('Atualiza um produto no BD', () => {
          describe('Em caso de sucesso', () => {
            const payloadProduct = {
              id: 1,
              name: 'Batatinha',
              quantity: 10
            };

            before(async () => {
              sinon.stub(connection, 'query').resolves([{ changedRows: 1 }]);
            });

            after(async () => {
              connection.query.restore();
            });

            // it('Retorna um objeto com a propriedade "changedRows"', async () => {
            //   const response = await productsModel.update(payloadProduct);

            //   expect(response.changedRows).to.be.equal(1);
            // });

            it('Retorna um objeto com novo valor atualizado', async () => {
              const response = await productsModel.update(payloadProduct);

              expect(response).to.be.an('object');
              expect(response).to.have.property('id');
              expect(response).to.have.property('name');
              expect(response).to.have.property('quantity');
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

          expect(response).not.to.exist;
        });

        // it('Retorna um objeto com produto deletado', async () => {
        //   const response = await productsModel.remove(1);

        //   expect(response).to.include.all.keys('id', 'name', 'quantity');
        // });
      });
    });

  describe('Teste da camada Model Sales', () => {
    describe('Insere uma nova venda no BD', () => {
      const payloadSale = [{
        product_id: 1,
        quantity: 10
      }];

      before(async () => {
        const execute = [{ insertId: 1 }];

        sinon.stub(connection, 'query').resolves(execute);
      });

      after(async () => {
        connection.query.restore();
      });

      // it('Retorna um objeto', async () => {
      //   const response = await salesModel.add(payloadSale);
      //   // console.log(response);

      //   expect(response).to.be.an('object');
      // });

      // it('O objeto possui as propriedades "id" e "itemsSold"', async () => {
      //   const response = await salesModel.add(payloadSale);

      //   expect(response).to.have.property('id');
      //   expect(response).to.have.property('itemsSold');
      // });
    });

    describe('Lista as vendas cadastradas no BD', () => {
      describe('Quando NÃO HÁ vendas cadastras', () => {
        before(async () => {
          sinon.stub(connection, 'query').resolves([[]]);
        });

        after(async () => {
          connection.query.restore();
        });

        it('Retorna um array', async () => {
          const response = await salesModel.getAll();

          expect(response).to.be.an('array');
        });

        it('O array está vazio', async () => {
          const response = await salesModel.getAll();

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
            connection.query.restore();
          });

          it('Retorna um array de objetos', async () => {
            const response = await salesModel.getAll();

            expect(response).to.be.an('array');
            expect(response).not.to.be.empty;
          });

          it('Os objetos possui as propriedades "saleId", "date", "product_id", "quantity"', async () => {
            const response = await salesModel.getAll();

            expect(response[0]).to.have.property('saleId');
            expect(response[0]).to.have.property('date');
            expect(response[0]).to.have.property('product_id');
            expect(response[0]).to.have.property('quantity');
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

        it('Retorna "null"/não existe', async () => {
          const response = await salesModel.getById(1);

          expect(response).not.to.exist;
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
          expect(response[0]).to.be.an('object');
        });

        it('O objeto do produto possui as propriedades "date", "product_id" e "quantity"', async () => {
          const [response] = await salesModel.getById(1);

          expect(response).to.have.property('date');
          expect(response).to.have.property('product_id');
          expect(response).to.have.property('quantity');
        });
      });
    });

    describe('Atualiza uma venda no BD', () => {
      describe('Em caso de sucesso', () => {
        const payloadSale = [{
          product_id: 1,
          quantity: 15
        }];

        before(async () => {
          sinon.stub(connection, 'query').resolves([{ changedRows: 1 }]);
        });

        after(async () => {
          connection.query.restore();
        });

        // it('Retorna um objeto com a propriedade "changedRows"', async () => {
        //   const response = await salesModel.update(1, payloadSale);

        //   expect(response.changedRows).to.be.equal(1);
        // });

        it('Retorna um objeto', async () => {
          const response = await salesModel.update(1, payloadSale);

          expect(response).to.be.an('object');
        });

        it('O objeto possui as proriedades "saleId", "itemUpdated"', async () => {
          const response = await salesModel.update(1, payloadSale);

          expect(response).to.have.property('saleId');
          expect(response).to.have.property('itemUpdated');
        });
      });
    });

    describe('Deleta uma venda do BD pelo seu "id"', () => {
      describe('Em caso de sucesso', () => {
        before(async () => {
          sinon.stub(connection, 'query').resolves([{ affectedRows: 1 }]);
        });

        after(async () => {
          connection.query.restore();
        });

        it('Retorna "null" ou "undefined"', async () => {
          const response = await salesModel.remove(1);

          expect(response).not.to.exist;
        });
      });
    });

  });
  });
