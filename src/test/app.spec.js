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
				done();
			});
	});
});
