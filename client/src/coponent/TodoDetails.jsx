import { useParams } from 'react-router-dom';
import { useEffect, useContext } from 'react';

function TodoDetails() {
  const { todoId, setTodoId } = useContext();
  const { id } = useParams();

  useEffect(() => {
    async function fetchTodo() {
      try {
        const response = await fetch(`http://localhost:8000/todos/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch todo');
        }

        const data = await response.json();
        console.log(data);
        setTodoId(data[0] ?? null);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTodo();
  }, [id, setTodoId]);

  if (!todoId) {
    return <p>Loading todo...</p>;
  }

  return (
    <div>
      <h1>{todoId.task}</h1>
      <p>{todoId.task_time}</p>
    </div>
  );
}

export default TodoDetails;
