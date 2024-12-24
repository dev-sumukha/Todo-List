import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const[user,setUser] = useState({
    email:'',
    password:''
  })

  const navigate = useNavigate()

  function handleInput(e){
    let name = e.target.name
    let value = e.target.value

    setUser({
      ...user,
      [name]:value
    })
  }

  async function handleSubmit(e){
    e.preventDefault()
    
    try {
      const res = await axios.post('http://localhost:3000/api/auth/signup',user)

      if(res){
        console.log(res.data.message)
        if(res.data.message === 'user exists'){
          alert('user exists')
        } else {
          alert('user registered')
        }
      }
    } catch (error) {
      alert('something went wrong')
    }
  }

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col justify-center items-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-white text-3xl font-bold text-center mb-6">Register</h1>
        
        <form onSubmit={handleSubmit} method='post'>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={user.email}
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              onChange={handleInput}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={user.password}
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              onChange={handleInput}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register
