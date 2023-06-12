import React from 'react';
import TodoList from './components/TodoList';

function App() {
  const todos = [{ id: 'todo1', text: 'Finish the course!' }];

  return <div className='App'>
    {/* A component that adds todos */}
    {/* prop의 이름은 마음대로 정할 수 있다 => items */}
    <TodoList items={todos}/>
  </div>;
}

export default App;
