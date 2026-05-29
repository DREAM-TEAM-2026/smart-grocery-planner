import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Password dan Confirm Password tidak cocok!');
      return;
    }
    // Nanti diintegrasikan dengan backend
    console.log('Sign Up:', { name, email, password });
    navigate('/signin');
  };

  return (
    <div className="min-h-screen bg-green-700 flex flex-col items-center justify-center px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        {/* Logo/Judul */}
        <h1 
          className="text-2xl font-bold text-center mb-6"
          style={{ 
            color: '#2E7D32', 
            fontFamily: 'Bricolage Grotesque, sans-serif' 
          }}
        >
          Smart Grocery Planner
        </h1>

        {/* Form Sign Up */}
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800 transition-colors"
          >
            Sign Up
          </button>
        </form>

        {/* Atau dengan */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">Or With</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Social Sign Up */}
        <div className="flex gap-3 mb-6">
          <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700">
            <FaFacebook /> Facebook
          </button>
          <button className="flex-1 bg-red-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600">
            <FaGoogle /> Google
          </button>
        </div>

        {/* Link ke Sign In */}
        <p className="text-center text-gray-600 text-sm">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/signin')}
            className="text-green-700 font-semibold hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;