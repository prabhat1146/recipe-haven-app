// src/pages/EditRecipe.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
  const [instructions, setInstructions] = useState([{ stepNumber: 1, instruction: '' }]);
  const [prepTime, setPrepTime] = useState(0);
  const [cookTime, setCookTime] = useState(0);
  const [servings, setServings] = useState(0);
  const [difficulty, setDifficulty] = useState('Easy');
  const [cuisine, setCuisine] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState('');
  
  // Fetch existing recipe details
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`/api/recipes/${id}`);
        const recipe = response.data;
        setTitle(recipe.title);
        setDescription(recipe.description);
        setIngredients(recipe.ingredients);
        setInstructions(recipe.instructions);
        setPrepTime(recipe.prepTime);
        setCookTime(recipe.cookTime);
        setServings(recipe.servings);
        setDifficulty(recipe.difficulty);
        setCuisine(recipe.cuisine);
        setCategory(recipe.category);
        setTags(recipe.tags);
        setImage(recipe.image);
      } catch (error) {
        console.error("Error fetching the recipe:", error);
      }
    };
    fetchRecipe();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRecipe = {
      title,
      description,
      ingredients,
      instructions,
      prepTime,
      cookTime,
      servings,
      difficulty,
      cuisine,
      category,
      tags,
      image,
    };

    try {
      await axios.put(`/api/recipes/${id}`, updatedRecipe);
      navigate(`/recipes/${id}`); // Redirect to the recipe details page
    } catch (error) {
      console.error("Error updating the recipe:", error);
    }
  };

  // Add a new ingredient
  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  // Add a new instruction
  const addInstruction = () => {
    setInstructions([...instructions, { stepNumber: instructions.length + 1, instruction: '' }]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Recipe Title"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            className="mt-1 block w-full border-gray-300 rounded-md"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Recipe Description"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md"
                value={ingredient.name}
                onChange={(e) => {
                  const newIngredients = [...ingredients];
                  newIngredients[index].name = e.target.value;
                  setIngredients(newIngredients);
                }}
                placeholder="Ingredient Name"
                required
              />
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md"
                value={ingredient.quantity}
                onChange={(e) => {
                  const newIngredients = [...ingredients];
                  newIngredients[index].quantity = e.target.value;
                  setIngredients(newIngredients);
                }}
                placeholder="Quantity"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addIngredient}
            className="mt-2 bg-green-500 text-white py-1 px-3 rounded"
          >
            Add Another Ingredient
          </button>
        </div>
        <div>
          <label className="block text-gray-700">Instructions</label>
          {instructions.map((instruction, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="number"
                className="mt-1 block w-12 border-gray-300 rounded-md"
                value={instruction.stepNumber}
                readOnly
              />
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md"
                value={instruction.instruction}
                onChange={(e) => {
                  const newInstructions = [...instructions];
                  newInstructions[index].instruction = e.target.value;
                  setInstructions(newInstructions);
                }}
                placeholder="Instruction"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addInstruction}
            className="mt-2 bg-green-500 text-white py-1 px-3 rounded"
          >
            Add Another Instruction
          </button>
        </div>
        <div>
          <label className="block text-gray-700">Preparation Time (minutes)</label>
          <input
            type="number"
            className="mt-1 block w-full border-gray-300 rounded-md"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Cooking Time (minutes)</label>
          <input
            type="number"
            className="mt-1 block w-full border-gray-300 rounded-md"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Servings</label>
          <input
            type="number"
            className="mt-1 block w-full border-gray-300 rounded-md"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Difficulty</label>
          <select
            className="mt-1 block w-full border-gray-300 rounded-md"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            required
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Cuisine</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            placeholder="Cuisine Type"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Recipe Category"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Tags</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md"
            value={tags.join(', ')}
            onChange={(e) => setTags(e.target.value.split(',').map(tag => tag.trim()))}
            placeholder="Comma-separated tags"
          />
        </div>
        <div>
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter image URL"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
          >
          Update Recipe
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
