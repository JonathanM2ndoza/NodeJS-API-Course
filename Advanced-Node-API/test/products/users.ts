import chai from 'chai';
import chaiHttp from 'chai-http';
import { ConnectionMongoDB } from '../../src/config/database/mongo';

const conn = new ConnectionMongoDB();
const server = 'http://localhost:3000';

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe('GET /api/v1/users', () => {
  before(async () => {
    try {
      await conn.connect();
    } catch (err) {
      console.log(err);
    }
  });

  after(async () => {
    try {
      conn.close();
    } catch (err) {
      console.log(err);
    }
  });

  it('GET /api/v1/login', (done) => {
    const body = {
      email: 'jonathan.m2ndoza1@gmail.com',
      password: '123456jm-',
    };

    chai
      .request(server)
      .post('/api/v1/login')
      .send(body)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eq('OK');
        response.body.should.have
          .property('message')
          .to.be.an('object')
          .to.have.property('token');
        response.body.should.have
          .property('message')
          .to.be.an('object')
          .to.have.property('tokenExpire');
        done();
      });
  });

  it('It should NOT GET /api/v1/login', (done) => {
    const body = {
      email: 'jonathan.m2ndoza1@gmail.com1',
      password: '123456jm-',
    };

    chai
      .request(server)
      .post('/api/v1/login')
      .send(body)
      .end((err, response) => {
        response.should.have.status(401);
        response.body.should.be.a('object');
        response.body.should.have.property('status').eq('ERROR');
        response.body.should.have.property('message').eq('User not found');
        done();
      });
  });
});
