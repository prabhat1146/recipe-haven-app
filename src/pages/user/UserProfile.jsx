import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import LoadingBar from 'react-top-loading-bar';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const loadingBarRef = useRef(null); // Create a ref for the loading bar

    const email = Cookies.get("email");
    const URL = process.env.REACT_APP_SERVER_API_URL;

    useEffect(() => {
        const fetchUser = async () => {
            // if (loadingBarRef.current) {
            //     loadingBarRef.current.continuousStart(); // Start the loading bar
            // }
            try {
                const response = await axios.get(`${URL}/auth/profile?email=${email}`);
                // console.log("res",response?.data)
                setUser(response?.data);
            } catch (err) {
                setError(err.response?.data.message || 'Error fetching user data');
            } finally {
                // if (loadingBarRef.current) {
                //     loadingBarRef.current.complete(); // Complete the loading bar
                // }
                setLoading(false);
            }
        };

        if (email) {
            console.log(email)
            fetchUser();
        } else {
            setLoading(false); // If email is not present, stop loading
            setError('No email found in cookies');
        }
    }, [email]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500 ml-10">{error}</p>;
    if (!user) return <p>User not found</p>;

    return (
        <div className="max-w-4xl mx-auto p-4 ml-10">
            <LoadingBar color="#f11946" ref={loadingBarRef} />
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center mb-4">
                    <img 
                        src={user[0].profileImage || "https://via.placeholder.com/150"} 
                        alt={user[0].username} 
                        className="w-24 h-24 rounded-full border-2 border-gray-300"
                    />
                    <div className="ml-4">
                        <h1 className="text-2xl font-bold">{user[0].username}</h1>
                        <p className="text-gray-600">{user[0].email}</p>
                    </div>
                </div>
               
                {/* <div>
                    <h2 className="text-xl font-semibold">Recipes</h2>
                    <ul className="mt-4">
                        {user[0].recipes.map(recipe => (
                            <li key={recipe._id} className="bg-gray-100 p-4 rounded-lg mb-2 shadow">
                                <h3 className="text-lg font-semibold">{recipe.title}</h3>
                                <p className="text-gray-600">{recipe.description}</p>
                            </li>
                        ))}
                    </ul>
                </div> */}
            </div>
        </div>
    );
};

export default UserProfile;
