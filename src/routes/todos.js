import express from 'express';
import {
	getAllTodos,
	getOneTodo,
	createTodo,
	updateTodo,
	deleteTodo,
} from '../controllers/todos.js';
import { validateBody, validateParams } from '../middleware/validateInput.js';
import findOne from '../utils/findOne.js';

const router = express.Router();

router.post('/', validateBody, createTodo);
router.get('/', getAllTodos);
router.get('/:id', validateParams, findOne, getOneTodo);
router.put('/:id', validateParams, findOne, validateBody, updateTodo);
router.delete('/:id', validateParams, findOne, deleteTodo);

export default router;
