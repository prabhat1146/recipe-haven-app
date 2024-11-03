import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function RecipeManager() {
    const [recipes, setRecipes] = useState([]);
    const [saveButtonText,setSaveButtonText]=useState("Save Recipe");
    const [newRecipe, setNewRecipe] = useState({
        id: null,
        title: '',
        description: '',
        ingredients: [{ name: '', quantity: '' }],
        instructions: [{ stepNumber: 1, instruction: '' }],
        prepTime: '',
        cookTime: '',
        servings: '',
        difficulty: 'Easy',
        cuisine: '',
        category: '',
        tags: [''],
        images: [],
        nutritionFacts: {
            calories: '',
            protein: '',
            fat: '',
            carbs: '',
            sugar: '',
            fiber: '',
            sodium: ''
        },
        author: ''
    });
    const [showMyRecipes, setShowMyRecipes] = useState(true);
    const [userId, setUserId] = useState('');

    const URL = process.env.REACT_APP_SERVER_API_URL;

    useEffect(() => {
        const fetchUserIdAndRecipes = async () => {
            const email = Cookies.get("email");
            if (email) {
                try {
                    const userResponse = await axios.get(`${URL}/auth/profile?email=${email}`);
                    const user = userResponse.data;
                    // console.log(user[0]._id);
                    setUserId(user[0]._id);

                    const recipesResponse = await axios.get(`${URL}/recipes/user/recipe?email=${email}`);
                    setRecipes(recipesResponse.data);
                } catch (error) {
                    console.error("Error fetching user or recipes:", error);
                }
            }
        };

        fetchUserIdAndRecipes();
    }, [URL]);

    useEffect(()=>{
        if (userId) {
            setNewRecipe(prev => ({ ...prev, author: userId }));
        }
    },[userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "tags") {
            const tagsArray = value.split(',')
                .map(tag => tag.trim())
                .filter(tag => tag !== '');

            setNewRecipe(prev => ({ ...prev, [name]: tagsArray }));
        } else {
            setNewRecipe(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && newRecipe.tags.length) {
            e.preventDefault();
            const tagsArray = newRecipe.tags.join(', ').split(',').map(tag => tag.trim()).filter(tag => tag);
            const newTag = e.target.value.trim();
            if (newTag && !tagsArray.includes(newTag)) {
                tagsArray.push(newTag);
                setNewRecipe(prev => ({ ...prev, tags: tagsArray }));
                e.target.value = '';
            }
        }
    };

    const handleNestedChange = (e, field) => {
        const { name, value } = e.target;
        setNewRecipe(prev => ({
            ...prev,
            [field]: { ...prev[field], [name]: value }
        }));
    };

    const handleArrayChange = (index, field, value, arrayField) => {
        const updatedArray = newRecipe[arrayField].map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setNewRecipe(prev => ({ ...prev, [arrayField]: updatedArray }));
    };

    const addIngredient = () => {
        setNewRecipe(prev => ({
            ...prev,
            ingredients: [...prev.ingredients, { name: '', quantity: '' }]
        }));
    };

    const addInstruction = () => {
        setNewRecipe(prev => ({
            ...prev,
            instructions: [...prev.instructions, { stepNumber: newRecipe.instructions.length + 1, instruction: '' }]
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const imageUrls = files.map(file => URL.createObjectURL(file));
        setNewRecipe(prev => ({ ...prev, images: imageUrls }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // const formData = new FormData();
    
        // for (const key in newRecipe) {
        //     if (Array.isArray(newRecipe[key])) {
        //         newRecipe[key].forEach(value => {
        //             formData.append(key, value);
        //         });
        //     } else {
        //         formData.append(key, newRecipe[key]);
        //     }
        // }
    
        try {
            const response = await axios.post(`${URL}/recipes/add`, newRecipe, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Recipe added:', response.data);
            setSaveButtonText("Saved");
        } catch (err) {
            console.error("Failed to submit recipe:", err);
        }
    };

    const resetForm = () => {
        setNewRecipe({
            id: null,
            title: '',
            description: '',
            ingredients: [{ name: '', quantity: '' }],
            instructions: [{ stepNumber: 1, instruction: '' }],
            prepTime: '',
            cookTime: '',
            servings: '',
            difficulty: 'Easy',
            cuisine: '',
            category: '',
            tags: [''],
            images: [],
            nutritionFacts: {
                calories: '',
                protein: '',
                fat: '',
                carbs: '',
                sugar: '',
                fiber: '',
                sodium: ''
            },
            author: userId
        });
    };

    const handleEditRecipe = (recipe) => {
        setNewRecipe(recipe);
    };
    const handleDeleteRecipe = (recipe) => {
        // setNewRecipe(recipe);
    };

    return (
        <div className="p-4 ml-10">

            <div className="mb-4">
                <button onClick={() => setShowMyRecipes(true)} className={`py-2 px-4 mr-2 ${showMyRecipes ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                    Show My Recipes
                </button>
                <button onClick={() => setShowMyRecipes(false)} className={`py-2 px-4 ${!showMyRecipes ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                    Add New Recipe
                </button>
            </div>

            {showMyRecipes ? (
                <div>
                <h2 className="text-2xl font-bold mb-4">My Recipes</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recipes.map(recipe => (
                        <div key={recipe.id} className="border p-4 bg-white rounded shadow hover:shadow-lg transition-shadow duration-300">
                            <h3 className="text-xl font-bold">{recipe.title}</h3>
                            <p className="text-gray-600 mb-2">{recipe.description}</p>
            
                            <h4 className="font-semibold mt-4">Ingredients:</h4>
                            <ul className="list-disc list-inside mb-2">
                                {recipe.ingredients.map((ing, index) => (
                                    <li key={index}>{ing.name} - {ing.quantity}</li>
                                ))}
                            </ul>
            
                            <h4 className="font-semibold">Instructions:</h4>
                            <ol className="list-decimal list-inside mb-2">
                                {recipe.instructions.map((instr, index) => (
                                    <li key={index}>{instr.instruction}</li>
                                ))}
                            </ol>
            
                            <h4 className="font-semibold">Cooking Time:</h4>
                            <p>{recipe.cookingTime} minutes</p>
            
                            <h4 className="font-semibold">Servings:</h4>
                            <p>{recipe.servings} servings</p>
            
                            <h4 className="font-semibold">Category:</h4>
                            <p>{recipe.category}</p>
            
                            {/* Nutrition Facts Section */}
                            <h4 className="font-semibold mt-4">Nutrition Facts:</h4>
                            <ul className="list-disc list-inside mb-2">
                                {recipe.nutritionFacts ? (
                                    <>
                                        {recipe.nutritionFacts.calories && <li>Calories: {recipe.nutritionFacts.calories} kcal</li>}
                                        {recipe.nutritionFacts.fat && <li>Fat: {recipe.nutritionFacts.fat} g</li>}
                                        {recipe.nutritionFacts.protein && <li>Protein: {recipe.nutritionFacts.protein} g</li>}
                                        {recipe.nutritionFacts.carbs && <li>Carbohydrates: {recipe.nutritionFacts.carbs} g</li>}
                                        {recipe.nutritionFacts.sugar && <li>Sugar: {recipe.nutritionFacts.sugar} g</li>}
                                        {recipe.nutritionFacts.fiber && <li>Fiber: {recipe.nutritionFacts.fiber} g</li>}
                                        {recipe.nutritionFacts.sodium && <li>Sodium: {recipe.nutritionFacts.sodium} mg</li>}
                                    </>
                                ) : (
                                    <li>No nutrition information available</li>
                                )}
                            </ul>
            
                            <div className="flex justify-between mt-4">
                                <button onClick={() => handleEditRecipe(recipe)} className="text-blue-500 hover:text-blue-700 transition-colors duration-200">Edit Recipe</button>
                                <button onClick={() => handleDeleteRecipe(recipe.id)} className="text-red-500 hover:text-red-700 transition-colors duration-200">Delete Recipe</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            
            ) : (
                <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded mt-4">
                    <h2 className="text-2xl font-bold mb-4">{newRecipe.id ? 'Update Recipe' : 'Add New Recipe'}</h2>

                    <input type="text" name="title" value={newRecipe.title} onChange={handleChange} placeholder="Title" required className="border p-2 w-full mb-2" />
                    <textarea name="description" value={newRecipe.description} onChange={handleChange} placeholder="Description" required className="border p-2 w-full mb-2" />

                    <h3 className="font-semibold mt-4">Ingredients</h3>
                    {newRecipe.ingredients.map((ingredient, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input type="text" value={ingredient.name} onChange={(e) => handleArrayChange(index, 'name', e.target.value, 'ingredients')} placeholder="Name" className="border p-2 w-1/2" />
                            <input type="text" value={ingredient.quantity} onChange={(e) => handleArrayChange(index, 'quantity', e.target.value, 'ingredients')} placeholder="Quantity" className="border p-2 w-1/2" />
                        </div>
                    ))}
                    <button type="button" onClick={addIngredient} className="text-blue-500">Add Ingredient</button>

                    <h3 className="font-semibold mt-4">Instructions</h3>
                    {newRecipe.instructions.map((instruction, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input type="text" value={instruction.instruction} onChange={(e) => handleArrayChange(index, 'instruction', e.target.value, 'instructions')} placeholder={`Step ${instruction.stepNumber}`} className="border p-2 w-1/2" />
                        </div>
                    ))}
                    <button type="button" onClick={addInstruction} className="text-blue-500">Add Instruction</button>

                    <input type="text" name="prepTime" value={newRecipe.prepTime} onChange={handleChange} placeholder="Preparation Time" className="border p-2 w-full mb-2" />
                    <input type="text" name="cookTime" value={newRecipe.cookTime} onChange={handleChange} placeholder="Cook Time" className="border p-2 w-full mb-2" />
                    <input type="text" name="servings" value={newRecipe.servings} onChange={handleChange} placeholder="Servings" className="border p-2 w-full mb-2" />
                    <input type="text" name="cuisine" value={newRecipe.cuisine} onChange={handleChange} placeholder="Cuisine" className="border p-2 w-full mb-2" />
                    <input type="text" name="category" value={newRecipe.category} onChange={handleChange} placeholder="Category" className="border p-2 w-full mb-2" />

                    <h3 className="font-semibold mt-4">Nutrition Facts</h3>
                    <div className="grid grid-cols-2 gap-4 mb-2">
                        <input type="text" name="calories" value={newRecipe.nutritionFacts.calories} onChange={(e) => handleNestedChange(e, 'nutritionFacts')} placeholder="Calories" className="border p-2 w-full" />
                        <input type="text" name="protein" value={newRecipe.nutritionFacts.protein} onChange={(e) => handleNestedChange(e, 'nutritionFacts')} placeholder="Protein (g)" className="border p-2 w-full" />
                        <input type="text" name="fat" value={newRecipe.nutritionFacts.fat} onChange={(e) => handleNestedChange(e, 'nutritionFacts')} placeholder="Fat (g)" className="border p-2 w-full" />
                        <input type="text" name="carbs" value={newRecipe.nutritionFacts.carbs} onChange={(e) => handleNestedChange(e, 'nutritionFacts')} placeholder="Carbs (g)" className="border p-2 w-full" />
                        <input type="text" name="sugar" value={newRecipe.nutritionFacts.sugar} onChange={(e) => handleNestedChange(e, 'nutritionFacts')} placeholder="Sugar (g)" className="border p-2 w-full" />
                        <input type="text" name="fiber" value={newRecipe.nutritionFacts.fiber} onChange={(e) => handleNestedChange(e, 'nutritionFacts')} placeholder="Fiber (g)" className="border p-2 w-full" />
                        <input type="text" name="sodium" value={newRecipe.nutritionFacts.sodium} onChange={(e) => handleNestedChange(e, 'nutritionFacts')} placeholder="Sodium (mg)" className="border p-2 w-full" />
                    </div>

                    <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">{saveButtonText}</button>
                </form>
            )}
        </div>
    );
}

export default RecipeManager;
