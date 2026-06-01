import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import BottomNav from '../components/BottomNav';
import DaySection from '../components/DaySection';
import { calculateActiveMeal } from '../utils/mealPlanUtils';
import { useWeeklyPlan } from '../hooks/useWeeklyPlan';

export default function MealPlan() {
  const {
    weeklyData,
    isLoading,
    daysArray,
    handlePrevWeek,
    handleNextWeek,
    paramStart,
    paramEnd,
  } = useWeeklyPlan();

  const navigate = useNavigate();

  const [selectedSlots, setSelectedSlots] = useState({});
  const [currentActiveMeal, setCurrentActiveMeal] =
    useState(calculateActiveMeal);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActiveMeal(calculateActiveMeal());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCardClick = useCallback(
    (recipeId) => {
      if (recipeId) navigate(`/recipe/${recipeId}`);
    },
    [navigate],
  );

  const toggleSelection = useCallback(
    (dateStr, mealType, scheduleId, recipe_name) => {
      if (!scheduleId) return;

      const key = `${dateStr}_${mealType}`;
      setSelectedSlots((prev) => {
        const next = { ...prev };
        if (next[key]) delete next[key];
        else next[key] = { dateStr, mealType, scheduleId, recipe_name };
        return next;
      });
    },
    [],
  );

  const handleProceedToReplace = () => {
    const slotsArray = Object.values(selectedSlots);
    localStorage.setItem('pendingMealSwaps', JSON.stringify(slotsArray));
    navigate('/recommendations');
  };

  const selectionCount = Object.keys(selectedSlots).length;

  const selectedTypesByDate = useMemo(() => {
    const mapping = {};
    Object.values(selectedSlots).forEach((slot) => {
      if (!mapping[slot.dateStr]) {
        mapping[slot.dateStr] = [];
      }
      mapping[slot.dateStr].push(slot.mealType);
    });

    Object.keys(mapping).forEach((date) => {
      mapping[date] = mapping[date].join(',');
    });

    return mapping;
  }, [selectedSlots]);

  return (
    <div className='min-h-screen bg-gradient-to-b from-[#2E7D32] via-[#E8FCC1] to-[#F8F8F8] pt-16 md:pt-20 relative'>
      <div className='max-w-md md:max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-6 pb-32'>
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
          {daysArray.map(({ dateStr, displayDate }) => {
            const selectedTypesForDay = selectedTypesByDate[dateStr] || '';

            return (
              <DaySection
                key={dateStr}
                dateStr={dateStr}
                displayDate={displayDate}
                dayData={weeklyData[dateStr] || {}}
                currentActiveMeal={currentActiveMeal}
                handleCardClick={handleCardClick}
                toggleSelection={toggleSelection}
                selectedMealTypes={selectedTypesForDay}
              />
            );
          })}
        </div>
      </div>

      {selectionCount > 0 && (
        <div className='fixed bottom-24 left-0 right-0 px-4 flex justify-center z-40 pointer-events-none'>
          <button
            onClick={handleProceedToReplace}
            className='bg-[#2E7D32] text-white px-8 py-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.2)] font-bold pointer-events-auto border-2 border-white/20 transition-transform active:scale-95'
          >
            Replace {selectionCount} Recipe{selectionCount > 1 ? 's' : ''}
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
