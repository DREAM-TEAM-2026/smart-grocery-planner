import { FaPlus } from 'react-icons/fa';

function QuickAddIngredients({
                                 categories,
                                 activeCategory,
                                 currentIngredients,
                                 onCategoryClick,
                                 onAddIngredient,
                             }) {
    return (
        <div className='mb-6 md:mb-8'>
            <h2 className='font-semibold text-gray-800 text-sm md:text-base mb-2 md:mb-3'>
                Quick Add Ingredients
            </h2>

            <div className='grid grid-cols-4 md:grid-cols-8 gap-2 md:gap-3 mb-3'>
                {categories.map((cat) => (
                    <div
                        key={cat.name}
                        onClick={() => onCategoryClick(cat.name)}
                        className={`bg-white rounded-lg p-2 text-center shadow-sm border cursor-pointer hover:bg-gray-50 transition-colors ${
                            activeCategory === cat.name
                                ? 'ring-2 ring-green-500 border-green-500'
                                : 'border-gray-100'
                        }`}
                    >
                        <div className='flex justify-center text-lg md:text-xl'>
                            {cat.icon}
                        </div>
                        <p className='text-[10px] md:text-xs font-medium text-gray-700 mt-0.5 md:mt-1'>
                            {cat.name}
                        </p>
                    </div>
                ))}
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
                {currentIngredients.slice(0, 12).map((item) => (
                    <button
                        key={item}
                        onClick={() => onAddIngredient(item)}
                        className='bg-white rounded-lg p-2 text-center shadow-sm border border-gray-100 flex items-center justify-between px-2'
                    >
                        <span className='text-sm text-gray-700'>{item}</span>
                        <FaPlus className='text-green-600 text-xs' />
                    </button>
                ))}
            </div>
        </div>
    );
}

export default QuickAddIngredients;