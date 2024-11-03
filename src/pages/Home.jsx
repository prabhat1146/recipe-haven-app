// src/pages/Home.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard'; // Importing the RecipeCard component

const Home = () => {
  const [featuredRecipes, setFeaturedRecipes] = useState([]); // State for storing featured recipes
  const [error, setError] = useState(null); // State for error handling
  const [isRecipeFound, setIsRecipeFound] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  const URL = process.env.REACT_APP_SERVER_API_URL;

  useEffect(() => {
    const fetchFeaturedRecipes = async () => {
      try {
        const response = await axios.get(`${URL}/recipes/all`);
        if (response.data.length > 0) {
          setFeaturedRecipes(response.data);
          setIsRecipeFound(true);
        } else {
          setFeaturedRecipes("No Recipe found! Please refresh the page");
        }
      } catch (error) {
        setError('Error fetching featured recipes.');
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched or an error occurs
      }
    };

    fetchFeaturedRecipes();
  }, [URL]);

  // if (error) {
  //   return <div className="text-red-500">{error}</div>; // Display error message if any
  // }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Recipe App!</h1>
      <p className="mb-8 text-lg">
        Discover a variety of delicious recipes, from appetizers to desserts. 
        Whether you're a novice cook or a seasoned chef, we have something for everyone!
      </p>

      <h2 className="text-3xl font-semibold mb-4">Featured Recipes</h2>
      {loading ? ( // Show loading spinner when data is being fetched
        <div className="flex justify-center items-center">
          <div className="loader">Loading...</div> {/* Add a CSS spinner or use a library spinner here */}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {isRecipeFound ? (
            featuredRecipes.map(recipe => (
              <RecipeCard key={recipe._id} recipe={recipe} /> // Rendering RecipeCard for each featured recipe
            ))
          ) : (
            <div>No Recipe found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
