export const validateEmailBody = (request, response, next) => {
	const { email, subject, message } = request.body;

	if (!email || email === '') {
		return response.status(400).json({
			success: false,
			error: 'Please enter a valid email',
		});
	}

	if (!subject || subject === '') {
		return response.status(400).json({
			success: false,
			error: 'Please enter your intended valid subject',
		});
	}

	if (!message || message === '') {
		return response.status(400).json({
			success: false,
			error: 'Please enter your intended valid message',
		});
	}

	next();
};
