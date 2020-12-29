import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app.js';

chai.use(chaiHttp);
const { expect } = chai;

const appURL = '/api/v1';

describe('Todo API Server', () => {
	it('Welcomes user to the Todo API Application', (done) => {
		chai
			.request(app)
			.get('/')
			.end((error, response) => {
				expect(response.status).to.eq(200);
				expect(response.body.success).to.equals(true);
				expect(response.body.message).to.equal('Welcome to our Todo API');
				done();
			});
	});
});
