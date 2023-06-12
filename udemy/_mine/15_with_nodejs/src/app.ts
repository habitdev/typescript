/**
 * NodeJS는 파일 형식과 상관없이 내용이 자바스크립트라면 실행한다
 * 하지만, 타입스크립트는 실행하지 않는다
 *
 * "body-parser": "^1.20.2", // 들어오는 request body를 전달할 수 있다
 * "express": "^4.18.2" // node express
 * "nodemon": "^1.19.4" // 노드 변화 시마다 서버를 재시작
 *
 */

// const express = require('express'); // express를 불러오고 // js환경
import express, { Request, Response, NextFunction } from 'express'; // typescript 방법

import todoRoutes from './routes/todos';
import { json } from 'body-parser';
// body-parser는 들어오는 요청들을 전부 파싱하는 미들웨어이다

console.log('Something...');

const app = express(); // express를 실행

app.use(json());

app.use('/todos', todoRoutes);
// /todos로 시작하는 모든 요청을 todoRoutes로 포워딩한다

// 에러를 처리하는 미들웨어 함수
// app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {});
// 이렇게 타입을 입력하거나 상단에 import해서 express를 사용한다
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(3000); // 3000포트로 요청
