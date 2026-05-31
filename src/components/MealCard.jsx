import { memo } from 'react';
import { FaEgg, FaSun, FaMoon, FaCheckCircle } from 'react-icons/fa';

const MealCard = memo(
  ({
    dateStr,
    mealType,
    meal,
    isActiveSlot,
    isSelected,
    handleCardClick,
    toggleSelection,
  }) => {
    const IconComponent =
      mealType === 'breakfast' ? FaEgg : mealType === 'lunch' ? FaSun : FaMoon;

    const baseStyle = 'rounded-xl p-4 transition-all relative border-2 ';

    let cardStyle = baseStyle;
    if (isSelected) {
      cardStyle += 'bg-green-100 border-green-600 shadow-md scale-[1.02]';
    } else if (isActiveSlot) {
      cardStyle += 'bg-green-50 border-green-400 shadow-lg';
    } else {
      cardStyle += 'bg-white border-transparent shadow-sm';
    }

    const onToggle = (e) => {
      e.stopPropagation();
      const scheduleId = meal ? meal.scheduleId : null;
      toggleSelection(dateStr, mealType, scheduleId, meal.recipe_name);
    };

    const onCardClick = () => {
      if (meal?.scheduleId) handleCardClick(meal.scheduleId);
    };

    if (!meal) {
      return (
        <div
          className={`${baseStyle} flex flex-col justify-center items-center h-full min-h-[100px] ${
            isActiveSlot
              ? 'bg-green-50/80 border-green-400 border-dashed'
              : 'bg-white/50 border-white/50'
          }`}
        >
          <IconComponent
            className={`text-lg mb-2 ${isActiveSlot ? 'text-green-600' : 'text-gray-400'}`}
          />
          <p
            className={`text-sm ${isActiveSlot ? 'text-green-800 font-semibold' : 'text-gray-500'}`}
          >
            No {mealType} planned
          </p>
        </div>
      );
    }

    return (
      <div className={cardStyle}>
        {isSelected && (
          <div className='absolute -top-2 -right-2 bg-white rounded-full'>
            <FaCheckCircle className='text-green-600 text-xl' />
          </div>
        )}

        <div className='flex items-center gap-2 mb-3'>
          <IconComponent
            className={`text-sm ${isSelected || isActiveSlot ? 'text-green-700' : 'text-gray-400'}`}
          />
          <h3
            className={`text-sm font-normal capitalize ${isSelected || isActiveSlot ? 'text-green-900 font-bold' : 'text-gray-500'}`}
          >
            {mealType} {isActiveSlot && '(Now)'}
          </h3>
        </div>

        <div className='flex items-center justify-between'>
          <div
            onClick={onCardClick}
            className='flex items-center gap-3 cursor-pointer flex-1'
          >
            <div>
              <p className='font-semibold text-gray-800 line-clamp-1'>
                {meal.recipe_name}
              </p>
              <p
                className={`text-xs ${isSelected || isActiveSlot ? 'text-green-800' : 'text-gray-500'}`}
              >
                {meal.minutes} min | {meal.calories} kcal
              </p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className={`text-xs font-medium px-4 py-1.5 rounded-full border transition-colors ${
              isSelected
                ? 'text-white bg-green-600 border-green-600'
                : isActiveSlot
                  ? 'text-green-700 border-green-400 bg-green-100'
                  : 'text-green-600 border-green-200 hover:bg-green-50'
            }`}
          >
            {isSelected ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    );
  },
);

export default MealCard;
