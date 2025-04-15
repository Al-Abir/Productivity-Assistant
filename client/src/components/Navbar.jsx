import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex-col justify-between items-center">
        <h1 className="text-2xl font-bold text-center">Productivity Assistant</h1>
        
        <div className="space-x-8 text-center p-5 ">
          <NavLink 
            to="/register" 
            className={({isActive})=>`px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-blue-800' : 'hover:bg-blue-500'} transition-colors`}
          >
            Sign Up
          </NavLink>
          <NavLink 
            to="/login" 
            className={({ isActive }) => 
              `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-blue-800' : 'hover:bg-blue-500'} transition-colors`
            }
          >
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
