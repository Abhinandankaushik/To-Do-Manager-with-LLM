import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AskQuestion from './components/AskQuestion';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error('Error fetching todos:', err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6">To-Do Manager</h1>
      <div className="w-full max-w-md">
        <TodoList todos={todos} setTodos={setTodos} />
        <AskQuestion />
      </div>
    </div>
  );
}

export default App;