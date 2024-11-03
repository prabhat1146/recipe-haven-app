// src/pages/recipes/RecipeList.js

import React, { useEffect, useState } from 'react';
import RecipeCard from '../../components/RecipeCard.jsx';

function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch('/api/recipes'); // Adjust API endpoint as necessary
      const data = await response.json();
      setRecipes(data);
    };

    fetchRecipes();
  }, []);

  return (
    <div className="bg-white p-4 rounded-md shadow">
      <h2 className="text-2xl font-bold mb-4">All Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map(recipe => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default RecipeList;
