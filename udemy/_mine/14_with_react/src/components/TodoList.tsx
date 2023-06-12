import React from 'react';

interface TodoListProps {
  items: { id: string; text: string }[]; // items: prop의 이름
}

const TodoList = (props: TodoListProps) => {
  return (
    <ul>
      {props.items.map((todos) => (
        <li key={todos.id}>{todos.text}</li>
      ))}
    </ul>
  );
};

export default TodoList;
