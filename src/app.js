import express from 'express';
import dotenv from 'dotenv';

dotenv.config({ path: './config/config.env' });

import connectDB from '../config/connectDB.js';

connectDB();

const app = express();

app.get('/', (request, response) => {
	response
		.status(200)
		.json({ success: true, message: `Welcome to our Todo API` });
});

export default app;
