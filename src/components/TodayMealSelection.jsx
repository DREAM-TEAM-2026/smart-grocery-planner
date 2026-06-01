import { FaEgg, FaSun, FaMoon } from 'react-icons/fa';
import MealPreviewCard from './MealPreviewCard';

function TodayMealSection({
                              mealsByTime,
                              activeMealTab,
                              setActiveMealTab,
                              isLoading,
                              errorMessage,
                          }) {
    const currentMeal = mealsByTime[activeMealTab];

    const MEAL_TYPES = ['breakfast', 'lunch', 'dinner'];

    if (isLoading) {
        return (
            <div className='mb-6 md:mb-8'>
                <h2 className='font-semibold text-gray-800 text-sm md:text-base mb-2 md:mb-3'>
                    Prepare your Meal
                </h2>
                <div className='rounded-xl p-4 bg-white shadow-sm text-sm text-gray-500'>
                    Loading today meals...
                </div>
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className='mb-6 md:mb-8'>
                <h2 className='font-semibold text-gray-800 text-sm md:text-base mb-2 md:mb-3'>
                    Prepare your Meal
                </h2>
                <div className='rounded-xl p-4 bg-red-50 text-red-600 text-sm'>
                    {errorMessage}
                </div>
            </div>
        );
    }

    return (
        <div className='mb-6 md:mb-8'>
            <h2 className='font-semibold text-gray-800 text-sm md:text-base mb-2 md:mb-3'>
                Prepare your Meal
            </h2>

            <div className='md:hidden'>
                <div className='flex gap-2 mb-3'>
                    <button
                        onClick={() => setActiveMealTab('breakfast')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-colors ${
                            activeMealTab === 'breakfast'
                                ? 'bg-green-700 text-white'
                                : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                        <FaEgg className='text-sm' /> Breakfast
                    </button>

                    <button
                        onClick={() => setActiveMealTab('lunch')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-colors ${
                            activeMealTab === 'lunch'
                                ? 'bg-green-700 text-white'
                                : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                        <FaSun className='text-sm' /> Lunch
                    </button>

                    <button
                        onClick={() => setActiveMealTab('dinner')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-colors ${
                            activeMealTab === 'dinner'
                                ? 'bg-green-700 text-white'
                                : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                        <FaMoon className='text-sm' /> Dinner
                    </button>
                </div>

                <MealPreviewCard
                    mealType={activeMealTab}
                    meal={currentMeal}
                    isActiveSlot
                />
            </div>

            <div className='hidden md:grid md:grid-cols-3 gap-4'>
                {MEAL_TYPES.map((mealType) => (
                    <MealPreviewCard
                        key={mealType}
                        mealType={mealType}
                        meal={mealsByTime[mealType]}
                        isActiveSlot={mealType === activeMealTab}
                    />
                ))}
            </div>
        </div>
    );
}

export default TodayMealSection;