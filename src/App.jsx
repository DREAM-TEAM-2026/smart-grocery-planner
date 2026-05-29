import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import CheckIngredients from './pages/CheckIngredients';
import Recommendations from './pages/Recommendations';
import RecipeDetail from './pages/RecipeDetail';
import MealPlan from './pages/MealPlan';

function App() {
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