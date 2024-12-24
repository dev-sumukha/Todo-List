import React, { useContext, useEffect, useState } from 'react';
import TodoCards from '../components/TodoCards';
import axios from 'axios';
import userContext from '../store/UserContext';

function Home() {
  const { token } = useContext(userContext);
  const [todos, setTodos] = useState([]);  // State to hold the fetched todos

  // Fetch todos from the server
  async function getTodoElements() {
    try {
      const res = await axios.get('http://localhost:3000/api/todo/getTodo', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      // Set the fetched todos to state
      setTodos(res.data.user.tasks);
    } catch (error) { 
      console.log('Something went wrong:', error);
    }
  }

  // Function to handle deleting a todo item
  const handleDelete = async (id) => {
    try {
      // Make a DELETE request to the server
      await axios.delete(`http://localhost:3000/api/todo/deleteTodo?_id=${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // Update the state to remove the deleted todo
      setTodos(todos.filter(todo => todo._id !== id));
      console.log(id);
    } catch (error) {
      console.log('Error deleting todo:', error);
    }
  };

  // Fetch todos on component mount
  useEffect(() => {
    getTodoElements();
  }, []);  // Empty dependency array ensures the effect runs only once

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center py-12">
      <h1 className="text-white text-4xl font-bold mb-8">Your To-Do List</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {todos.map((value) => (
          <TodoCards key={value._id} props={value} handleDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}

export default Home;
