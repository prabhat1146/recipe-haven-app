// src/pages/allPages.js

// User Pages
import UserProfile from './user/UserProfile';
import UserSettings from './user/UserSettings';
import UserRecipes from './user/UserRecipes';

// Admin Pages
import AdminDashboard from './admin/AdminDashboard';
import ManageUsers from './admin/ManageUsers';
import ManageRecipes from './admin/ManageRecipes';

// Recipe Pages
import RecipeList from './recipes/RecipeList';
import RecipeDetails from './recipes/RecipeDetails';
import AddRecipe from './recipes/AddRecipe';
import EditRecipe from './recipes/EditRecipe';

// General Pages
import Home from './Home';
import NotFound from './NotFound';
import Login from '../components/Login';
import Signup from '../components/SignUp';

export {
    UserProfile,
    UserSettings,
    UserRecipes,
    AdminDashboard,
    ManageUsers,
    ManageRecipes,
    RecipeList,
    RecipeDetails,
    AddRecipe,
    EditRecipe,
    Home,
    NotFound,
    Login,
    Signup
};