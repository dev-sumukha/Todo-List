import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Logout from './pages/Logout'
import AddTodo from './pages/AddTodo'

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/addTodo' element={<AddTodo />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/logout' element={<Logout />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App