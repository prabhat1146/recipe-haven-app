// src/pages/recipes/AddRecipe.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
  const [instructions, setInstructions] = useState([{ stepNumber: '', instruction: '' }]);
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [servings, setServings] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [cuisine, setCuisine] = useState('');
  const [tags, setTags] = useState(['']);
  const [image, setImage] = useState('');
  const navigate = useNavigate();

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleInstructionChange = (index, field, value) => {
    const newInstructions = [...instructions];
    newInstructions[index][field] = value;
    setInstructions(newInstructions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipeData = {
      title,
      description,
      ingredients,
      instructions,
      prepTime: parseInt(prepTime),
      cookTime: parseInt(cookTime),
      servings: parseInt(servings),
      difficulty,
      cuisine,
      tags,
      image,
    };

    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData),
      });

      if (response.ok) {
        navigate('/recipes'); // Redirect to the recipe list after successful addition
      } else {
        console.error('Failed to add recipe:', await response.text());
      }
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const addInstruction = () => {
    setInstructions([...instructions, { stepNumber: '', instruction: '' }]);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Recipe</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            className="mt-1 block w-full border-gray-300 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                className="block w-full border-gray-300 rounded-md"
                placeholder="Ingredient Name"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                required
              />
              <input
                type="text"
                className="block w-full border-gray-300 rounded-md"
                placeholder="Quantity"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                required
              />
            </div>
          ))}
          <button
            type="button"
            className="mt-2 text-blue-500"
            onClick={addIngredient}
          >
            Add Another Ingredient
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Instructions</label>
          {instructions.map((instruction, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="number"
                className="block w-12 border-gray-300 rounded-md"
                placeholder="Step"
                value={instruction.stepNumber}
                onChange={(e) => handleInstructionChange(index, 'stepNumber', e.target.value)}
                required
              />
              <input
                type="text"
                className="block w-full border-gray-300 rounded-md"
                placeholder="Instruction"
                value={instruction.instruction}
                onChange={(e) => handleInstructionChange(index, 'instruction', e.target.value)}
                required
              />
            </div>
          ))}
          <button
            type="button"
            className="mt-2 text-blue-500"
            onClick={addInstruction}
          >
            Add Another Instruction
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Prep Time (minutes)</label>
          <input
            type="number"
            className="mt-1 block w-full border-gray-300 rounded-md"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Cook Time (minutes)</label>
          <input
            type="number"
            className="mt-1 block w-full border-gray-300 rounded-md"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Servings</label>
          <input
            type="number"
            className="mt-1 block w-full border-gray-300 rounded-md"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Difficulty</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Cuisine</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Tags (comma separated)</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md"
            value={tags.join(', ')}
            onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
