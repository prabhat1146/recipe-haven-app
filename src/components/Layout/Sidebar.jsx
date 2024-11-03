// src/components/Sidebar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get('token')); // Check if token cookie exists

    const handleLogout = () => {
        Cookies.remove('token'); // Remove token cookie on logout
        setIsLoggedIn(false); // Update local state
        // You can also redirect to the login page after logout
        window.location.href = '/login'; // or use `history.push('/login')` if using react-router
    };

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle sidebar visibility
  };

  return (
    <div className={` flex flex-col h-screen fixed z-50  bg-gray-800 text-white ${isOpen ? 'w-3/4 lg:w-1/4' : 'w-10'} transition-width duration-300`}>
      <div className="flex items-center justify-between p-4">
        <h1 className={`text-xl font-bold ${isOpen ? 'block' : 'hidden'}`}>Recipe App</h1>
        <button onClick={toggleSidebar} className="focus:outline-none">
          <svg className={`w-6 h-6 ${isOpen ? 'block' : 'hidden'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
          <svg className={`w-6 h-6 ${isOpen ? 'hidden' : 'block'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2 p-4">
          <li>
            <Link to="/" className="flex items-center p-2 hover:bg-gray-700 rounded-md">
              <span className={`text-lg ${isOpen ? 'block' : 'hidden'}`}>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/user/profile" className="flex items-center p-2 hover:bg-gray-700 rounded-md">
              <span className={`text-lg ${isOpen ? 'block' : 'hidden'}`}>Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/user/settings" className="flex items-center p-2 hover:bg-gray-700 rounded-md">
              <span className={`text-lg ${isOpen ? 'block' : 'hidden'}`}>Settings</span>
            </Link>
          </li>
          <li>
            <Link to="/user/recipes" className="flex items-center p-2 hover:bg-gray-700 rounded-md">
              <span className={`text-lg ${isOpen ? 'block' : 'hidden'}`}>My Recipes</span>
            </Link>
          </li>
          {/* <li>
            <Link to="/admin/dashboard" className="flex items-center p-2 hover:bg-gray-700 rounded-md">
              <span className={`text-lg ${isOpen ? 'block' : 'hidden'}`}>Dashboard</span>
            </Link>
          </li> */}
          {/* <li>
            <Link to="/admin/manage-users" className="flex items-center p-2 hover:bg-gray-700 rounded-md">
              <span className={`text-lg ${isOpen ? 'block' : 'hidden'}`}>Manage Users</span>
            </Link>
          </li> */}
          {/* <li>
            <Link to="/admin/manage-recipes" className="flex items-center p-2 hover:bg-gray-700 rounded-md">
              <span className={`text-lg ${isOpen ? 'block' : 'hidden'}`}>Manage Recipes</span>
            </Link>
          </li> */}
          {/* <li>
            <Link to="/recipes" className="flex items-center p-2 hover:bg-gray-700 rounded-md">
              <span className={`text-lg ${isOpen ? 'block' : 'hidden'}`}>All Recipes</span>
            </Link>
          </li> */}
          {isLoggedIn ? (
                <li>
                    <button
                        onClick={handleLogout}
                        className="flex items-center p-2 hover:bg-gray-700 rounded-md w-full text-left"
                    >
                        <span className={`text-lg ${isOpen ? 'block' : 'hidden'}`}>Logout</span>
                    </button>
                </li>
            ) : (
                <li>
                    <Link to="/login" className="flex items-center p-2 hover:bg-gray-700 rounded-md">
                        <span className={`text-lg ${isOpen ? 'block' : 'hidden'}`}>Login</span>
                    </Link>
                </li>
            )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
