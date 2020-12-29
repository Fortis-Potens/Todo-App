export const routeNotFound = (request, response, next) => {
	response.status(404).json({ success: false, message: 'Route not found!' });
	next();
};
