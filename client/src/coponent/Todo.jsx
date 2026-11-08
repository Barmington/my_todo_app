import { useEffect, useContext } from 'react';
import { MdDelete, MdOutlineEdit } from 'react-icons/md';
import { useNavigate } from 'react-router';
import TodoContext from '../contextApi/todoContextProvider';
import NavBar from '../coponent/NavBar';

const today = new Date();

const formattedDate = today.toLocaleDateString('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const now = new Date();
const timeNow = now.toLocaleString('en-GB', {
  timeStyle: 'short',
});
// console.log('Todays date is ', formattedDate, timeNow);

function Todo() {
  const { todos, setTodos } = useContext(TodoContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch('http://localhost:8000/todos');

        if (!res.ok) {
          throw new Error(`Fetch failed: ${res.status}`);
        }

        const result = await res.json();
        setTodos(result);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [setTodos]);

  async function handleDelete(id) {
    try {
      const res = await fetch(`http://localhost:8000/todos/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`Delete failed: ${res.status}`);
      }

      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  function handleComplete(id) {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, isComplete: !todo.isComplete } : todo,
      ),
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto p-3 border-2 border-gray-400 bg-gray-100 rounded-4xl shadow-md">
      <NavBar />

      <div className="flex flex-col gap-4">
        <h2 className="text-center font-bold text-xl text-blue-800">
          List of activities
        </h2>
        <div className="flex justify-between font-light ">
          <p className="text-sm">{formattedDate}</p>
          <p className="text-sm">{timeNow}</p>
        </div>
        <p> xxx todos remaining</p>{' '}
        {/* xxx = todo.length - todo.Complete.length */}
        {todos.length === 0 ? (
          <p className="text-center text-gray-500 py-4">
            You have no todo. Please add a todo.
          </p>
        ) : (
          todos.map(todo => (
            <div
              key={todo.id}
              className="flex items-center justify-between gap-3 p-3 border border-gray-200 rounded-lg"
            >
              <input
                type="checkbox"
                checked={todo.isComplete}
                onChange={() => handleComplete(todo.id)}
              />
              <p
                style={{
                  color: todo.isComplete ? 'gray' : 'inherit',
                  font: todo.isComplete ? 'normal' : 'inherit',
                }}
              >
                {todo.task}
              </p>
              <p className="text-sm text-gray-500">{todo.task_time}</p>

              <button
                style={{
                  display: todo.isComplete && 'none',
                }}
                type="button"
                onClick={() => navigate(`/edit/${todo.id}`)}
                className="text-gray-600 hover:text-blue-700"
                aria-label={`Edit ${todo.task}`}
              >
                <MdOutlineEdit size={20} />
              </button>

              <button
                type="button"
                onClick={() => handleDelete(todo.id)}
                className="text-red-600 hover:text-red-800"
                aria-label={`Delete ${todo.task}`}
              >
                <MdDelete size={20} />
              </button>
            </div>
          ))
        )}
      </div>

      <button
        type="button"
        onClick={() => navigate('/form')}
        className="w-full mt-4 p-1 rounded-3xl text-white font-semibold bg-blue-700 hover:bg-blue-600 transition-colors"
      >
        Add todo
      </button>
    </div>
  );
}

export default Todo;
