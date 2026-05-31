import { FaEgg, FaSun, FaMoon } from 'react-icons/fa';

export default function MealCard({
  mealType,
  meal,
  isActiveSlot,
  handleCardClick,
  handleEdit,
}) {
  const IconComponent =
    mealType === 'breakfast' ? FaEgg : mealType === 'lunch' ? FaSun : FaMoon;

  const cardStyle = isActiveSlot
    ? 'bg-green-50 border-2 border-green-500 shadow-lg scale-[1.02]'
    : 'bg-white border-2 border-transparent shadow-md';

  if (!meal) {
    return (
      <div
        className={`rounded-xl p-4 flex flex-col justify-center items-center h-full min-h-[100px] transition-all ${
          isActiveSlot
            ? 'bg-green-50/80 border-2 border-green-400 border-dashed'
            : 'bg-white/50 border border-white/50 shadow-sm'
        }`}
      >
        <IconComponent
          className={`text-lg mb-2 ${isActiveSlot ? 'text-green-500' : 'text-gray-400'}`}
        />
        <p
          className={`text-sm ${isActiveSlot ? 'text-green-700 font-semibold' : 'text-gray-500'}`}
        >
          No {mealType} planned
        </p>
        <button
          onClick={() => handleEdit(mealType, null)}
          className={`mt-2 text-xs font-medium px-3 py-1 rounded-full border ${
            isActiveSlot
              ? 'text-white bg-green-600 border-green-600'
              : 'text-green-600 bg-white border-green-200'
          }`}
        >
          Add Meal
        </button>
      </div>
    );
  }

  return (
    <div className={`rounded-xl p-4 transition-all ${cardStyle}`}>
      <div className='flex items-center gap-2 mb-3'>
        <IconComponent
          className={`text-sm ${isActiveSlot ? 'text-green-600' : 'text-gray-400'}`}
        />
        <h3
          className={`text-sm font-normal capitalize ${
            isActiveSlot ? 'text-green-800 font-bold' : 'text-gray-500'
          }`}
        >
          {mealType} {isActiveSlot && '(Now)'}
        </h3>
      </div>
      <div className='flex items-center justify-between'>
        <div
          onClick={() => handleCardClick(meal.recipeId)}
          className='flex items-center gap-3 cursor-pointer flex-1'
        >
          <div>
            <p className='font-semibold text-gray-800 line-clamp-1'>
              {meal.name}
            </p>
            <p
              className={`text-xs ${isActiveSlot ? 'text-green-700' : 'text-gray-500'}`}
            >
              {meal.minutes} min | {meal.calories} kcal
            </p>
          </div>
        </div>
        <button
          onClick={() => handleEdit(mealType, meal.recipeId)}
          className={`text-xs font-medium px-3 py-1 rounded-full border ${
            isActiveSlot
              ? 'text-green-700 border-green-400 bg-green-100'
              : 'text-green-600 border-green-200'
          }`}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
