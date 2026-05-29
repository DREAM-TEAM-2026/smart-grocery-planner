import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaArrowLeft, FaPlus } from 'react-icons/fa';
import heroImg from '../assets/sayur.jpg';
import MealPlanModal from '../components/MealPlanModal';
import BottomNav from '../components/BottomNav';

// Data dummy resep rekomendasi
const allRecipes = [
  { id: 1, name: "Taco Salad Bowl", minutes: 15, calories: 450, image: "🥗" },
  { id: 2, name: "Spicy Noodles", minutes: 20, calories: 380, image: "🍜" },
  { id: 3, name: "Chicken Curry", minutes: 45, calories: 520, image: "🍛" },
  { id: 4, name: "Garlic Butter Rice", minutes: 25, calories: 320, image: "🍚" },
];

function Recommendations() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const filteredRecipes = allRecipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToMealPlan = (e, recipe) => {
    e.stopPropagation();
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  const handleSaveMealPlan = (data) => {
    console.log('Saved to meal plan:', data);
    alert(`${data.recipeName} added to ${data.mealTime} on ${data.date}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 pb-24">
      <div className="max-w-md mx-auto">
        {/* Tombol Back */}
        <button
          onClick={() => navigate('/home')}
          className="mb-4 text-gray-600 font-semibold flex items-center gap-1 text-sm"
        >
          <FaArrowLeft className="text-sm" /> Back
        </button>

        {/* Card Hero */}
        <div className="relative rounded-2xl overflow-hidden mb-6 shadow-md">
          <img src={heroImg} alt="Vegetables" className="w-full h-40 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2E7D32] via-[#2E7D32]/50 to-transparent"></div>
          <div className="absolute inset-0 flex flex-col justify-center px-5">
            <p className="text-white font-bold text-xl">Smart Grocery</p>
            <p className="text-white font-bold text-xl">Planner</p>
            <p className="text-white/80 text-xs mt-1">No more leftovers left behind</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search for recipes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
          />
        </div>

        {/* Grid Resep */}
        <div className="grid grid-cols-2 gap-4">
          {filteredRecipes.length === 0 ? (
            <p className="text-center text-gray-500 py-10 col-span-2">No recipes found</p>
          ) : (
            filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => navigate(`/recipe/${recipe.id}`)}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-colors relative"
              >
                <div className="flex justify-center mb-3">
                  <span className="text-5xl">{recipe.image}</span>
                </div>
                <h3 className="font-semibold text-gray-800 text-center text-base">
                  {recipe.name}
                </h3>
                <p className="text-gray-500 text-center text-sm mt-1">
                  {recipe.minutes} min
                </p>
                <button
                  onClick={(e) => handleAddToMealPlan(e, recipe)}
                  className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-green-700 text-white flex items-center justify-center hover:bg-green-800 transition-colors"
                >
                  <FaPlus className="text-xs" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal Add to Meal Plan */}
      <MealPlanModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        recipeName={selectedRecipe?.name}
        onSave={handleSaveMealPlan}
      />

      <BottomNav />
    </div>
  );
}

export default Recommendations;