import { useNavigate } from 'react-router-dom';
import vegetableImg from '../assets/vegetable.svg';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-700 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <img src={vegetableImg} alt="Vegetable illustration" className="w-48 h-48 mx-auto mb-6" />
        
        <h1 
          className="text-3xl font-bold mb-8"
          style={{ 
            color: '#E8FCC1', 
            fontFamily: 'Bricolage Grotesque, sans-serif' 
          }}
        >
          Smart Grocery Planner
        </h1>
        
        <button
          onClick={() => navigate('/signin')}  // ← ubah dari '/home' ke '/signin'
          className="px-8 py-3 rounded-full font-semibold shadow-lg transition-colors"
          style={{ backgroundColor: '#E8FCC1', color: '#2E7D32' }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Landing;