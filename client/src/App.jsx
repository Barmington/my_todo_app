import Todo from './coponent/Todo';
import { Routes, Route } from 'react-router-dom';

import Form from './coponent/Form';
import Update from './coponent/Update';

import TodoDetails from './coponent/TodoDetails';
import { TodoContextProvider } from './contextApi/todoContextProvider';

function App() {
  return (
    <>
      <TodoContextProvider>
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="todos/:id" element={<TodoDetails />} />
          <Route path="/form" element={<Form />} />
          <Route path="/edit/:id" element={<Update />} />
        </Routes>
      </TodoContextProvider>
    </>
  );
}

export default App;
