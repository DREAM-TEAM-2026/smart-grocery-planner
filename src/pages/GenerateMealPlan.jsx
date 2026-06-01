import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { apiFetch } from '../utils/api';

function GenerateMealPlan() {
  const navigate = useNavigate();

  const [generatedMeals, setGeneratedMeals] = useState([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const groupedMeals = useMemo(() => {
    return generatedMeals.reduce((groups, meal) => {
      const date = meal.scheduled_date || 'Unknown Date';

      if (!groups[date]) {
        groups[date] = [];
      }

      groups[date].push(meal);
      return groups;
    }, {});
  }, [generatedMeals]);

  useEffect(() => {
    const generateMealPlan = async () => {
      setIsGenerating(true);
      setErrorMessage('');

      try {
        const minCalories = localStorage.getItem('minCalories');
        const storedIngredients = localStorage.getItem('ingredients');
        const ingredients = storedIngredients ? JSON.parse(storedIngredients) : [];

        if (!minCalories || ingredients.length === 0) {
          setErrorMessage('Missing minimum calories or ingredients. Please go back and try again.');
          setIsGenerating(false);
          return;
        }

        const response = await apiFetch('calendar/generate', {
          method: 'POST',
          requireToken: true,
          body: JSON.stringify({
            min_calories_per_day: Number(minCalories),
            ingredients,
          }),
        });

        const mealPlan = response?.data?.meal_plan;
        const responseTotalCalories = response?.data?.total_calories;


        if (!Array.isArray(mealPlan)) {
          setErrorMessage('Invalid generated meal plan response.');
          setIsGenerating(false);
          return;
        }


        setGeneratedMeals(mealPlan);
        setTotalCalories(Number(responseTotalCalories) || 0);
      } catch (error) {
        console.error('Failed to generate meal plan:', error);
        setErrorMessage(
            'Failed to generate your meal plan. Please go back and try again.',
        );
      } finally {
        setIsGenerating(false);
      }
    };

    generateMealPlan();
  }, []);

  const handleApplyMealPlan = async () => {
    if (generatedMeals.length === 0) return;

    setIsApplying(true);

    try {
      await apiFetch('calendar', {
        method: 'POST',
        requireToken: true,
        body: JSON.stringify(generatedMeals),
      });

      localStorage.removeItem('minCalories');

      navigate('/meal-plan');
    } catch (error) {
      console.error('Failed to apply meal plan:', error);
      alert('Failed to apply meal plan. Please try again.');
    } finally {
      setIsApplying(false);
    }
  };

  const handleCancel = () => {
    localStorage.removeItem('minCalories');
    navigate('/home');
  };

  return (
      <div className='min-h-screen bg-gray-50 pt-16 md:pt-20'>
        <div className='max-w-md md:max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-6 pb-28'>
          <div className='mb-6'>
            <h1 className='text-2xl md:text-3xl font-bold text-gray-800'>
              Generated Meal Plan
            </h1>
            <p className='text-gray-500 text-sm md:text-base mt-1'>
              Review your generated 7-day meal plan before applying it.
            </p>
          </div>

          {isGenerating && (
              <div className='bg-white rounded-2xl p-6 shadow-md text-center'>
                <p className='text-gray-700 font-semibold'>
                  Generating your meal plan...
                </p>
                <p className='text-gray-500 text-sm mt-1'>
                  Please wait while we prepare your recipes.
                </p>
              </div>
          )}

          {!isGenerating && errorMessage && (
              <div className='bg-red-50 border border-red-200 rounded-2xl p-5'>
                <p className='text-red-700 font-semibold'>{errorMessage}</p>
                <button
                    onClick={() => navigate('/home')}
                    className='mt-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700'
                >
                  Back to Home
                </button>
              </div>
          )}

          {!isGenerating && !errorMessage && (
              <>
                <div className='mb-5 bg-white rounded-2xl p-4 shadow-sm border border-gray-100'>
                  <div className='flex items-start justify-between gap-4'>
                    <div>
                      <p className='text-gray-800 font-semibold'>
                        Total Recipes: {generatedMeals.length}
                      </p>
                      <p className='text-gray-500 text-sm'>
                        This preview will only be saved after you click Apply Meal Plan.
                      </p>
                    </div>

                    <div className='shrink-0 bg-green-50 text-green-700 px-3 py-2 rounded-xl text-right'>
                      <p className='text-xs font-medium'>Total Calories</p>
                      <p className='text-sm font-bold'>{totalCalories}</p>
                    </div>
                  </div>
                </div>

                <div className='space-y-8'>
                  {Object.entries(groupedMeals).map(([date, meals]) => (
                      <section key={date}>
                        <h2 className='text-lg font-bold text-gray-800 mb-3'>
                          {date}
                        </h2>

                        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                          {meals.map((meal, index) => (
                              <article
                                  key={`${meal.scheduled_date}-${meal.meal_type}-${meal.recipe_name}-${index}`}
                                  className='bg-white rounded-2xl p-4 shadow-md border border-gray-100'
                              >
                                <div className='flex items-center justify-between mb-3'>
                                  <span className='capitalize text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full'>
                                    {meal.meal_type}
                                  </span>

                                  <span className='text-xs text-gray-500'>
                                    {meal.minutes} min
                                  </span>
                                </div>

                                <h3 className='text-base font-bold text-gray-800 mb-2'>
                                  {meal.recipe_name}
                                </h3>

                                <p className='text-sm text-gray-600 mb-3'>
                                  {meal.calories} calories
                                </p>

                                <div className='mb-3'>
                                  <p className='text-xs font-semibold text-gray-700 mb-1'>
                                    Ingredients
                                  </p>

                                  <div className='flex flex-wrap gap-1.5'>
                                    {(meal.ingredients || []).slice(0, 8).map((ingredient) => (
                                        <span key={ingredient} className='text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full'
                                        >
                                          {ingredient}
                                        </span>
                                    ))}

                                    {(meal.ingredients || []).length > 8 && (
                                        <span className='text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full'>
                                          +{meal.ingredients.length - 8} more
                                        </span>
                                    )}
                                  </div>
                                </div>

                                <div>
                                  <p className='text-xs font-semibold text-gray-700 mb-1'>
                                    Cooking Steps
                                  </p>

                                  <ol className='list-decimal list-inside space-y-1 text-xs text-gray-600'>
                                    {(meal.cooking_steps || []).slice(0, 3).map((step, stepIndex) => (
                                        <li key={`${meal.recipe_name}-step-${stepIndex}`}>
                                          {step}
                                        </li>
                                    ))}
                                  </ol>

                                  {(meal.cooking_steps || []).length > 3 && (
                                      <p className='text-xs text-gray-400 mt-1'>
                                        +{meal.cooking_steps.length - 3} more steps
                                      </p>
                                  )}
                                </div>
                              </article>
                          ))}
                        </div>
                      </section>
                  ))}
                </div>

                <div className='fixed bottom-20 md:bottom-6 left-0 right-0 px-4 flex justify-center z-40'>
                  <div className='w-full max-w-md md:max-w-xl bg-white rounded-2xl shadow-xl border border-gray-100 p-3 flex gap-3'>
                    <button
                        onClick={handleCancel}
                        disabled={isApplying}
                        className='flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl text-sm font-bold hover:bg-gray-50 disabled:opacity-60'
                    >
                      Cancel
                    </button>

                    <button
                        onClick={handleApplyMealPlan}
                        disabled={isApplying || generatedMeals.length === 0}
                        className='flex-1 bg-green-700 text-white py-3 rounded-xl text-sm font-bold hover:bg-green-800 disabled:opacity-60'
                    >
                      {isApplying ? 'Applying...' : 'Apply Meal Plan'}
                    </button>
                  </div>
                </div>
              </>
          )}
        </div>

        <BottomNav />
      </div>
  );
}

export default GenerateMealPlan;