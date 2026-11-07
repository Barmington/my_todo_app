import { createContext, useState } from 'react';

const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [todoId, setTodoId] = useState(null);
  const [updates, setUpdates] = useState({
    task: '',
    task_time: '',
  });

  const [form, setForm] = useState({
    task: '',
    task_time: '',
  });

  const todoValues = {
    todos,
    todoId,
    updates,
    form,
    setForm,
    setTodoId,
    setTodos,
    setUpdates,
  };
  return (
    <TodoContext.Provider value={todoValues}>{children}</TodoContext.Provider>
  );
};

export default TodoContext;
