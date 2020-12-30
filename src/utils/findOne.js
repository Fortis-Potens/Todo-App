import Todo from '../models/Todo.js';

const findOne = async (request, response, next) => {
	const todo = await Todo.findById(request.params.id);

	if (!todo) {
		return response.status(404).json({
			success: false,
			message: `Todo not found!`,
		});
	}
	next();
};

export default findOne;
