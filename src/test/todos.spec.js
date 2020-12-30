import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app.js';
import todos from '../data/todos.js';
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
		it('should fetch all todos in the Application', async () => {
			const response = await chai.request(app).get(`${appURL}`);

			expect(response.status).to.eq(200);
			expect(response.body.success).to.equals(true);
			expect(response.body.data).to.be.an('array');
			expect(response.body.count).to.equal(response.body.data.length);
		});
	});

	describe('GET /api/v1/todos/:id', () => {
		beforeEach(async () => {
			await Todo.deleteMany();
			await Todo.insertMany(todos);
		});

		it('should not fetch single todo if id is not found', async () => {
			const response = await chai
				.request(app)
				.get(`${appURL}/5feb42de000001a0c899770c`);

			expect(response.status).to.eq(404);
			expect(response.body.success).to.equals(false);
			expect(response.body.message).to.equals(`Todo not found!`);
		});

		it('should fetch single todo in the Application', async () => {
			const todos = await Todo.find();
			const response = await chai.request(app).get(`${appURL}/${todos[0]._id}`);
			expect(response.status).to.eq(200);
			expect(response.body.success).to.equals(true);
			expect(response.body.data).to.be.an('object');
			expect(response.body.data.name).to.equals('Wake up');
		});
	});

	describe('POST /api/v1/todos', () => {
		beforeEach(async () => {
			await Todo.deleteMany();
			await Todo.insertMany(todos);
		});

		it('should not create a new todo without a name', async () => {
			const todoWithNoName = {
				name: '',
			};
			const response = await chai
				.request(app)
				.post(`${appURL}`)
				.send(todoWithNoName);

			expect(response.status).to.eq(400);
			expect(response.body.success).to.equals(false);
			expect(response.body.message).to.equals('Please enter a todo');
		});

		it('should not create a todo if name is less than 3 characters', async () => {
			const todoWithTwoCharacters = {
				name: 'Wa',
			};
			const response = await chai
				.request(app)
				.post(`${appURL}`)
				.send(todoWithTwoCharacters);

			expect(response.status).to.eq(400);
			expect(response.body.success).to.equals(false);
			expect(response.body.message).to.equals(
				'Please enter a todo name with minimum of 3 characters'
			);
		});

		it('should create a todo in the Application', async () => {
			const todo = {
				name: 'Board the bus',
			};
			const response = await chai.request(app).post(`${appURL}`).send(todo);

			expect(response.status).to.eq(201);
			expect(response.body.success).to.equals(true);
			expect(response.body.data).to.be.an('object');
			expect(response.body.data.name).to.equals(todo.name);
		});
	});

	describe('PUT /api/v1/todos/:id', () => {
		beforeEach(async () => {
			await Todo.deleteMany();
			await Todo.insertMany(todos);
		});

		it('should not update a single todo if id is not found', async () => {
			const response = await chai
				.request(app)
				.put(`${appURL}/5feb42de000001a0c899770c`);

			expect(response.status).to.eq(404);
			expect(response.body.success).to.equals(false);
			expect(response.body.message).to.equals(`Todo not found!`);
		});

		it('should not update a single todo without a name', async () => {
			const todos = await Todo.find();

			const updateTodoWithoutName = {
				name: '',
			};

			const response = await chai
				.request(app)
				.put(`${appURL}/${todos[0]._id}`)
				.send(updateTodoWithoutName);
			expect(response.status).to.eq(400);
			expect(response.body.success).to.equals(false);
			expect(response.body.message).to.equals('Please enter a todo');
		});

		it('should not update a single todo if name is less than 3 characters', async () => {
			const todos = await Todo.find();

			const todoWithTwoCharacters = {
				name: 'Bu',
			};

			const response = await chai
				.request(app)
				.put(`${appURL}/${todos[0]._id}`)
				.send(todoWithTwoCharacters);

			expect(response.status).to.eq(400);
			expect(response.body.success).to.equals(false);
			expect(response.body.message).to.equals(
				'Please enter a todo name with minimum of 3 characters'
			);
		});

		it('should update a todo in the Application', async () => {
			const todos = await Todo.find();

			const { name = 'Build the Story' } = todos[0];

			const updateTodo = {
				name,
			};

			const response = await chai
				.request(app)
				.put(`${appURL}/${todos[0]._id}`)
				.send(updateTodo);

			expect(response.status).to.eq(200);
			expect(response.body.success).to.equals(true);
			expect(response.body.data).to.be.an('object');
			expect(response.body.data.name).to.equals(updateTodo.name);
		});
	});

	describe('DELETE /api/v1/todos/:id', () => {
		beforeEach(async () => {
			await Todo.deleteMany();
			await Todo.insertMany(todos);
		});

		it('should not delete a single todo if id is not found', async () => {
			const response = await chai
				.request(app)
				.delete(`${appURL}/5feb42de000001a0c899770c`);
			expect(response.status).to.eq(404);
			expect(response.body.success).to.equals(false);
			expect(response.body.message).to.equals(`Todo not found!`);
		});

		it('should delete a todo in the Application', async () => {
			const todos = await Todo.find();

			const response = await chai
				.request(app)
				.delete(`${appURL}/${todos[0]._id}`);

			expect(response.status).to.eq(200);
			expect(response.body.success).to.equals(true);
			expect(response.body.data).to.be.an('object');
			expect(response.body.message).to.eql('Todo deleted!');
		});
	});
});
