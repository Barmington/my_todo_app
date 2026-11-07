import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import TodoContext from '../contextApi/todoContextProvider';

function Form() {
  const { form, setForm, setTodos } = useContext(TodoContext);
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();

    if (!form.task.trim()) return;
    try {
      const res = await fetch('http://localhost:8000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      // const res = await axios(
      //   'http://localhost:8000/todos',
      //   { task, task_time },
      //   {
      //     headers: {
      //       Accept: 'application/json',
      //     },
      //   },
      // );
      if (!res.ok) {
        throw new Error('Failed to create todo');
      }
      // console.log(res.data);
      const result = res.json();

      setTodos(prev => [...prev, { ...result }]);
      setForm({ task: '', task_time: '' });
      navigate('/');
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };
  const handleChange = event => {
    const { name, value } = event.target;

    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };
  return (
    <div className="flex justify-center p-1 mt-6">
      <form
        onSubmit={handleSubmit}
        className="border-2 w-sm rounded-md bg-blue-100 p-2"
      >
        <div className="flex items-center p-1">
          <div className="w-full pr-1">
            <label htmlFor="task" className="font-bold">
              Enter task
            </label>
            <input
              className="focus:outline-2 focus:rounded-lg h-7 w-67 bg-white outline-1 rounded-md "
              type="text"
              id="task"
              name="task"
              value={form.task}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="task" className="font-bold transform-3d">
              Time
            </label>
            <input
              className="h-7 rounded-md bg-white text-green-900 outline-1 font-bold"
              type="time"
              id="task_time"
              name="task_time"
              value={form.task_time}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="w-full border-2 rounded-md bg-green-700 sm:bg-blue-400 sm:w-28 text-white font-bold hover:bg-emerald-600 p-1"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
