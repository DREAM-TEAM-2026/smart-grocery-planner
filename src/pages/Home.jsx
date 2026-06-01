import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import useLocalStorage from '../hooks/useLocalStorage.jsx';
import { ingredientsByCategory, categories } from '../constant/HomeData.jsx';
import { AuthContext } from '../context/AuthContext.jsx';
import {useTodayMeals} from "../hooks/useTodayMeals.jsx";
import TodayMealSection from "../components/TodayMealSelection.jsx";
import QuickAddIngredients from "../components/QuickAddIngredients.jsx";
import BasketPanel from "../components/BasketPanel.jsx";


function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [basket, setBasket] = useLocalStorage('ingredients', []);
  const [activeMealTab, setActiveMealTab] = useState('lunch');
  const [activeCategory, setActiveCategory] = useState('Veggies');

  const [inputIngredient, setInputIngredient] = useState('');
  const [inputMinCalories, setInputMinCalories] = useState();
  const [inputMaxCalories, setInputMaxCalories] = useState();

  const { mealsByTime, isLoading, errorMessage } = useTodayMeals();

  const currentIngredients =
    ingredientsByCategory[activeCategory] || ingredientsByCategory.Veggies;

  const addToBasket = (newItem) => {
    setBasket((prev) => (prev.includes(newItem) ? prev : [...prev, newItem]));
  };

  const addInputToBasket = () => {
    if (inputIngredient.trim()) {
      addToBasket(inputIngredient.trim());
      setInputIngredient('');
    }
  };

  const removeFromBasket = (index) => {
    setBasket((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (basket.length === 0) return;

    localStorage.setItem('maxCalories', inputMaxCalories);
    localStorage.setItem('minCalories', inputMinCalories);
    navigate('/check-ingredients');
  };

  return (
    <div className='min-h-screen bg-gray-50 pt-16 md:pt-20'>
      <div className='max-w-md md:max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 pb-20'>
        {/* Header */}
        <div className='mb-4 md:mb-6'>
          <h1 className='text-xl md:text-2xl font-bold text-gray-800'>
            Hi, {user.name}! 👋
          </h1>
          <p className='text-gray-500 text-sm md:text-base mt-0.5'>
            What would you like to cook today?
          </p>
        </div>

        <div className='md:flex md:gap-8'>
          {/* Kolom Kiri */}
          <div className='flex-1'>
            {/* Prepare your Meal */}
            <TodayMealSection
                mealsByTime={mealsByTime}
                activeMealTab={activeMealTab}
                setActiveMealTab={setActiveMealTab}
                isLoading={isLoading}
                errorMessage={errorMessage}
            />

            <QuickAddIngredients
                categories={categories}
                activeCategory={activeCategory}
                currentIngredients={currentIngredients}
                onCategoryClick={setActiveCategory}
                onAddIngredient={addToBasket}
            />
          </div>

          {/* Kolom Kanan - Input Bahan & Basket */}
          <BasketPanel
              basket={basket}
              inputIngredient={inputIngredient}
              inputMinCalories={inputMinCalories}
              inputMaxCalories={inputMaxCalories}
              setInputIngredient={setInputIngredient}
              setInputMinCalories={setInputMinCalories}
              setInputMaxCalories={setInputMaxCalories}
              onAddInputIngredient={addInputToBasket}
              onRemoveIngredient={removeFromBasket}
              onNext={handleNext}
          />
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default Home;
