import http from 'http';
import app from './src/app.js';

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log(
		`Server running in ${process.env.NODE_ENV} is listening on port ${
			process.env.PORT
		} at current time ${new Date().toUTCString()}`
	);
});
