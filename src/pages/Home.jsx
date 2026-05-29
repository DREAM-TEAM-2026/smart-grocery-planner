import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaSearch,
  FaPlus,
  FaTrashAlt,
  FaEgg,
  FaSun,
  FaMoon,
} from 'react-icons/fa';
import BottomNav from '../components/BottomNav';
import useLocalStorage from '../hooks/useLocalStorage.jsx';
import { ingredientsByCategory, categories } from '../constant/HomeData.jsx';

function Home() {
  const navigate = useNavigate();
  const [basket, setBasket] = useLocalStorage('ingredients', []);
  const [activeMealTab, setActiveMealTab] = useState('lunch');
  const [activeCategory, setActiveCategory] = useState('Veggies');
  const [searchQuery, setSearchQuery] = useState('');

  const mealsByTime = {
    breakfast: {
      name: 'Pancake',
      minutes: 10,
      calories: 320,
      icon: '🥞',
      label: 'Breakfast',
    },
    lunch: {
      name: 'Taco Salad Bowl',
      minutes: 15,
      calories: 450,
      icon: '🥗',
      label: 'Lunch',
    },
    dinner: {
      name: 'Chicken Curry',
      minutes: 45,
      calories: 520,
      icon: '🍛',
      label: 'Dinner',
    },
  };

  const currentMeal = mealsByTime[activeMealTab];

  const currentIngredients =
    ingredientsByCategory[activeCategory] || ingredientsByCategory.Veggies;

  const addToBasket = (newItem) => {
    setBasket((prev) => Array.from(new Set([...prev, newItem])));
  };

  const removeFromBasket = (index) => {
    setBasket((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
  };

  const handleNext = () => {
    if (basket.length > 0) {
      navigate('/check-ingredients', { state: { basket } });
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/recommendations?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/recommendations');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 pt-16 md:pt-20'>
      <div className='max-w-md md:max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-6 pb-20'>
        <div className='mb-4 md:mb-6'>
          <h1 className='text-xl md:text-2xl font-bold text-gray-800'>
            Hi, Sarah! 👋
          </h1>
          <p className='text-gray-500 text-sm md:text-base mt-0.5'>
            What would you like to cook today?
          </p>
        </div>

        <div className='relative mb-6 md:mb-8 max-w-md'>
          <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm' />
          <input
            type='text'
            placeholder='Search for recipes'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className='w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
          />
        </div>

        <div className='md:flex md:gap-8'>
          <div className='flex-1'>
            <div className='mb-6 md:mb-8'>
              <h2 className='font-semibold text-gray-800 text-sm md:text-base mb-2 md:mb-3'>
                Prepare your Meal
              </h2>

              <div className='md:hidden'>
                <div className='flex gap-2 mb-3'>
                  <button
                    onClick={() => setActiveMealTab('breakfast')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-colors ${activeMealTab === 'breakfast' ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <FaEgg className='text-sm' /> Breakfast
                  </button>
                  <button
                    onClick={() => setActiveMealTab('lunch')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-colors ${activeMealTab === 'lunch' ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <FaSun className='text-sm' /> Lunch
                  </button>
                  <button
                    onClick={() => setActiveMealTab('dinner')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-colors ${activeMealTab === 'dinner' ? 'bg-green-700 text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <FaMoon className='text-sm' /> Dinner
                  </button>
                </div>
                <div className='bg-white rounded-xl p-3 shadow-sm border border-gray-100'>
                  <div className='text-center'>
                    <span className='text-3xl'>{currentMeal.icon}</span>
                    <h3 className='font-semibold text-sm mt-2'>
                      {currentMeal.name}
                    </h3>
                    <p className='text-gray-500 text-xs mt-1'>
                      {currentMeal.minutes} min | {currentMeal.calories} kcal
                    </p>
                    <span className='text-[10px] text-green-600 mt-2 block'>
                      {currentMeal.label}
                    </span>
                  </div>
                </div>
              </div>

              <div className='hidden md:grid md:grid-cols-3 gap-4'>
                {Object.values(mealsByTime).map((meal) => (
                  <div
                    key={meal.label}
                    className='bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center'
                  >
                    <span className='text-4xl'>{meal.icon}</span>
                    <h3 className='font-semibold text-gray-800 mt-2'>
                      {meal.name}
                    </h3>
                    <p className='text-gray-500 text-sm'>
                      {meal.minutes} min | {meal.calories} kcal
                    </p>
                    <span className='text-xs text-green-600 mt-2 block'>
                      {meal.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className='font-semibold text-gray-800 text-sm md:text-base mb-2 md:mb-3'>
                Categories
              </h2>
              <div className='grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-3'>
                {categories.map((cat) => (
                  <div
                    key={cat.name}
                    onClick={() => handleCategoryClick(cat.name)}
                    className={`bg-white rounded-lg p-2 text-center shadow-sm border cursor-pointer hover:bg-gray-50 transition-colors ${activeCategory === cat.name ? 'ring-2 ring-green-500 border-green-500' : 'border-gray-100'}`}
                  >
                    <div className='flex justify-center text-lg md:text-xl'>
                      {cat.icon}
                    </div>
                    <p className='text-[10px] md:text-xs font-medium text-gray-700 mt-0.5 md:mt-1'>
                      {cat.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='md:w-80 mt-6 md:mt-0'>
            <div className='mb-6'>
              <h2 className='font-semibold text-gray-800 text-base mb-3'>
                Quick Add - {activeCategory}
              </h2>
              <div className='grid grid-cols-2 gap-2'>
                {currentIngredients.slice(0, 6).map((item) => (
                  <button
                    key={item}
                    onClick={() => addToBasket(item)}
                    className='bg-white rounded-lg p-2 text-center shadow-sm border border-gray-100 flex items-center justify-between px-2'
                  >
                    <span className='text-xs text-gray-700'>{item}</span>
                    <FaPlus className='text-green-600 text-xs' />
                  </button>
                ))}
              </div>
            </div>

            {basket.length > 0 && (
              <div className='bg-white rounded-xl p-4 shadow-md border border-gray-100'>
                <div className='flex justify-between items-center mb-2'>
                  <h2 className='font-semibold text-gray-800 text-sm'>
                    Your Basket ({basket.length})
                  </h2>
                </div>
                <div className='space-y-2 mb-3 max-h-48 overflow-y-auto'>
                  {basket.map((item, idx) => (
                    <div
                      key={idx}
                      className='flex justify-between items-center text-sm'
                    >
                      <span className='text-gray-700'>{item}</span>
                      <button
                        onClick={() => removeFromBasket(idx)}
                        className='text-red-500'
                      >
                        <FaTrashAlt className='text-xs' />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleNext}
                  className='w-full bg-green-700 text-white py-2 rounded-lg text-sm font-semibold'
                >
                  Next →
                </button>
              </div>
            )}
          </div>
        </div>

        <div className='md:hidden'>
          <div className='mb-6'>
            <h2 className='font-semibold text-gray-800 text-sm mb-2'>
              Quick Add - {activeCategory}
            </h2>
            <div className='grid grid-cols-2 gap-2'>
              {currentIngredients.slice(0, 6).map((item) => (
                <button
                  key={item}
                  onClick={() => addToBasket(item)}
                  className='bg-white rounded-lg p-2 text-center shadow-sm border border-gray-100 flex items-center justify-between px-3'
                >
                  <span className='text-sm text-gray-700'>{item}</span>
                  <FaPlus className='text-green-600 text-xs' />
                </button>
              ))}
            </div>
          </div>

          {basket.length > 0 && (
            <div className='mb-6 bg-white rounded-xl p-3 shadow-md border border-gray-100'>
              <h2 className='font-semibold text-gray-800 text-sm mb-2'>
                Your Basket ({basket.length})
              </h2>
              <div className='flex flex-wrap gap-1.5 mb-3'>
                {basket.map((item, idx) => (
                  <span
                    key={idx}
                    className='px-2 py-1 bg-gray-100 rounded-full text-xs flex items-center gap-1.5'
                  >
                    {item}
                    <button onClick={() => removeFromBasket(idx)}>
                      <FaTrashAlt className='text-red-500 text-[10px]' />
                    </button>
                  </span>
                ))}
              </div>
              <button
                onClick={handleNext}
                className='w-full bg-green-700 text-white py-2.5 rounded-xl text-sm font-semibold'
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

export default Home;
