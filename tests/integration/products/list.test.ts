import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';

chai.use(chaiHttp);

describe('GET /products', function () { 
  beforeEach(function () { sinon.restore(); });
  it('deve listar todos os produtos', async function(){
    // Arrange
    const mockFindReturn = await ProductModel.findAll()
    sinon.stub(ProductModel, 'findAll').resolves(mockFindReturn);
    // Act
    const httpResponse = await chai.request(app).get('/products')
    // Assert
    const results = mockFindReturn.map((e) => e.dataValues)
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.be.deep.equal(results);
  });
});
