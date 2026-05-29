import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { loading, user } = useContext(AuthContext);

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to='/signin' replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
