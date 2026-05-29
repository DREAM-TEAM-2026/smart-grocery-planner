import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import useLocalStorage from '../hooks/useLocalStorage';

function CheckIngredients() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useLocalStorage('ingredients', []);
  const [minCalories, setMinCalories] = useState(1500);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const deleteIngredient = () => {
    if (deleteIndex !== null) {
      setIngredients((prev) => prev.filter((_, i) => i !== deleteIndex));
      setShowDeleteModal(false);
      setDeleteIndex(null);
    }
  };

  return (
    <div className='min-h-screen bg-green-800 px-4 py-6 pb-24'>
      <div className='max-w-md mx-auto'>
        {/* Header */}
        <h1 className='text-2xl font-bold text-center text-white mb-6'>
          Check Your Ingredients
        </h1>

        {/* Daftar Bahan */}
        <div className='bg-white rounded-xl p-4 shadow-lg mb-6'>
          <div className='divide-y divide-gray-100'>
            {ingredients.map((item, idx) => (
              <div key={idx} className='py-2 flex items-center justify-between'>
                <span className='text-gray-800 font-medium'>{item}</span>
                <div className='flex items-center gap-3 '>
                  <button
                    onClick={() => {
                      setDeleteIndex(idx);
                      setShowDeleteModal(true);
                    }}
                    className='text-red-500 hover:text-red-700'
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className='bg-white rounded-xl p-4 shadow-lg mb-6'>
          <div className='flex justify-between items-center'>
            <span className='text-gray-600 font-semibold'>
              Minimal Calories Per Day :
            </span>
            <input
              value={minCalories}
              onChange={(e) => setMinCalories(e.target.value)}
              type='number'
              className='text-green-700 font-bold text-right'
            />
          </div>
        </div>

        {/* Find Recipes Button */}
        <button
          onClick={() => navigate('/recommendations')}
          className='w-full py-3 rounded-xl font-semibold transition-colors'
          style={{ backgroundColor: '#E8FCC1', color: '#2E7D32' }}
        >
          Find Recipes
        </button>

        {/* Modal Konfirmasi Hapus */}
        {showDeleteModal && (
          <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4'>
            <div className='bg-white rounded-2xl p-6 w-full max-w-xs'>
              <h3 className='text-lg font-semibold text-center text-gray-800 mb-4'>
                Delete this ingredient?
              </h3>
              <div className='flex gap-3'>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className='flex-1 py-2 rounded-xl border border-gray-300 text-gray-600 font-medium'
                >
                  No
                </button>
                <button
                  onClick={deleteIngredient}
                  className='flex-1 py-2 rounded-xl text-white font-medium'
                  style={{ backgroundColor: '#2E7D32' }}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckIngredients;
