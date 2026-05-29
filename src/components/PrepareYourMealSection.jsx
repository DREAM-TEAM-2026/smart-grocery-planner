import { FaEgg, FaSun, FaMoon } from 'react-icons/fa';

function PrepareYourMealSection({
  setActiveMealTab,
  activeMealTab,
  currentMeal,
}) {
  return (
    <div className='mb-6'>
      <h2 className='font-semibold text-gray-800 text-sm mb-2'>
        Prepare your Meal
      </h2>

      <div className='flex gap-2 mb-3'>
        <button
          onClick={() => setActiveMealTab('breakfast')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-colors ${
            activeMealTab === 'breakfast'
              ? 'bg-green-700 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          <FaEgg className='text-sm' />
          Breakfast
        </button>
        <button
          onClick={() => setActiveMealTab('lunch')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-colors ${
            activeMealTab === 'lunch'
              ? 'bg-green-700 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          <FaSun className='text-sm' />
          Lunch
        </button>
        <button
          onClick={() => setActiveMealTab('dinner')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-colors ${
            activeMealTab === 'dinner'
              ? 'bg-green-700 text-white'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          <FaMoon className='text-sm' />
          Dinner
        </button>
      </div>

      <div className='bg-white rounded-xl p-3 shadow-sm border border-gray-100'>
        <div className='text-center'>
          <span className='text-3xl'>{currentMeal.icon}</span>
          <h3 className='font-semibold text-sm mt-2'>{currentMeal.name}</h3>
          <p className='text-gray-500 text-xs mt-1'>
            {currentMeal.minutes} min | {currentMeal.calories} kcal
          </p>
          <span className='text-[10px] text-green-600 mt-2 block'>
            {currentMeal.label}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PrepareYourMealSection;
