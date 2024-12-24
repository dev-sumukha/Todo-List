import React, { useContext, useState } from 'react';
import axios from 'axios';
import userContext from '../store/UserContext';

function AddTodo() {
    const [todo, setTodo] = useState({
        title: '',
        description: '',
        sendAt: ''
    });

    const { token } = useContext(userContext);

    function handleInput(e) {
        const name = e.target.name;
        const value = e.target.value;

        setTodo({
            ...todo,
            [name]: value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        // Basic form validation
        // if (!todo.title || !todo.description || !todo.date) {
        //     alert('Please fill in all fields');
        //     return;
        // }

        try {
            const res = await axios.post('http://localhost:3000/api/todo/addTodo', todo, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.status === 200) {
                console.log(res);
                alert('Task created successfully');
                // Clear the form after successful submission
                setTodo({
                    title: '',
                    description: '',
                    date: ''
                });
            } else {
                console.log('Unexpected response:', res);
            }
        } catch (error) {
            console.log('Something went wrong', error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-800 flex flex-col items-center py-12">
            <h1 className="text-white text-4xl font-bold mb-8">Create a New Task</h1>

            <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg">
                <div className="mb-4">
                    <label className="block text-white text-lg font-bold mb-2" htmlFor="title">
                        Task Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter task title"
                        name="title"
                        value={todo.title || ''}  // Ensure value is not undefined
                        onChange={handleInput}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-white text-lg font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        placeholder="Enter task description"
                        name="description"
                        value={todo.description || ''}  // Ensure value is not undefined
                        onChange={handleInput}
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label className="block text-white text-lg font-bold mb-2" htmlFor="datetime">
                        Scheduled Date & Time
                    </label>
                    <input
                        type="datetime-local"
                        id="datetime"
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="sendAt"
                        value={todo.sendAt || ''}  // Ensure value is not undefined
                        onChange={handleInput}
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddTodo;
