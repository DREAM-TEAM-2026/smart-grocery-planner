import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaShoppingCart } from 'react-icons/fa';

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-8 flex justify-around max-w-md mx-auto">
      <button
        onClick={() => navigate('/home')}
        className={`flex flex-col items-center transition-colors ${
          isActive('/home') ? 'text-green-700' : 'text-gray-500 hover:text-green-700'
        }`}
      >
        <FaHome className="text-lg" />
        <span className="text-[11px] mt-0.5">Home</span>
      </button>
      <button
        onClick={() => navigate('/meal-plan')}
        className={`flex flex-col items-center transition-colors ${
          isActive('/meal-plan') ? 'text-green-700' : 'text-gray-500 hover:text-green-700'
        }`}
      >
        <FaCalendarAlt className="text-lg" />
        <span className="text-[11px] mt-0.5">Meal Plan</span>
      </button>
      <button
        onClick={() => navigate('/shopping-list')}
        className={`flex flex-col items-center transition-colors ${
          isActive('/shopping-list') ? 'text-green-700' : 'text-gray-500 hover:text-green-700'
        }`}
      >
        <FaShoppingCart className="text-lg" />
        <span className="text-[11px] mt-0.5">Shopping List</span>
      </button>
    </div>
  );
}

export default BottomNav;