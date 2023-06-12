import React from 'react';
import './TodoList.css';

interface TodoListProps {
  items: { id: string; text: string }[]; // items: prop의 이름
  onDeleteTodo: (id: string) => void;
}

const TodoList = (props: TodoListProps) => {
  return (
    <ul>
      {props.items.map((todos) => (
        <li key={todos.id}>
          <span>{todos.text}</span>
          <button type='button' onClick={props.onDeleteTodo.bind(null, todos.id)}>
            DELETE
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
