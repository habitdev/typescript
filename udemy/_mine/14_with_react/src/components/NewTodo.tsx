import React, { useRef } from 'react';
import './NewTodo.css';

interface NewTodoProps {
  onAddTodo: (todoText: string) => void;
}

const NewTodo = (props: NewTodoProps) => {
  const textInputRef = useRef<HTMLInputElement>(null);
  // null은 기본 값
  // textInputRef가 읽어질 때는 아래의 내용이 아직 렌더링 되지 않았으므로 null을 넘겨준다
  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    // ref를 쓸 때는 항상 current을 사용해야 한다
    if (textInputRef.current) {
      const enteredText = textInputRef.current!.value;
      // console.log(enteredText);
      props.onAddTodo(enteredText);
    }
  };
  return (
    <form action='' onSubmit={todoSubmitHandler}>
      <div className='form-control'>
        <label htmlFor='todo-text'>Todo Text</label>
        <input type='text' name='todo-text' id='todo-text' ref={textInputRef} />
      </div>
      <button type='submit'>Add Todo</button>
    </form>
  );
};

export default NewTodo;
