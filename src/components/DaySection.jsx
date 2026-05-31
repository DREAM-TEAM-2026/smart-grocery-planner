import { memo } from 'react';
import MealCard from './MealCard';
import { formatYMD } from '../utils/dates';

const MEAL_TYPES = ['breakfast', 'lunch', 'dinner'];

const DaySection = memo(
  ({
    dateStr,
    displayDate,
    dayData,
    currentActiveMeal,
    handleCardClick,
    toggleSelection,
    selectedMealTypes,
  }) => {
    const isToday = dateStr === formatYMD(new Date());

    return (
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-4'>
          <div className='h-px bg-green-700/30 flex-1'></div>
          <h2 className='text-green-800 font-bold text-sm uppercase tracking-widest'>
            {displayDate}
          </h2>
          <div className='h-px bg-green-700/30 flex-1'></div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {MEAL_TYPES.map((mealType) => {
            const meal = dayData[mealType];
            const isActiveSlot = isToday && mealType === currentActiveMeal;
            const isSelected = selectedMealTypes.includes(mealType);

            return (
              <MealCard
                key={mealType}
                dateStr={dateStr}
                mealType={mealType}
                meal={meal}
                isActiveSlot={isActiveSlot}
                isSelected={isSelected}
                handleCardClick={handleCardClick}
                toggleSelection={toggleSelection}
              />
            );
          })}
        </div>
      </div>
    );
  },
);

export default DaySection;
