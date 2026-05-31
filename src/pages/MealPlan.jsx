import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import BottomNav from '../components/BottomNav';
import DaySection from '../components/DaySection';
import { apiFetch } from '../utils/api';
import { formatYMD, addDays } from '../utils/dates';

export default function MealPlan() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [weeklyData, setWeeklyData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const todayStr = formatYMD(new Date());
  const paramStart = searchParams.get('start_date');
  const paramEnd = searchParams.get('end_date');

  const startDateStr = paramStart || todayStr;
  const endDateStr = paramEnd || formatYMD(addDays(new Date(), 6));

  const calculateActiveMeal = () => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) return 'breakfast';
    if (hour >= 11 && hour < 16) return 'lunch';
    if (hour >= 16 || hour < 4) return 'dinner';
    return null;
  };

  const [currentActiveMeal, setCurrentActiveMeal] =
    useState(calculateActiveMeal);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActiveMeal(calculateActiveMeal());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!paramStart || !paramEnd) {
      setSearchParams(
        { start_date: startDateStr, end_date: endDateStr },
        { replace: true },
      );
    }
  }, [paramStart, paramEnd, startDateStr, endDateStr, setSearchParams]);

  useEffect(() => {
    const fetchWeek = async () => {
      if (!paramStart || !paramEnd) return;

      setIsLoading(true);
      try {
        const query = new URLSearchParams({
          start_date: paramStart,
          end_date: paramEnd,
        }).toString();

        const result = await apiFetch(`calendar?${query}`, {
          method: 'GET',
          requireToken: true,
        });

        const normalizedData = {};
        if (result && result.data) {
          Object.entries(result.data).forEach(([dateKey, dailyMeals]) => {
            const formattedMeals = {};
            Object.entries(dailyMeals).forEach(([mealType, mealData]) => {
              formattedMeals[mealType] = {
                name: mealData.recipe_name,
                minutes: mealData.minutes,
                calories: mealData.calories,
                recipeId: mealData.id,
              };
            });
            normalizedData[dateKey] = formattedMeals;
          });
        }
        setWeeklyData(normalizedData);
      } catch (error) {
        console.error('Fetch failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeek();
  }, [paramStart, paramEnd]);

  const handlePrevWeek = () => {
    const newStart = formatYMD(addDays(startDateStr, -7));
    const newEnd = formatYMD(addDays(endDateStr, -7));
    setSearchParams({ start_date: newStart, end_date: newEnd });
  };

  const handleNextWeek = () => {
    const newStart = formatYMD(addDays(startDateStr, 7));
    const newEnd = formatYMD(addDays(endDateStr, 7));
    setSearchParams({ start_date: newStart, end_date: newEnd });
  };

  const renderDays = useMemo(() => {
    const days = [];
    for (let i = 0; i <= 6; i++) {
      const currentDate = addDays(startDateStr, i);
      days.push({
        dateStr: formatYMD(currentDate),
        displayDate: currentDate.toLocaleDateString('en-US', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
      });
    }
    return days;
  }, [startDateStr]);

  const handleCardClick = (recipeId) => {
    if (recipeId) navigate(`/recipe/${recipeId}`);
  };

  const handleEdit = (mealType, currentRecipeId) => {
    sessionStorage.setItem('editingMealType', mealType);
    sessionStorage.setItem('currentRecipeId', currentRecipeId);
    navigate('/recommendations');
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-[#2E7D32] via-[#E8FCC1] to-[#F8F8F8] pt-16 md:pt-20'>
      <div className='max-w-md md:max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-6 pb-24'>
        <div className='flex justify-between items-center mb-6 bg-white/20 p-3 rounded-2xl backdrop-blur-sm'>
          <button
            onClick={handlePrevWeek}
            className='p-3 rounded-full bg-white text-green-700 shadow-md'
          >
            <FaArrowLeft className='text-sm' />
          </button>
          <div className='text-center'>
            <h1 className='text-xl md:text-2xl font-bold text-white drop-shadow-md'>
              Weekly Plan
            </h1>
            {isLoading ? (
              <span className='text-sm text-white/90'>Loading...</span>
            ) : (
              <span className='text-sm text-white/90'>
                {paramStart} to {paramEnd}
              </span>
            )}
          </div>
          <button
            onClick={handleNextWeek}
            className='p-3 rounded-full bg-white text-green-700 shadow-md'
          >
            <FaArrowRight className='text-sm' />
          </button>
        </div>

        <div className='flex flex-col gap-8'>
          {renderDays.map(({ dateStr, displayDate }) => (
            <DaySection
              key={dateStr}
              dateStr={dateStr}
              displayDate={displayDate}
              dayData={weeklyData[dateStr] || {}}
              currentActiveMeal={currentActiveMeal}
              handleCardClick={handleCardClick}
              handleEdit={handleEdit}
            />
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
