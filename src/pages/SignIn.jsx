import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { authClient } from '../auth';
import { AuthContext } from '../context/AuthContext';

function SignIn() {
  const { setUser, setSession, handleGoogleSignIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    const result = await authClient.signIn.email({ email, password });

    if (result.error) {
      alert(result.error.message);
      return;
    }

    const sessionResult = await authClient.getSession();

    if (sessionResult.data?.session && sessionResult.data?.user) {
      setSession(sessionResult.data.session);
      setUser(sessionResult.data.user);
    }

    navigate('/home');
  };

  return (
    <div className='min-h-screen bg-green-700 flex flex-col items-center justify-center px-4'>
      <div className='bg-white rounded-2xl p-6 w-full max-w-md'>
        {/* Logo/Judul */}
        <h1
          className='text-2xl font-bold text-center mb-6'
          style={{
            color: '#2E7D32',
            fontFamily: 'Bricolage Grotesque, sans-serif',
          }}
        >
          Smart Grocery Planner
        </h1>

        {/* Form Sign In */}
        <form onSubmit={handleSignIn}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-medium mb-1'>
              Email
            </label>
            <input
              type='email'
              placeholder='Enter Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
              required
            />
          </div>

          <div className='mb-2'>
            <label className='block text-gray-700 text-sm font-medium mb-1'>
              Password
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
              required
            />
          </div>

          <div className='text-right mb-6'>
            <button
              type='button'
              onClick={() => alert('Forgot Password? Hubungi admin')}
              className='text-sm text-green-700 hover:underline'
            >
              Forgot Password?
            </button>
          </div>

          <button
            type='submit'
            className='w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition-colors'
          >
            Sign In
          </button>
        </form>

        {/* Atau dengan */}
        <div className='flex items-center my-4'>
          <div className='flex-1 border-t border-gray-300'></div>
          <span className='px-3 text-gray-500 text-sm'>Or With</span>
          <div className='flex-1 border-t border-gray-300'></div>
        </div>

        {/* Social Login */}
        <div className='flex gap-3 mb-6'>
          <button
            onClick={() => handleGoogleSignIn()}
            className='flex-1 bg-red-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600'
          >
            <FaGoogle /> Google
          </button>
        </div>

        {/* Link ke Sign Up */}
        <p className='text-center text-gray-600 text-sm'>
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className='text-green-700 font-semibold hover:underline'
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
