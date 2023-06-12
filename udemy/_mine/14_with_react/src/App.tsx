import React, { useState } from 'react';
// import { Route } from 'react-router-dom';


import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import { Todo } from './todo.model';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  // useState은 항상 2가지를 리턴한다
  // 첫번째는 render 사이클에 가장 최근 state 스냅샷
  // 두번째는 state를 업데이트 하는 function이고 컴포넌트를 다시 렌더링한다
  // useState는 초기화 시 값이 비면 오류가 나므로 어떤 데이터가 들어올 지 설정해준다
  // useState에 배열을 담아 보내는데 형식은 Todo와 같다

  const todoAddHandler = (text: string) => {
    console.log(text);
    setTodos((prevTodos) => [...prevTodos, { id: Math.random().toString(), text: text }]);
    // 가장 최신의 모습에 배열의 정보를 담는다
  };

  const todoDeleteHandler = (todoId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
  };

  return (
    <div className='App'>
      {/* A component that adds todos */}
      {/* prop의 이름은 마음대로 정할 수 있다 => items */}
      <NewTodo onAddTodo={todoAddHandler} />
      {/* onAddTodo이란 prop이 todoAddHandler을 전달 */}
      <TodoList items={todos} onDeleteTodo={todoDeleteHandler} />
    </div>
  );
}

export default App;
