import React, { useState, useEffect } from 'react';

const TodoComponent = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const clearTodos = () => {
    setTodos([]);
  };

  useEffect(() => {
    // Fetch todos when the component mounts
    fetchTodos();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return (
    <div>
      <h1>Todos</h1>
      <div>
        <button onClick={fetchTodos}>Fetch Todos</button>
        <button onClick={clearTodos}>Clear Todos</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoComponent;
