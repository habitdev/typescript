// import { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express'; // 위의 import를 모두 포함하는 import
import { Todo } from '../models/todo';

// export const createTodo = (req: Request, res: Response, next: NextFunction) => {};

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  // req.body.text는 타입스크립트가 어떤 타입인지 알 수 없으므로
  // 개발자가 타입을 지정해주는 방법도 있다
  const newTodo = new Todo(Math.random().toString(), text);
  TODOS.push(newTodo);

  res.status(201).json({ message: 'Created the todo.', createdTodo: newTodo });
};
