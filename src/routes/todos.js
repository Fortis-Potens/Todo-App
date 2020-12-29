import express from 'express';
import { getAllTodos, getOneTodo, createTodo } from '../controllers/todos.js';

const router = express.Router();

router.route('/').get(getAllTodos).post(createTodo);

router.route('/:id').get(getOneTodo);

export default router;
