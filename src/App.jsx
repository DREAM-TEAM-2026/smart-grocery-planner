import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { authClient } from './auth';
import AuthForm from './components/AuthForm';
import UserProfile from './components/UserProfile';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import CheckIngredients from './pages/CheckIngredients';
import Recommendations from './pages/Recommendations';
import RecipeDetail from './pages/RecipeDetail';
import MealPlan from './pages/MealPlan';
import './App.css';

function App() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const result = await authClient.getSession();
      setSession(result);
      setUser(result?.user);
      setLoading(false);
    };
    initAuth();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!session) {
    return <AuthForm />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/check-ingredients" element={<CheckIngredients />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/meal-plan" element={<MealPlan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;