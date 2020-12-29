import express from 'express';
import { getAllTodos, getOneTodo } from '../controllers/todos.js';

const router = express.Router();

router.route('/').get(getAllTodos);

router.route('/:id').get(getOneTodo);

export default router;
