import React, { useState, useEffect } from 'react';
import { fetchTodos } from '../services/todoService';

const TodoComponent = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    // Fetch todos when the component mounts
    const fetchData = async () => {
      try {
        const todosData = await fetchTodos();
        setTodos(todosData);
      } catch (error) {
        // Handle error, e.g., show a user-friendly message
        console.error('Failed to fetch todos:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoComponent;
