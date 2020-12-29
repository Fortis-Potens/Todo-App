import express from 'express';
import {
	getAllTodos,
	getOneTodo,
	createTodo,
	updateTodo,
	deleteTodo,
} from '../controllers/todos.js';

const router = express.Router();

router.route('/').get(getAllTodos).post(createTodo);

router.route('/:id').get(getOneTodo).put(updateTodo).delete(deleteTodo);

export default router;
