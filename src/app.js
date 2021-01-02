import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config({ path: './config/config.env' });

import connectDB from '../config/connectDB.js';

connectDB();

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import TodoRoutes from './routes/todos.js';
import EmailRoutes from './routes/emails.js';
import { routeNotFound } from './middleware/routeNotFound.js';

app.get('/', (request, response) => {
	response.status(200).sendFile(path.resolve('public/index.html'));
});

app.use('/api/v1/todos', TodoRoutes);
app.use('/api/v1/email', EmailRoutes);

app.use(routeNotFound);

export default app;
