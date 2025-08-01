import { useState } from 'react';

function TodoList({ todos, setTodos }) {
  const [task, setTask] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const addTodo = async () => {
    if (!task.trim()) return;
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task })
      });
      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
      setTask('');
    } catch (err) {
      console.error('Error adding todo:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setIsLoading(true);
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, { method: 'DELETE' });
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Tasks</h2>
      <div className="flex mb-6">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
          className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        />
        <button
          onClick={addTodo}
          disabled={isLoading}
          className={`p-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"></div>
          ) : (
            'Add Task'
          )}
        </button>
      </div>
      <ul className="space-y-3">
        {todos?.map(todo => (
          <li
            key={todo.id}
            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
          >
            <span className="text-gray-800">{todo.task}</span>
            <button
              onClick={() => deleteTodo(todo.id)}
              disabled={isLoading}
              className={`text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="animate-spin w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full"></div>
              ) : (
                'Delete'
              )}
            </button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && !isLoading && (
        <p className="text-gray-500 text-center mt-4">No tasks yet. Add one to get started!</p>
      )}
    </section>
  );
}

export default TodoList;
