const sinon = require('sinon');
const { expect } = require('chai');

const productController = require('../../controllers/productController');
const connection = require('../../models/connection');

describe('TESTE DA CAMADA DE CONTROLLER', () => {

  describe('Testa controller de criar produtos', () => {
    describe('Quando o payload não é válido', () => {
      const response = {};
    const request = {};

    before(async () => {
      request.body = {};

      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(connection, 'query').resolves(false);
    });

    after(async () => {
      connection.query.restore();
    });

    // it('é chamado o status com código 400', async () => {
    //   await productController.post(request, response);

    //   expect(response.status.calledWith(400)).to.be.equal(true);
    // });
    });

    describe('Quando o payload é válido', () => {});
  });

  describe('Teste do controller de listar produtos', () => {
    describe('Quando NÃO houver produtos', () => {});

    describe('Quando houver produtos', () => {});
  });

});
