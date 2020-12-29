import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app.js';
import todos from '../../data/todos.js';
import Todo from '../models/Todo.js';

chai.use(chaiHttp);
const { expect } = chai;

const appURL = '/api/v1/todos';

describe('CRUD for Todo API application', () => {
	describe('GET /api/v1/todos', () => {
		beforeEach(async () => {
			await Todo.deleteMany();
			await Todo.insertMany(todos);
		});

		it('Fetch all todos in the Application', (done) => {
			chai
				.request(app)
				.get(`${appURL}/`)
				.end((error, response) => {
					expect(response.status).to.eq(200);
					expect(response.body.success).to.equals(true);
					expect(response.body.data).to.be.an('array');
					expect(response.body.count).to.equal(response.body.data.length);
					done();
				});
		});
	});

	describe('GET /api/v1/todos/:id', () => {
		beforeEach(async () => {
			await Todo.deleteMany();
			await Todo.insertMany(todos);
		});

		it('should not fetch single todo if id is not found', async () => {
			chai
				.request(app)
				.get(`${appURL}/5feb42de000001a0c899770c`)
				.end((error, response) => {
					expect(response.status).to.eq(404);
					expect(response.body.success).to.equals(false);
					expect(response.body.message).to.equals(
						`Todo with id 5feb42de000001a0c899770c not found!`
					);
				});
		});

		it('Fetch single todo in the Application', async () => {
			const todos = await Todo.find();
			chai
				.request(app)
				.get(`${appURL}/${todos[0]._id}`)
				.end((error, response) => {
					expect(response.status).to.eq(200);
					expect(response.body.success).to.equals(true);
					expect(response.body.data).to.be.an('object');
					expect(response.body.data.name).to.equals('Wake up');
				});
		});
	});
});
