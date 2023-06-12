// const express = require('express');
// const Router = express.Router

import { Router } from 'express';
const router = Router();
router.post('/');
router.get('/');
router.patch('/:id'); // 업데이트(수정)
router.delete('/:id'); // 업데이트(삭제)

export default router;
