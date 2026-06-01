import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Recommendations from './pages/Recommendations';
import RecipeDetail from './pages/RecipeDetail';
import MealPlan from './pages/MealPlan';
import './App.css';
import ShoppingList from './pages/ShoppingList';
import Profile from './pages/Profile';
import GenerateMealPlan from "./pages/GenerateMealPlan.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Landing />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/home' element={<Home />} />
            <Route path='/recommendations' element={<Recommendations />} />
            <Route path='/recipe/:id' element={<RecipeDetail />} />
            <Route path='/meal-plan' element={<MealPlan />} />
            <Route path='/generate-meal-plan' element={<GenerateMealPlan />} />
            <Route path='/shopping-list' element={<ShoppingList />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
