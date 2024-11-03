// src/components/RecipeCard.js

import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden transition-transform transform hover:scale-105">
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold">{recipe.title}</h2>
        <p className="text-gray-600">{recipe.description}</p>
        <div className="mt-2">
          <span className="bg-green-100 text-green-600 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
            {recipe.difficulty}
          </span>
          <span className="bg-blue-100 text-blue-600 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
            {recipe.cuisine}
          </span>
        </div>
        <p className="text-gray-500 mt-2">
          Cooking Time: {recipe.cookTime} min | Prep Time: {recipe.prepTime} min
        </p>
        <p className="text-gray-500">Servings: {recipe.servings}</p>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Ingredients:</h3>
          <ul className="list-disc ml-5 text-gray-700">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.quantity} of {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Instructions:</h3>
          <ol className="list-decimal ml-5 text-gray-700">
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step.instruction}</li>
            ))}
          </ol>
        </div>
        <div className="mt-4">
          <Link
            to={`/recipes/${recipe._id}`}
            className="text-blue-600 hover:underline mr-4"
          >
            View Details
          </Link>
          <Link
            to={`/edit-recipe/${recipe._id}`}
            className="text-blue-600 hover:underline"
          >
            Edit Recipe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
