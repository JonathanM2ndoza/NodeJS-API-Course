import chai from 'chai';
import chaiHttp from 'chai-http';
import { ConnectionMongoDB } from '../../src/config/database/mongo';

const conn = new ConnectionMongoDB();
const server = 'http://localhost:3000';

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe('GET /api/v1/products', () => {
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

  it('GET /api/v1/products', (done) => {
    chai
      .request(server)
      .get('/api/v1/products')
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('status');
        response.body.should.have.property('message');
        response.body.should.have
          .property('message')
          .to.be.an('array')
          .to.have.lengthOf(3);
        done();
      });
  });

  it('It should NOT GET all the products', (done) => {
    chai
      .request(server)
      .get('/api/v1/products1')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });
});
