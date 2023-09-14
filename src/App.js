import React, { useEffect, useState } from 'react';
import {
  Button,
  InputContainer,
  PageWrapper,
  TodoCard,
  TodoContainer,
  TodoHeader,
  TodoListContainer,
} from './components/styles';
import nextId from 'react-id-generator';
import { useDispatch, useSelector } from 'react-redux';
import { __addToDo, __deleteTodo } from './redux/modules/todosSlice';

function App() {
  const id = nextId();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.list);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    // todos 상태가 변경될 때마다 출력
    console.log(todos);
  }, [todos]);

  const newTodo = {
    id,
    title,
    body,
  }

  const onAddTodo = () => {
    dispatch(__addToDo(newTodo));
    console.log(todos);
  };

  const onDeleteTodo = (id) => {
    dispatch(__deleteTodo(id));
  };

  const resetInputs = () => {
    /**
     * 입력 값을 초기화하고 싶다면 사용하세요.
     */
    setTitle('');
    setBody('');
  };
  const onChangeTitle = (e) => setTitle(e.target.value);
  const onChangeBody = (e) => setBody(e.target.value);
  return (
    <PageWrapper>
      <TodoContainer>
        <TodoHeader>🐢 SLOW TODO LIST 🐢</TodoHeader>
        <InputContainer>
          <span>제목: </span>
          <input
            value={title}
            placeholder="할 일 제목"
            onChange={onChangeTitle}
          />
          <span>내용: </span>
          <input
            value={body}
            placeholder="할 일 내용"
            onChange={onChangeBody}
          />

          <Button onClick={()=>{onAddTodo(); resetInputs();}}>+ 추가하기</Button>
        </InputContainer>
        <TodoListContainer>
          {todos && todos.map((todo) => (
            <TodoCard key={todo.id}>
              <span>제목: {todo.title}</span>
              <span>할 일: {todo.body}</span>
              <Button onClick={()=>{onDeleteTodo(todo.id);
              }}>삭제하기</Button>
            </TodoCard>
          ))}
        </TodoListContainer>
      </TodoContainer>
    </PageWrapper>
  );
}

export default App;
