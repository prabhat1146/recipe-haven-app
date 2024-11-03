
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
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
} from './pages/allPages';

import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Sidebar from './components/Layout/Sidebar';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <Header />
          <main className=" flex-grow overflow-y-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
              {/* User Routes */}
              <Route path="/user/profile" element={<UserProfile />} />
              <Route path="/user/settings" element={<UserSettings />} />
              <Route path="/user/recipes" element={<UserRecipes />} />
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/manage-users" element={<ManageUsers />} />
              <Route path="/admin/manage-recipes" element={<ManageRecipes />} />
              {/* Recipe Routes */}
              <Route path="/recipes" element={<RecipeList />} />
              <Route path="/recipes/:id" element={<RecipeDetails />} />
              <Route path="/add-recipe" element={<AddRecipe />} />
              <Route path="/edit-recipe/:id" element={<EditRecipe />} />

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
            <Footer />
          </main>
          
        </div>
      </div>
    </Router>
  );
}

export default App;
