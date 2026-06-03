import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import BottomNav from '../components/BottomNav';
import { AuthContext } from '../context/AuthContext';

function Profile() {
  const { user, handleSignOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      handleSignOut();
      sessionStorage.clear();
      navigate('/signin');
    }
  };

  return (
    <div className='min-h-screen bg-white pt-16 md:pt-20'>
      {/* Header Card Hijau */}
      <div className='bg-[#2E7D32] rounded-b-2xl shadow-md'>
        <div className='max-w-7xl mx-auto px-4 md:px-6 pt-8 pb-6'>
          <h1 className='text-2xl md:text-3xl font-bold text-center text-white'>
            Profile
          </h1>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 md:px-6 py-6 pb-32'>
        <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center'>
          <div className='w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4'>
              {user.image? <img src={user.image} alt={user.name} className='w-full h-full object-cover rounded-full'/>
                  : <FaUserCircle className='text-6xl text-green-700' />}
          </div>
          <h2 className='text-xl font-bold text-gray-800'>{user.name}</h2>
          <p className='text-gray-500 text-sm'>{user.email}</p>
        </div>

        {/* Logout Button */}
        <div className='mt-6'>
          <button
            onClick={handleLogout}
            className='w-full py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-medium transition-colors'
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
