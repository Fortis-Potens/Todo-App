import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: './config/config.env' });

import connectDB from '../config/connectDB.js';

connectDB();

const app = express();

app.use(express.json());

import TodoRoutes from './routes/todos.js';
import { routeNotFound } from './middleware/routeNotFound.js';

app.get('/', (request, response) => {
	response.status(200).sendFile(path.resolve('public/index.html'));
});

app.use('/api/v1/todos', TodoRoutes);

app.use(routeNotFound);

export default app;
