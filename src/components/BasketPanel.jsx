import { FaTrashAlt } from 'react-icons/fa';

function BasketPanel({
                         basket,
                         inputIngredient,
                         inputMinCalories,
                         inputMaxCalories,
                         setInputIngredient,
                         setInputMinCalories,
                         setInputMaxCalories,
                         onAddInputIngredient,
                         onRemoveIngredient,
                         onNext,
                     }) {
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onAddInputIngredient();
        }
    };

    return (
        <div className='md:w-80 mt-6 md:mt-0'>
            <div className='mb-2'>
                <label className='font-semibold text-gray-800 text-sm'>
                    Minimum Calories
                </label>
                <input
                    min='0'
                    value={inputMinCalories}
                    onChange={(event) => setInputMinCalories(event.target.value)}
                    type='number'
                    placeholder='e.g., 1000'
                    className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
                />
            </div>

            <div className='mb-2'>
                <label className='font-semibold text-gray-800 text-sm'>
                    Max Calories
                </label>
                <input
                    min='0'
                    value={inputMaxCalories}
                    onChange={(event) => setInputMaxCalories(event.target.value)}
                    type='number'
                    placeholder='e.g., 2000'
                    className='w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
                />
            </div>

            <div className='mb-4'>
                <label className='font-semibold text-gray-800 text-sm'>
                    Add Ingredients
                </label>

                <div className='flex gap-2'>
                    <input
                        type='text'
                        placeholder='e.g., Chicken, Tomato...'
                        value={inputIngredient}
                        onChange={(event) => setInputIngredient(event.target.value)}
                        onKeyDown={handleKeyPress}
                        className='flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500'
                    />

                    <button
                        onClick={onAddInputIngredient}
                        className='px-3 py-2 bg-green-700 text-white rounded-lg text-sm font-medium hover:bg-green-800'
                    >
                        Add
                    </button>
                </div>
            </div>

            {basket.length > 0 && (
                <div className='bg-white rounded-xl p-4 shadow-md border border-gray-100'>
                    <div className='flex justify-between items-center mb-2'>
                        <h2 className='font-semibold text-gray-800 text-sm'>
                            Your Basket ({basket.length})
                        </h2>
                    </div>

                    <div className='space-y-2 mb-3 max-h-48 overflow-y-auto'>
                        {basket.map((item, index) => (
                            <div
                                key={`${item}-${index}`}
                                className='flex justify-between items-center text-sm'
                            >
                                <span className='text-gray-700'>{item}</span>

                                <button
                                    onClick={() => onRemoveIngredient(index)}
                                    className='text-red-500'
                                >
                                    <FaTrashAlt className='text-xs' />
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={onNext}
                        className='w-full bg-green-700 text-white py-2 rounded-lg text-sm font-semibold'
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
}

export default BasketPanel;