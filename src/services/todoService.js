const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Function to fetch todos from the API
export const fetchTodos = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};
