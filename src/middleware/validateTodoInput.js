export const validateBody = (request, response, next) => {
	const { name } = request.body;
	if (!name || name === '') {
		return response
			.status(400)
			.json({ success: false, message: 'Please enter a todo' });
	}

	if (name.length < 3) {
		return response.status(400).json({
			success: false,
			message: 'Please enter a todo name with minimum of 3 characters',
		});
	}

	next();
};

export const validateParams = (request, response, next) => {
	const { id } = request.params;

	if (!id || id === '' || !id.match(/^[0-9a-fA-F]{24}$/)) {
		return response
			.status(400)
			.json({ success: false, message: 'Please enter a valid Todo id' });
	}

	next();
};
