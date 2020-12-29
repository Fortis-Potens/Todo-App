import Todo from '../models/Todo.js';

// @description     Get all todos
// @route           GET /api/v1/todos
// @access          Public
export const getAllTodos = async (request, response, next) => {
	try {
		const todos = await Todo.find();

		response
			.status(200)
			.json({ success: true, count: todos.length, data: todos });
	} catch (error) {
		response.status(500).json({ success: false, error: error.message });
	}
};

// @description     Get single todo
// @route           GET /api/v1/todos/:id
// @access          Public
export const getOneTodo = async (request, response, next) => {
	try {
		const todo = await Todo.findById(request.params.id);

		if (!todo) {
			return response.status(404).json({
				success: false,
				message: `Todo with id ${request.params.id} not found!`,
			});
		}
		response.status(200).json({ success: true, data: todo });
	} catch (error) {
		response.status(500).json({ success: false, error: error.message });
	}
};

// @description     Create a new todo
// @route           POST /api/v1/todos
// @access          Public
export const createTodo = async (request, response, next) => {
	try {
		if (!request.body.name || request.body.name === '') {
			return response
				.status(400)
				.json({ success: false, message: 'Please enter a todo' });
		}

		if (request.body.name.length < 3) {
			return response.status(400).json({
				success: false,
				message: 'Please enter a todo name with minimum of 3 characters',
			});
		}

		const todo = await Todo.create(request.body);

		response.status(201).json({
			success: true,
			data: todo,
		});
	} catch (error) {
		response.status(500).json({ success: false, error: error.message });
	}
};
