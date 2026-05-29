import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaEgg, FaSun, FaMoon } from 'react-icons/fa';
import BottomNav from '../components/BottomNav';

function MealPlan() {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState('February');
  const [currentYear, setCurrentYear] = useState(2026);

  const weekDays = [
    { day: 'Sat', date: 22 },
    { day: 'Sun', date: 23 },
    { day: 'Mon', date: 24 },
    { day: 'Tue', date: 25 },
    { day: 'Wed', date: 26 },
    { day: 'Thu', date: 27 },
    { day: 'Fri', date: 28 },
  ];

  const [meals, setMeals] = useState({
    breakfast: { name: "Spicy Noodles", minutes: 15, calories: 450, icon: "🍜", recipeId: 2 },
    lunch: { name: "Spicy Noodles", minutes: 15, calories: 450, icon: "🍜", recipeId: 2 },
    dinner: { name: "Spicy Noodles", minutes: 15, calories: 450, icon: "🍜", recipeId: 2 },
  });

  const handleCardClick = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  const handleEdit = (mealType, currentRecipeId) => {
    sessionStorage.setItem('editingMealType', mealType);
    sessionStorage.setItem('currentRecipeId', currentRecipeId);
    navigate('/recommendations');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2E7D32] via-[#E8FCC1] to-[#F8F8F8] px-4 py-6 pb-24">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-white mb-2">Weekly Plan</h1>

        <div className="flex justify-between items-center mb-6">
          <button className="p-2 rounded-full bg-white/20 text-white">
            <FaArrowLeft className="text-sm" />
          </button>
          <h2 className="text-lg font-semibold text-white">{currentMonth} {currentYear}</h2>
          <button className="p-2 rounded-full bg-white/20 text-white">
            <FaArrowRight className="text-sm" />
          </button>
        </div>

        <div className="bg-white/30 backdrop-blur-sm rounded-xl p-3 shadow-lg mb-8">
          <div className="grid grid-cols-7 gap-1 text-center">
            {weekDays.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-xs text-white/80">{item.day}</div>
                <div className="text-sm font-semibold text-white">{item.date}</div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-lg font-semibold text-white mb-3">Your Meal Today</h2>

        {/* Breakfast */}
        <div className="bg-white rounded-xl p-4 shadow-md mb-3">
          <div className="flex items-center gap-2 mb-3">
            <FaEgg className="text-gray-400 text-sm" />
            <h3 className="text-gray-500 text-sm font-normal">Breakfast</h3>
          </div>
          <div className="flex items-center justify-between">
            <div 
              onClick={() => handleCardClick(meals.breakfast.recipeId)}
              className="flex items-center gap-4 cursor-pointer flex-1"
            >
              {/* Background icon besar w-20 h-20 dengan icon besar */}
              <div className="w-20 h-20 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: '#212121' }}>
                <span className="text-5xl">{meals.breakfast.icon}</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-lg">{meals.breakfast.name}</p>
                <p className="text-gray-500 text-sm">{meals.breakfast.minutes} min | {meals.breakfast.calories} kcal</p>
              </div>
            </div>
            <button
              onClick={() => handleEdit('breakfast', meals.breakfast.recipeId)}
              className="text-green-600 text-sm font-medium px-4 py-1.5 rounded-full border border-green-200 hover:bg-green-50"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Lunch */}
        <div className="bg-white rounded-xl p-4 shadow-md mb-3">
          <div className="flex items-center gap-2 mb-3">
            <FaSun className="text-gray-400 text-sm" />
            <h3 className="text-gray-500 text-sm font-normal">Lunch</h3>
          </div>
          <div className="flex items-center justify-between">
            <div 
              onClick={() => handleCardClick(meals.lunch.recipeId)}
              className="flex items-center gap-4 cursor-pointer flex-1"
            >
              <div className="w-20 h-20 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: '#212121' }}>
                <span className="text-5xl">{meals.lunch.icon}</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-lg">{meals.lunch.name}</p>
                <p className="text-gray-500 text-sm">{meals.lunch.minutes} min | {meals.lunch.calories} kcal</p>
              </div>
            </div>
            <button
              onClick={() => handleEdit('lunch', meals.lunch.recipeId)}
              className="text-green-600 text-sm font-medium px-4 py-1.5 rounded-full border border-green-200 hover:bg-green-50"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Dinner */}
        <div className="bg-white rounded-xl p-4 shadow-md mb-6">
          <div className="flex items-center gap-2 mb-3">
            <FaMoon className="text-gray-400 text-sm" />
            <h3 className="text-gray-500 text-sm font-normal">Dinner</h3>
          </div>
          <div className="flex items-center justify-between">
            <div 
              onClick={() => handleCardClick(meals.dinner.recipeId)}
              className="flex items-center gap-4 cursor-pointer flex-1"
            >
              <div className="w-20 h-20 rounded-xl flex items-center justify-center shadow-md" style={{ backgroundColor: '#212121' }}>
                <span className="text-5xl">{meals.dinner.icon}</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-lg">{meals.dinner.name}</p>
                <p className="text-gray-500 text-sm">{meals.dinner.minutes} min | {meals.dinner.calories} kcal</p>
              </div>
            </div>
            <button
              onClick={() => handleEdit('dinner', meals.dinner.recipeId)}
              className="text-green-600 text-sm font-medium px-4 py-1.5 rounded-full border border-green-200 hover:bg-green-50"
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default MealPlan;