import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaShoppingCart, FaUser } from 'react-icons/fa';

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/home', label: 'Home', icon: <FaHome className="text-lg" /> },
    { path: '/meal-plan', label: 'Meal Plan', icon: <FaCalendarAlt className="text-lg" /> },
    { path: '/shopping-list', label: 'Shopping List', icon: <FaShoppingCart className="text-lg" /> },
    { path: '/profile', label: 'Profile', icon: <FaUser className="text-lg" /> },
  ];

  return (
    <>
      {/* Navbar untuk Desktop (atas) */}
      <div className="hidden md:block fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-green-700 font-bold text-xl">Smart Grocery Planner</span>
          </div>
          <div className="flex gap-6">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 transition-colors ${
                  isActive(item.path) ? 'text-green-700 border-b-2 border-green-700' : 'text-gray-600 hover:text-green-700'
                }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navbar untuk Mobile (bawah) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center transition-colors ${
              isActive(item.path) ? 'text-green-700' : 'text-gray-500 hover:text-green-700'
            }`}
          >
            {item.icon}
            <span className="text-[11px] mt-0.5">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Spacer untuk desktop (agar konten tidak tertutup navbar) */}
      <div className="hidden md:block h-16"></div>
    </>
  );
}

export default BottomNav;