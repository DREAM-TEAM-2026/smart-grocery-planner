import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

function GenerateMealPlanConfirmModal({
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4'>
      <div className='bg-white rounded-2xl w-full max-w-md overflow-hidden relative shadow-xl'>
        <div className='p-4 border-b border-gray-100 flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-700'>
              <FaExclamationTriangle />
            </div>

            <h2 className='text-lg font-semibold text-gray-800'>
              Generate Meal Plan?
            </h2>
          </div>

          <button
            onClick={onClose}
            disabled={isLoading}
            className='text-gray-400 hover:text-gray-600 disabled:opacity-50'
          >
            <FaTimes />
          </button>
        </div>

        <div className='p-4'>
          <p className='text-gray-700 text-sm leading-relaxed'>
            Your current selected ingredients and minimum calories will be
            used to generate a new 7-day meal plan.
          </p>

          <div className='mt-4 rounded-xl bg-red-50 border border-red-100 p-3'>
            <p className='text-red-800 text-sm font-medium'>
              Generating a new meal plan will delete meal plans,
              starting from today onward.
            </p>
          </div>

          <p className='text-gray-500 text-xs mt-3'>
            This action cannot be undone after you confirm.
          </p>

          <div className='flex gap-3 mt-6'>
            <button
              onClick={onClose}
              disabled={isLoading}
              className='flex-1 py-2.5 rounded-full border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-colors disabled:opacity-60'
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              disabled={isLoading}
              className='flex-1 py-2.5 rounded-full font-medium transition-colors disabled:opacity-60'
              style={{ backgroundColor: '#E8FCC1', color: '#2E7D32' }}
            >
              {isLoading ? 'Preparing...' : 'Confirm'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateMealPlanConfirmModal;
