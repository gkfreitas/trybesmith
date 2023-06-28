import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../../src/app';
import ProductModel from '../../../src/database/models/product.model';
import productMock from '../../mocks/product.mock';

chai.use(chaiHttp);

describe('POST /products', function () {
  beforeEach(function () { sinon.restore(); });

  it('deve criar um novo produto', async function () {
    // Arrange
    const httpRequestBody = productMock.validBody;
    const mockCreateReturn = ProductModel.build(httpRequestBody)
    sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);
    // Act
    const httpResponse = await chai.request(app).post('/products').send(httpRequestBody);
    // Assert
    expect(httpResponse.status).to.equal(201);
    expect(httpResponse.body).to.be.deep.equal(mockCreateReturn.dataValues);
  });

  it('deve retornar erro 400 caso esteja com o body invalido', async function(){
    const httpRequestBody = productMock.validBody;
    const mockCreateReturn = ProductModel.build(httpRequestBody)
    sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);
    // Act
    const httpResponse = await chai.request(app).post('/products').send(productMock.invalidBody);
    // Assert
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.be.deep.equal({message: "\"name\" is required"});
  })

  it('deve retornar erro 422 caso price ou name seja diferente de string', async function(){
    const httpRequestBody = productMock.validBody;
    const mockCreateReturn = ProductModel.build(httpRequestBody)
    sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);
    // Act
    const httpResponse = await chai.request(app).post('/products').send(productMock.invalidBodyType);
    // Assert
    expect(httpResponse.status).to.equal(422);
    expect(httpResponse.body).to.be.deep.equal({message: "\"price\" must be a string"});
  })

  it('deve retornar erro 422 caso os inputs tenham tamanhos menores que 3', async function(){
    const httpRequestBody = productMock.validBody;
    const mockCreateReturn = ProductModel.build(httpRequestBody)
    sinon.stub(ProductModel, 'create').resolves(mockCreateReturn);
    // Act
    const httpResponse = await chai.request(app).post('/products').send(productMock.invalidBodyLength);
    // Assert
    expect(httpResponse.status).to.equal(422);
    expect(httpResponse.body).to.be.deep.equal({message:  "\"name\" length must be at least 3 characters long"});
  })
});
