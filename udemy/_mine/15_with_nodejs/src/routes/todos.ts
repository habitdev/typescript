// const express = require('express');
// const Router = express.Router

import { Router } from 'express';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todos';

const router = Router();
router.post('/', createTodo);
router.get('/', getTodos);
router.patch('/:id', updateTodo); // 업데이트(수정)
router.delete('/:id', deleteTodo); // 업데이트(삭제)

export default router;
