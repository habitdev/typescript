import React from 'react';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

function App() {
  const todos = [{ id: 'todo1', text: 'Finish the course!' }];

  const todoAddHandler = (text: string) => {
    console.log(text);
  };

  return (
    <div className='App'>
      {/* A component that adds todos */}
      {/* prop의 이름은 마음대로 정할 수 있다 => items */}
      <NewTodo onAddTodo={todoAddHandler} />
      {/* onAddTodo이란 prop이 todoAddHandler을 전달 */}
      <TodoList items={todos} />
    </div>
  );
}

export default App;
