import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../../src/app';
import UserModel from '../../../src/database/models/user.model';
import loginMock from '../../mocks/login.mock';

chai.use(chaiHttp);

describe('POST /login', function () { 
  beforeEach(function () { sinon.restore(); });
  it('Se o corpo da requisição estiver errado retorna erro', async function() {
    // Arrange
    const httpBodyRequest = loginMock.invalidBody
    // Act
    const httpResponse = await chai.request(app).post('/login').send(httpBodyRequest)
    // Assert
    const expectedMessage = {message: "\"username\" and \"password\" are required"}
    expect(httpResponse.status).to.equal(400)
    expect(httpResponse.body).to.deep.equal(expectedMessage)
  });

  it('Se usuário ou senha estiverem errados retorna erro', async function() {
    // Arrange
    const httpBodyRequest = loginMock.invalidUser
    // Act
    const mockFindReturn = await UserModel.findOne({ where: { username: httpBodyRequest.username}})
    sinon.stub(UserModel, 'findOne').resolves(mockFindReturn)
    const httpResponse = await chai.request(app).post('/login').send(httpBodyRequest);

    // Assert
    const message = { message: "Username or password invalid" }
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.deep.equal(message)
  });

  it('Se estiver tudo certo retorne um token', async function() {
    // Arrange
    const httpBodyRequest = loginMock.validUser
    const mockFindeOneReturn = UserModel.build(loginMock.existingUser)
    sinon.stub(UserModel, 'findOne').resolves(mockFindeOneReturn)
    //Act
    const httpResponse = await chai.request(app).post('/login').send(httpBodyRequest)
    // Assert
    expect(httpResponse.status).to.equal(200)
    expect(httpResponse.body).to.have.key('token')    
  });
});
