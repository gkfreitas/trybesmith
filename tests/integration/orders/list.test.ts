import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../../src/app';
import OrderModel from '../../../src/database/models/order.model';

chai.use(chaiHttp);

describe('GET /orders', function () { 
  beforeEach(function () { sinon.restore(); });
  it('deve listar todos as orders', async function(){
    // Arrange
    const mockFindReturn = await OrderModel.findAll()
    sinon.stub(OrderModel, 'findAll').resolves(mockFindReturn);
    // Act
    const httpResponse = await chai.request(app).get('/orders')
    // Assert
    const results = mockFindReturn.map((e) => e.dataValues)
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(results);
  });
});
