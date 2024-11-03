// src/components/Layout/Header.js

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

function Header() {
  const [user, setUser] = useState({ name: '', image: '' }); // State to hold user data
  const URL = process.env.REACT_APP_SERVER_API_URL;

  useEffect(() => {
    const email = Cookies.get('email'); // Get email from cookie
    const token = Cookies.get('token'); // Get token from cookie

    if (email && token) {
      // Fetch user data from your API
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${URL}/auth/profile?email=${email}&token=${token}`); // Adjust the endpoint as necessary
          const fetchedUser = response?.data; // Assuming your API returns user data in this format
          console.log(fetchedUser); // Log the fetched user data
          setUser({
            name: fetchedUser[0].username,
            image: fetchedUser[0].image || 'https://via.placeholder.com/40', // Fallback image
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [URL]); // Empty dependency array means this runs once on mount

  return (
    <header className="bg-blue-600  text-white py-4 px-6 shadow-md flex justify-between items-center">
      <h1 className="text-2xl ml-10 font-semibold">Recipe Haven</h1>
      <div className="flex items-center">
        <img
          src={user.image}
          alt="User Avatar"
          className="rounded-full w-10 h-10 mr-3" // Avatar styling
        />
        <span className="text-lg">{user.name}</span>
      </div>
    </header>
  );
}

export default Header;
