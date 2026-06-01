import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaSearch,
  FaArrowLeft,
  FaTrash,
  FaCheck,
  FaTimes,
} from 'react-icons/fa';
import BottomNav from '../components/BottomNav';
import { apiFetch } from '../utils/api';

function Recommendations() {
  const navigate = useNavigate();

  const [pendingSwaps] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('pendingMealSwaps') || '[]');
    } catch {
      return [];
    }
  });
  const [mappedSwaps, setMappedSwaps] = useState({});

  const [basket, setBasket] = useState(() => {
    try {
      const localIngredients = JSON.parse(
        localStorage.getItem('ingredients') || '[]',
      );
      return Array.isArray(localIngredients) ? localIngredients : [];
    } catch {
      return [];
    }
  });
  const [ingredientInput, setIngredientInput] = useState('');
  const [minCalories, setMinCalories] = useState('');
  const [maxCalories, setMaxCalories] = useState('');

  const [generatedRecipes, setGeneratedRecipes] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedSlotId, setSelectedSlotId] = useState('');

  const addIngredient = () => {
    const val = ingredientInput.trim();
    if (val && !basket.includes(val)) {
      const newBasket = [...basket, val];
      setBasket(newBasket);
      localStorage.setItem('ingredients', JSON.stringify(newBasket));
      setIngredientInput('');
    }
  };

  const removeIngredient = (ing) => {
    const newBasket = basket.filter((b) => b !== ing);
    setBasket(newBasket);
    localStorage.setItem('ingredients', JSON.stringify(newBasket));
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (basket.length === 0)
      return alert('Please add at least one ingredient to the basket.');

    setIsGenerating(true);
    try {
      const payload = {
        ingredients: basket,
      };
      if (minCalories) payload.min_calories = Number(minCalories);
      if (maxCalories) payload.max_calories = Number(maxCalories);

      const response = await apiFetch('recommend', {
        method: 'POST',
        requireToken: true,
        body: JSON.stringify(payload),
      });

      setGeneratedRecipes(response?.data?.recipes || []);
    } catch (error) {
      console.error('Failed to generate recipes', error);
      alert('Failed to get recommendations. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAssignSlot = () => {
    if (!selectedSlotId || !selectedRecipe) return;
    setMappedSwaps((prev) => ({
      ...prev,
      [selectedSlotId]: selectedRecipe,
    }));
    setModalOpen(false);
    setSelectedRecipe(null);
    setSelectedSlotId('');
  };

  const handleApplySwaps = async () => {
    setIsApplying(true);
    try {
      const swaps = Object.entries(mappedSwaps).map(
        ([target_schedule_id, recipe]) => ({
          target_schedule_id,
          recipe_name: recipe.recipe_name || recipe.name,
          minutes: recipe.minutes || 30,
          calories: recipe.calories || 0,
          ingredients: recipe.ingredients || [],
          cooking_steps: recipe.cooking_steps || [],
          image: recipe.image || '',
        }),
      );

      await apiFetch('calendar', {
        method: 'PATCH',
        requireToken: true,
        body: JSON.stringify({ swaps }),
      });

      localStorage.removeItem('pendingMealSwaps');
      navigate('/meal-plan');
    } catch (err) {
      console.error('Failed to apply swaps:', err);
      alert('Failed to apply meal swaps.');
    } finally {
      setIsApplying(false);
    }
  };

  const neededSwapsCount = pendingSwaps.length;
  const mappedSwapsCount = Object.keys(mappedSwaps).length;
  const isReadyToApply =
    neededSwapsCount > 0 && neededSwapsCount === mappedSwapsCount;

  return (
    <div className='min-h-screen bg-gray-50 pt-16 md:pt-20'>
      <div className='max-w-md md:max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8 pb-32'>
        <button
          onClick={() => navigate(-1)}
          className='mb-4 text-gray-600 font-semibold flex items-center gap-1 text-sm'
        >
          <FaArrowLeft className='text-sm' /> Back to Meal Plan
        </button>

        {/* Mapped Status UI */}
        <div className='bg-green-50 border border-green-200 rounded-xl p-4 mb-6 shadow-sm'>
          <h2 className='font-bold text-green-800 text-lg mb-2'>
            Replacing {pendingSwaps.length} Meal(s)
          </h2>
          <div className='space-y-2'>
            {pendingSwaps.map((slot) => {
              const mappedRecipe = mappedSwaps[slot.scheduleId];
              return (
                <div
                  key={slot.scheduleId}
                  className='flex flex-col sm:flex-row sm:items-center justify-between bg-white p-3 rounded-lg border border-green-100 shadow-sm gap-2'
                >
                  <div>
                    <span className='font-semibold text-gray-800 block text-sm'>
                      {slot.dateStr} - {slot.mealType}
                    </span>
                    <span className='text-xs text-gray-500 line-through'>
                      {slot.recipe_name}
                    </span>
                  </div>
                  <div className='flex items-center gap-2'>
                    {mappedRecipe ? (
                      <>
                        <span className='text-sm font-bold text-green-700 bg-green-100 px-2 py-1 rounded flex items-center gap-1'>
                          <FaCheck className='text-xs' />{' '}
                          {mappedRecipe.recipe_name || mappedRecipe.name}
                        </span>
                        <button
                          onClick={() => {
                            const next = { ...mappedSwaps };
                            delete next[slot.scheduleId];
                            setMappedSwaps(next);
                          }}
                          className='text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors'
                        >
                          <FaTrash className='text-xs' />
                        </button>
                      </>
                    ) : (
                      <span className='text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded'>
                        Waiting for selection...
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Generator Form */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-8'>
          <h2 className='text-lg font-bold text-gray-800 mb-4'>
            Find New Recipes
          </h2>

          <div className='mb-4'>
            <label className='block text-xs font-semibold text-gray-600 mb-1'>
              Ingredients Basket
            </label>
            <div className='flex items-center gap-2 mb-2'>
              <input
                type='text'
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addIngredient();
                  }
                }}
                placeholder='e.g. Chicken, Tomato...'
                className='flex-1 border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none'
              />
              <button
                type='button'
                onClick={addIngredient}
                className='bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-200'
              >
                Add
              </button>
            </div>
            <div className='flex flex-wrap gap-2'>
              {basket.map((ing) => (
                <span
                  key={ing}
                  className='flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full border border-gray-200'
                >
                  {ing}
                  <button
                    type='button'
                    onClick={() => removeIngredient(ing)}
                    className='text-gray-400 hover:text-red-500'
                  >
                    <FaTimes />
                  </button>
                </span>
              ))}
              {basket.length === 0 && (
                <span className='text-xs text-gray-400'>
                  Basket is empty. Add ingredients to get recommendations.
                </span>
              )}
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div>
              <label className='block text-xs font-semibold text-gray-600 mb-1'>
                Min Calories <span className='font-normal'>(optional)</span>
              </label>
              <input
                type='number'
                value={minCalories}
                onChange={(e) => setMinCalories(e.target.value)}
                placeholder='0'
                className='w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none'
              />
            </div>
            <div>
              <label className='block text-xs font-semibold text-gray-600 mb-1'>
                Max Calories <span className='font-normal'>(optional)</span>
              </label>
              <input
                type='number'
                value={maxCalories}
                onChange={(e) => setMaxCalories(e.target.value)}
                placeholder='2000'
                className='w-full border border-gray-300 px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none'
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || basket.length === 0}
            className='w-full bg-[#2E7D32] hover:bg-green-800 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2'
          >
            {isGenerating ? (
              'Generating...'
            ) : (
              <>
                <FaSearch /> Generate Recommendations
              </>
            )}
          </button>
        </div>

        {/* Generated Recipes Grid */}
        <div>
          <h2 className='text-xl font-bold text-gray-800 mb-4'>
            Recommendations
          </h2>
          {generatedRecipes.length === 0 ? (
            <div className='text-center text-gray-500 py-10 bg-white rounded-xl border border-gray-100'>
              Fill the basket and generate to see recipes here!
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
              {generatedRecipes.map((recipe, idx) => (
                <div
                  key={idx}
                  className='bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-colors relative flex flex-col items-center'
                >
                  <div className='flex justify-center w-full h-32 bg-gray-50 rounded-lg overflow-hidden items-center text-4xl mb-3'>
                    {recipe.image || '🥗'}
                  </div>
                  <h3 className='font-semibold text-gray-800 text-center text-sm md:text-base leading-tight mb-2'>
                    {recipe.recipe_name || recipe.name}
                  </h3>
                  <div className='flex gap-2 text-xs text-gray-500 mb-4 justify-center w-full mt-auto'>
                    <span className='bg-gray-50 px-2 py-1 rounded'>
                      {recipe.minutes || 30} min
                    </span>
                    <span className='bg-gray-50 px-2 py-1 rounded'>
                      {recipe.calories || 0} kcal
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedRecipe(recipe);
                      setModalOpen(true);
                    }}
                    className='w-full bg-green-100 text-green-800 py-2 rounded-lg text-sm font-bold hover:bg-green-200 transition-colors'
                  >
                    Choose this Recipe
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Custom Modal for assigning chosen recipe to a specific Meal Plan slot */}
      {modalOpen && selectedRecipe && (
        <div className='fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm'>
          <div className='bg-white rounded-2xl p-6 w-full max-w-md shadow-xl'>
            <h3 className='text-xl font-bold text-gray-800 mb-2'>
              Assign Recipe
            </h3>
            <p className='text-sm text-gray-600 mb-4'>
              Where do you want to place{' '}
              <strong>
                {selectedRecipe.recipe_name || selectedRecipe.name}
              </strong>
              ?
            </p>

            <div className='space-y-3 mb-6 max-h-60 overflow-y-auto'>
              {pendingSwaps.map((slot) => {
                const isMapped = !!mappedSwaps[slot.scheduleId];
                return (
                  <label
                    key={slot.scheduleId}
                    className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${isMapped ? 'bg-gray-50 border-gray-200 opacity-60' : 'bg-white border-green-500 hover:bg-green-50'}`}
                  >
                    <div className='flex items-center gap-3'>
                      <input
                        type='radio'
                        name='slot_assignment'
                        value={slot.scheduleId}
                        disabled={isMapped}
                        onChange={(e) => setSelectedSlotId(e.target.value)}
                        className='w-4 h-4 text-green-600 focus:ring-green-500'
                      />
                      <div>
                        <span className='block text-sm font-bold text-gray-800'>
                          {slot.dateStr} - {slot.mealType}
                        </span>
                        <span className='block text-xs text-gray-500 truncate max-w-[200px]'>
                          Replaces: {slot.recipe_name}
                        </span>
                      </div>
                    </div>
                    {isMapped && (
                      <span className='text-xs font-bold text-gray-500 bg-gray-200 px-2 py-1 rounded'>
                        Already Assigned
                      </span>
                    )}
                  </label>
                );
              })}
            </div>

            <div className='flex gap-3'>
              <button
                type='button'
                onClick={() => {
                  setModalOpen(false);
                  setSelectedSlotId('');
                }}
                className='flex-1 py-3 text-gray-600 font-bold bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors'
              >
                Cancel
              </button>
              <button
                type='button'
                onClick={handleAssignSlot}
                disabled={!selectedSlotId}
                className='flex-1 py-3 text-white font-bold bg-[#2E7D32] hover:bg-green-800 rounded-xl disabled:opacity-50 transition-colors'
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Apply Button */}
      {isReadyToApply && (
        <div className='fixed bottom-24 left-0 right-0 px-4 flex justify-center z-40 pointer-events-none'>
          <button
            onClick={handleApplySwaps}
            disabled={isApplying}
            className='bg-[#2E7D32] hover:bg-green-800 text-white px-8 py-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.2)] font-bold pointer-events-auto border-2 border-white/20 transition-transform active:scale-95 text-lg'
          >
            {isApplying ? 'Applying Swaps...' : 'Confirm & Apply Swaps'}
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

export default Recommendations;
