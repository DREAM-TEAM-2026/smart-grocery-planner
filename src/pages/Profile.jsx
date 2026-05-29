import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaLeaf, FaSignOutAlt } from 'react-icons/fa';
import BottomNav from '../components/BottomNav';

function Profile() {
  const navigate = useNavigate();
  
  // Hitung total food waste dari meal plan yang sudah dibuat
  // Sementara pakai data dummy
  const [user, setUser] = useState({
    name: "Sarah",
    email: "sarah@example.com",
    avatar: null,
    foodWasteReduced: 2.5 // kg
  });

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      sessionStorage.clear();
      navigate('/signin');
    }
  };

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-20">
      {/* Header Card Hijau */}
      <div className="bg-[#2E7D32] rounded-b-2xl shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8 pb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-white">Profile</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kolom Kiri - Info User */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
            <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <FaUserCircle className="text-6xl text-green-700" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>

          {/* Kolom Kanan - Your Impact (Hanya Food Waste) */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 text-lg mb-4 text-center">Your Impact</h3>
            <div className="bg-green-50 rounded-lg p-6 text-center">
              <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
                <FaLeaf className="text-3xl" />
                <span className="font-bold text-4xl">{user.foodWasteReduced}</span>
                <span className="text-gray-500 text-lg">kg</span>
              </div>
              <p className="text-sm text-gray-600">Food waste reduced</p>
              <p className="text-xs text-gray-400 mt-2">
                🌱 Setara dengan menyelamatkan {Math.round(user.foodWasteReduced * 2.5)} kg CO₂
              </p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-colors"
            style={{ backgroundColor: '#E8FCC1', color: '#2E7D32' }}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

export default Profile;