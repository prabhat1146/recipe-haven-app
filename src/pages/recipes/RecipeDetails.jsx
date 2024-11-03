// src/pages/RecipeDetails.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = () => {
  const { id } = useParams(); // Get the recipe ID from the URL parameters
  const navigate = useNavigate(); // For navigation after actions
  const [recipe, setRecipe] = useState(null); // State to hold recipe data
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`/api/recipes/${id}`); // Fetch recipe details from the backend
        setRecipe(response.data);
      } catch (error) {
        setError('Error fetching recipe details.');
        console.error(error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleEdit = () => {
    navigate(`/recipes/${id}/edit`); // Navigate to the edit recipe page
  };

  if (error) {
    return <div className="text-red-500">{error}</div>; // Display error if any
  }

  if (!recipe) {
    return <div>Loading...</div>; // Display loading state
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover mb-4 rounded" />
      <p className="mb-4">{recipe.description}</p>

      <h2 className="text-2xl font-semibold mb-2">Ingredients</h2>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.quantity} {ingredient.name}
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-semibold mb-2">Instructions</h2>
      <ol className="list-decimal list-inside mb-4">
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>
            {instruction.instruction}
          </li>
        ))}
      </ol>

      <div className="mb-4">
        <strong>Preparation Time:</strong> {recipe.prepTime} minutes
      </div>
      <div className="mb-4">
        <strong>Cooking Time:</strong> {recipe.cookTime} minutes
      </div>
      <div className="mb-4">
        <strong>Servings:</strong> {recipe.servings}
      </div>
      <div className="mb-4">
        <strong>Difficulty:</strong> {recipe.difficulty}
      </div>
      <div className="mb-4">
        <strong>Cuisine:</strong> {recipe.cuisine}
      </div>
      <div className="mb-4">
        <strong>Category:</strong> {recipe.category}
      </div>
      <div className="mb-4">
        <strong>Tags:</strong> {recipe.tags.join(', ')}
      </div>
      <button
        onClick={handleEdit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Edit Recipe
      </button>
    </div>
  );
};

export default RecipeDetails;
