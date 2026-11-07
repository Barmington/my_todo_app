import { useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TodoContext from '../contextApi/todoContextProvider';
function Update() {
  const { updates, setUpdates, setForm } = useContext(TodoContext);
  //
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function fetchTodo() {
      try {
        const res = await fetch(`http://localhost:8000/todos/${id}`);

        if (!res.ok) {
          throw new Error('Failed to fetch todo');
        }

        const data = await res.json();

        // Assumes GET /todos/:id returns a single object
        setUpdates({
          task: data.task,
          task_time: data.task_time,
        });
      } catch (error) {
        console.error('Error fetching todo:', error);
      }
    }

    fetchTodo();
  }, [id, setUpdates]);

  async function handleUpdate(e) {
    e.preventDefault();

    if (!updates.task.trim()) return;

    try {
      const res = await fetch(`http://localhost:8000/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      // Read the response body, including error responses
      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.error || result.Error || `HTTP error: ${res.status}`,
        );
      }

      // console.log('Updated todo:', result);
      // setTodos(prevTodos =>
      //   prevTodos.map(todo => (todo.id === result.id ? result : todo)),
      // );

      setForm({ task: '', task_time: '' });
      navigate('/');
    } catch (error) {
      console.error('Error updating todo:', error.message);
    }
  }

  return (
    <div className="flex justify-center ">
      <form onSubmit={handleUpdate}>
        <div className=" flex flex-col bg-blue-200 h-38  w-sm p-2 rounded-md border-2">
          <div className="mb-2 flex flex-col">
            <label htmlFor="task">New task:</label>
            <input
              type="text"
              id="task"
              name="task"
              value={updates.task ?? ''}
              onChange={e =>
                setUpdates(prev => ({
                  ...prev,
                  task: e.target.value,
                }))
              }
              className="bg-white rounded-md outline-1 px-2"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="task_time" className="mr-10">
              {' '}
              Time:
            </label>
            <input
              type="time"
              id="task_time"
              name="task_time"
              value={updates.task_time ?? ''}
              onChange={e =>
                setUpdates(prev => ({
                  ...prev,
                  task_time: e.target.value,
                }))
              }
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-900 h-10 w-20 text-white font-bold rounded-md p-1 "
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default Update;
