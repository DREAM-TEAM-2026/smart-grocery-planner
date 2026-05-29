import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaEgg, FaSun, FaMoon } from 'react-icons/fa';
import BottomNav from '../components/BottomNav';

function MealPlan() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const cardRefs = useRef({});
  
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 1, 22));
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date(2026, 1, 19));

  const getWeekDays = (startDate) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days.map((_, i) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      return {
        day: days[date.getDay()],
        date: date.getDate(),
        fullDate: date,
        month: date.toLocaleString('default', { month: 'long' }),
        year: date.getFullYear()
      };
    });
  };

  const weekDays = getWeekDays(currentWeekStart);
  
  const selectedIndex = weekDays.findIndex(item => 
    selectedDate && 
    item.fullDate.getDate() === selectedDate.getDate() &&
    item.fullDate.getMonth() === selectedDate.getMonth()
  );
  
  const displayMonth = weekDays[3]?.month || 'February';
  const displayYear = weekDays[3]?.year || 2026;

  const [meals, setMeals] = useState({
    breakfast: { name: "Spicy Noodles", minutes: 15, calories: 450, icon: "🍜", recipeId: 2 },
    lunch: { name: "Taco Salad Bowl", minutes: 15, calories: 450, icon: "🥗", recipeId: 1 },
    dinner: { name: "Chicken Curry", minutes: 45, calories: 520, icon: "🍛", recipeId: 3 },
  });

  const handleCardClick = (recipeId) => {
    if (recipeId) navigate(`/recipe/${recipeId}`);
  };

  const handleEdit = (mealType, currentRecipeId) => {
    sessionStorage.setItem('editingMealType', mealType);
    sessionStorage.setItem('currentRecipeId', currentRecipeId);
    navigate('/recommendations');
  };

  const centerScroll = () => {
    if (scrollContainerRef.current && cardRefs.current[selectedIndex]) {
      const container = scrollContainerRef.current;
      const selectedCard = cardRefs.current[selectedIndex];
      const containerWidth = container.clientWidth;
      const cardWidth = selectedCard.clientWidth;
      const cardLeft = selectedCard.offsetLeft;
      const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);
      container.scrollLeft = Math.max(0, scrollPosition);
    }
  };

  const handleDateSelect = (date, fullDate, idx) => {
    setSelectedDate(fullDate);
    const newStartDate = new Date(fullDate);
    newStartDate.setDate(fullDate.getDate() - 3);
    setCurrentWeekStart(newStartDate);
    
    setTimeout(() => {
      if (cardRefs.current[idx]) {
        const container = scrollContainerRef.current;
        const selectedCard = cardRefs.current[idx];
        const containerWidth = container.clientWidth;
        const cardWidth = selectedCard.clientWidth;
        const cardLeft = selectedCard.offsetLeft;
        const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);
        container.scrollLeft = Math.max(0, scrollPosition);
      }
    }, 50);
  };

  const handlePrevWeek = () => {
    const newStartDate = new Date(currentWeekStart);
    newStartDate.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(newStartDate);
    const newSelectedDate = new Date(newStartDate);
    newSelectedDate.setDate(newStartDate.getDate() + 3);
    setSelectedDate(newSelectedDate);
  };

  const handleNextWeek = () => {
    const newStartDate = new Date(currentWeekStart);
    newStartDate.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(newStartDate);
    const newSelectedDate = new Date(newStartDate);
    newSelectedDate.setDate(newStartDate.getDate() + 3);
    setSelectedDate(newSelectedDate);
  };

  const isSelected = (dateItem) => {
    return selectedDate && 
           dateItem.fullDate.getDate() === selectedDate.getDate() &&
           dateItem.fullDate.getMonth() === selectedDate.getMonth();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      centerScroll();
    }, 50);
    return () => clearTimeout(timeout);
  }, [selectedIndex, currentWeekStart]);

  useEffect(() => {
    centerScroll();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2E7D32] via-[#E8FCC1] to-[#F8F8F8] pt-16 md:pt-20">
      <div className="max-w-md md:max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-6 pb-24">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-4 drop-shadow-md">Weekly Plan</h1>

        <div className="flex justify-between items-center mb-6">
          <button onClick={handlePrevWeek} className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors">
            <FaArrowLeft className="text-sm" />
          </button>
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-semibold text-white drop-shadow-sm">{displayMonth}</h2>
            <p className="text-sm text-white/80">{displayYear}</p>
          </div>
          <button onClick={handleNextWeek} className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors">
            <FaArrowRight className="text-sm" />
          </button>
        </div>

        {/* Week Grid */}
        <div className="mb-8">
          {/* Desktop View */}
          <div className="hidden md:grid md:grid-cols-7 gap-3">
            {weekDays.map((item, idx) => {
              const active = isSelected(item);
              return (
                <div 
                  key={idx} 
                  onClick={() => handleDateSelect(item.date, item.fullDate, idx)}
                  className={`flex flex-col items-center justify-center rounded-2xl cursor-pointer py-3 transition-all ${
                    active 
                      ? 'bg-white border-2 border-[#2E7D32] shadow-md' 
                      : 'bg-white/30 backdrop-blur-sm border border-white/50 hover:bg-white/40'
                  }`}
                >
                  <div className={`flex items-center justify-center rounded-full ${active ? 'w-10 h-10 bg-[#2E7D32]' : ''}`}>
                    <span className={`font-bold ${active ? 'text-white text-base' : 'text-gray-800 text-sm'}`}>
                      {item.date}
                    </span>
                  </div>
                  <span className={`text-xs mt-1 ${active ? 'text-gray-600' : 'text-gray-700 font-medium'}`}>
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Mobile View */}
          <div 
            ref={scrollContainerRef}
            className="flex md:hidden overflow-x-auto gap-2 pb-2 px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {weekDays.map((item, idx) => {
              const active = isSelected(item);
              return (
                <div 
                  key={idx} 
                  ref={el => cardRefs.current[idx] = el}
                  onClick={() => handleDateSelect(item.date, item.fullDate, idx)}
                  className={`flex-shrink-0 flex flex-col items-center justify-center rounded-2xl cursor-pointer py-2 w-14 ${
                    active 
                      ? 'bg-white border border-[#2E7D32] shadow-md' 
                      : 'bg-white/20 backdrop-blur-sm border border-[#2E7D32]/30'
                  }`}
                >
                  <div className={`flex items-center justify-center rounded-full ${active ? 'w-9 h-9 bg-[#2E7D32]' : ''}`}>
                    <span className={`font-bold ${active ? 'text-white text-sm' : 'text-white text-sm'}`}>
                      {item.date}
                    </span>
                  </div>
                  <span className={`text-[10px] mt-1 ${active ? 'text-gray-600' : 'text-white/80'}`}>
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Your Meal Today - Mobile: putih, Desktop: gelap */}
        <h2 className="text-xl font-semibold text-white md:text-gray-800 mb-4">Your Meal Today</h2>

        {/* Desktop: grid 3 kolom, Mobile: 1 kolom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Breakfast */}
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <FaEgg className="text-gray-400 text-sm" />
              <h3 className="text-gray-500 text-sm font-normal">Breakfast</h3>
            </div>
            <div className="flex items-center justify-between">
              <div onClick={() => handleCardClick(meals.breakfast.recipeId)} className="flex items-center gap-3 cursor-pointer flex-1">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: '#212121' }}>
                  <span className="text-3xl">{meals.breakfast.icon}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{meals.breakfast.name}</p>
                  <p className="text-gray-500 text-xs">{meals.breakfast.minutes} min | {meals.breakfast.calories} kcal</p>
                </div>
              </div>
              <button onClick={() => handleEdit('breakfast', meals.breakfast.recipeId)} className="text-green-600 text-xs font-medium px-3 py-1 rounded-full border border-green-200">
                Edit
              </button>
            </div>
          </div>

          {/* Lunch */}
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <FaSun className="text-gray-400 text-sm" />
              <h3 className="text-gray-500 text-sm font-normal">Lunch</h3>
            </div>
            <div className="flex items-center justify-between">
              <div onClick={() => handleCardClick(meals.lunch.recipeId)} className="flex items-center gap-3 cursor-pointer flex-1">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: '#212121' }}>
                  <span className="text-3xl">{meals.lunch.icon}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{meals.lunch.name}</p>
                  <p className="text-gray-500 text-xs">{meals.lunch.minutes} min | {meals.lunch.calories} kcal</p>
                </div>
              </div>
              <button onClick={() => handleEdit('lunch', meals.lunch.recipeId)} className="text-green-600 text-xs font-medium px-3 py-1 rounded-full border border-green-200">
                Edit
              </button>
            </div>
          </div>

          {/* Dinner */}
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <FaMoon className="text-gray-400 text-sm" />
              <h3 className="text-gray-500 text-sm font-normal">Dinner</h3>
            </div>
            <div className="flex items-center justify-between">
              <div onClick={() => handleCardClick(meals.dinner.recipeId)} className="flex items-center gap-3 cursor-pointer flex-1">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: '#212121' }}>
                  <span className="text-3xl">{meals.dinner.icon}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{meals.dinner.name}</p>
                  <p className="text-gray-500 text-xs">{meals.dinner.minutes} min | {meals.dinner.calories} kcal</p>
                </div>
              </div>
              <button onClick={() => handleEdit('dinner', meals.dinner.recipeId)} className="text-green-600 text-xs font-medium px-3 py-1 rounded-full border border-green-200">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default MealPlan;