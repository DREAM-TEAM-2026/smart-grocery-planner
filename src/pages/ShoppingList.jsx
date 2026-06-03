import { useState, useEffect } from 'react';
import {
  FaShoppingCart,
  FaExclamationTriangle,
  FaShoppingBasket,
} from 'react-icons/fa';
import BottomNav from '../components/BottomNav';
import { apiFetch } from '../utils/api';

function ShoppingList() {
  const [items, setItems] = useState([]);
  const [isStale, setIsStale] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Generator State
  const [days, setDays] = useState(7);
  const [isGenerating, setIsGenerating] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    let ignore = false;

    const fetchShoppingCart = async () => {
      try {
        if (refreshTrigger > 0) setIsLoading(true);

        const response = await apiFetch('shopping-cart', {
          method: 'GET',
          requireToken: true,
          requireTimezone: true,
        });

        if (!ignore && response?.data) {
          setItems(response.data.items || []);
          setIsStale(response.data.is_stale || false);
          setIsExpired(response.data.is_expired || false);
        }
      } catch (error) {
        if (!ignore) {
          console.error('Failed to fetch shopping cart:', error);
          setItems([]);
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    fetchShoppingCart();

    return () => {
      ignore = true;
    };
  }, [refreshTrigger]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (days < 1 || days > 7)
      return alert('Please select between 1 and 7 days.');

    setIsGenerating(true);
    try {
      await apiFetch('shopping-cart/generate', {
        method: 'POST',
        requireToken: true,
        requireTimezone: true,
        body: JSON.stringify({ days: Number(days) }),
      });
      // Re-fetch the newly generated cart by triggering the effect
      setRefreshTrigger((prev) => prev + 1);
    } catch (error) {
      console.error('Failed to generate cart:', error);
      alert('Failed to generate shopping list. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleCheck = async (itemIndex, itemId, currentStatus) => {
    const newStatus = !currentStatus;

    setItems((prev) => {
      const newItems = [...prev];
      newItems[itemIndex].is_checked = newStatus;
      return newItems;
    });

    try {
      await apiFetch(`shopping-cart/${itemId}/toggle`, {
        method: 'PATCH',
        requireToken: true,
      });
    } catch (err) {
      console.error('Failed to toggle item:', err);

      setItems((prev) => {
        const revertedItems = [...prev];
        revertedItems[itemIndex].is_checked = currentStatus;
        return revertedItems;
      });
    }
  };

  const totalItems = items.length;
  const checkedItems = items.filter((item) => item.is_checked).length;
  const progressPercentage =
    totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;

  return (
    <div className='min-h-screen bg-white pt-16 md:pt-20'>
      {/* Header */}
      <div className='bg-[#2E7D32] rounded-b-2xl shadow-md'>
        <div className='max-w-7xl mx-auto px-4 md:px-6 pt-8 pb-6'>
          <div className='flex items-center justify-center gap-2'>
            <FaShoppingCart className='text-white text-2xl' />
            <h1 className='text-2xl md:text-3xl font-bold text-center text-white'>
              Shopping List
            </h1>
          </div>
        </div>
      </div>

      <div className='max-w-3xl mx-auto px-4 md:px-6 py-6 pb-32'>
        {/* Loading State */}
        {isLoading ? (
          <div className='text-center py-10 text-gray-500'>
            Loading Shopping List...
          </div>
        ) : items.length === 0 ? (
          /* EMPTY STATE / GENERATOR UI */
          <div className='bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center mt-4'>
            <div className='w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto mb-4'>
              <FaShoppingBasket className='text-2xl' />
            </div>
            <h2 className='text-xl font-bold text-gray-800 mb-2'>
              Plan Your Groceries
            </h2>
            <p className='text-gray-500 text-sm mb-6'>
              You don't have a shopping list yet. Generate one based on your
              current weekly meal plan!
            </p>

            <form onSubmit={handleGenerate} className='max-w-xs mx-auto'>
              <div className='text-left mb-4'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  How many days to shop for? (1-7)
                </label>
                <input
                  type='number'
                  min='1'
                  max='7'
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  className='w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:border-green-500'
                  required
                />
              </div>
              <button
                type='submit'
                disabled={isGenerating}
                className='w-full bg-[#2E7D32] hover:bg-green-800 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50'
              >
                {isGenerating ? 'Generating...' : 'Generate Shopping Cart'}
              </button>
            </form>
          </div>
        ) : (
          /* ACTIVE CART UI */
          <>
            {/* Expired / Stale Banners */}
            {isExpired ? (
              <div className='bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
                <div className='flex items-start gap-3'>
                  <FaExclamationTriangle className='text-red-500 mt-1 flex-shrink-0' />
                  <div>
                    <h3 className='text-red-800 font-bold text-sm'>
                      Shopping List Expired
                    </h3>
                    <p className='text-red-700 text-xs'>
                      This list is from a past meal plan. You should generate a
                      new one for your current plan.
                    </p>
                  </div>
                </div>
                <form
                  onSubmit={handleGenerate}
                  className='flex gap-2 w-full sm:w-auto'
                >
                  <input
                    type='number'
                    min='1'
                    max='7'
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className='w-16 px-2 py-1 text-sm rounded border border-red-300'
                  />
                  <button
                    type='submit'
                    disabled={isGenerating}
                    className='whitespace-nowrap bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg font-bold transition-colors'
                  >
                    Create New List
                  </button>
                </form>
              </div>
            ) : isStale ? (
              <div className='bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
                <div className='flex items-start gap-3'>
                  <FaExclamationTriangle className='text-amber-500 mt-1 flex-shrink-0' />
                  <div>
                    <h3 className='text-amber-800 font-bold text-sm'>
                      Meal Plan Updated
                    </h3>
                    <p className='text-amber-700 text-xs'>
                      Your meal plan changed recently. Your list might be
                      missing items.
                    </p>
                  </div>
                </div>
                <form
                  onSubmit={handleGenerate}
                  className='flex gap-2 w-full sm:w-auto'
                >
                  <input
                    type='number'
                    min='1'
                    max='7'
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className='w-16 px-2 py-1 text-sm rounded border border-amber-300'
                  />
                  <button
                    type='submit'
                    disabled={isGenerating}
                    className='whitespace-nowrap bg-amber-500 hover:bg-amber-600 text-white text-sm px-4 py-2 rounded-lg font-bold transition-colors'
                  >
                    Update List
                  </button>
                </form>
              </div>
            ) : null}

            {/* Progress Bar */}
            <div className='bg-gray-50 rounded-xl p-4 shadow-sm mb-6'>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-gray-600 text-sm'>Shopping Progress</span>
                <span className='text-green-700 font-bold text-sm'>
                  {checkedItems}/{totalItems}
                </span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-2.5'>
                <div
                  className='bg-green-700 h-2.5 rounded-full transition-all duration-300'
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Ingredients List */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
              <div className='px-4 py-3 bg-gray-50 border-b border-gray-100'>
                <h2 className='font-semibold text-gray-800'>
                  Ingredients to Buy
                </h2>
              </div>

              <div className='divide-y divide-gray-100'>
                {items.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`p-4 transition-colors ${item.is_checked ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
                      <div className='flex items-start gap-3'>
                        <input
                          type='checkbox'
                          checked={item.is_checked}
                          disabled={isExpired}
                          onChange={() =>
                            toggleCheck(idx, item.id, item.is_checked)
                          }
                          className='w-5 h-5 mt-0.5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                        />
                        <div>
                          <p
                            className={`font-medium ${item.is_checked ? 'line-through text-gray-400' : 'text-gray-800'}`}
                          >
                            {item.ingredient_name}
                          </p>
                          {/* Recipe Origin Tags */}
                          <div className='flex flex-wrap gap-1 mt-1'>
                            {item.recipe_sources.map((recipe) => (
                              <span
                                key={recipe.id}
                                className='inline-block px-2 py-0.5 bg-[#E8FCC1] text-green-800 text-[10px] rounded-full'
                              >
                                {recipe.recipe_name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className='pl-8 sm:pl-0 sm:text-right'>
                        <span
                          className={`text-sm font-semibold ${item.is_checked ? 'text-gray-400' : 'text-gray-700'}`}
                        >
                          Qty: {item.required_amount}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

export default ShoppingList;
