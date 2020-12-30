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
		const todo = await Todo.create(request.body);

		response.status(201).json({
			success: true,
			data: todo,
		});
	} catch (error) {
		if (error.code === 11000) {
			return response
				.status(400)
				.json({ success: false, error: 'Todo name already exist' });
		}
		response.status(500).json({ success: false, error: error.message });
	}
};

// @description     Update single todo
// @route           PUT /api/v1/todos/:id
// @access          Public
export const updateTodo = async (request, response, next) => {
	try {
		const updateTodo = await Todo.findByIdAndUpdate(
			request.params.id,
			request.body,
			{
				new: true,
				runValidators: true,
			}
		);
		response.status(200).json({ success: true, data: updateTodo });
	} catch (error) {
		console.log(error.message);
	}
};

// @description     Delete single todo
// @route           DELETE /api/v1/todos/:id
// @access          Public
export const deleteTodo = async (request, response, next) => {
	try {
		await Todo.findByIdAndDelete(request.params.id);

		response
			.status(200)
			.json({ success: true, message: 'Todo deleted!', data: {} });
	} catch (error) {
		console.log(error.message);
	}
};
