import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import MealPlanModal from '../components/MealPlanModal';
import BottomNav from '../components/BottomNav';
import { useState } from 'react';

const recipeDetails = {
  1: {
    id: 1, name: "Taco Salad Bowl", minutes: 15, calories: 450, image: "🥗",
    nutrition: { fat: 13, protein: 13, sugar: 13, carbs: 13 },
    ingredients: Array.from({ length: 12 }, (_, i) => `Lorem ipsum dolor sit amet ${i + 1}`),
    steps: Array.from({ length: 12 }, (_, i) => `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ${i + 1}`)
  },
  2: {
    id: 2, name: "Spicy Noodles", minutes: 20, calories: 380, image: "🍜",
    nutrition: { fat: 10, protein: 12, sugar: 5, carbs: 45 },
    ingredients: ["Noodles", "Garlic", "Chili", "Soy sauce", "Egg"],
    steps: ["Rebus mie hingga matang", "Tumis bawang putih hingga harum", "Masukkan cabai dan kecap asin", "Campurkan dengan mie, sajikan dengan telur dadar"]
  },
  3: {
    id: 3, name: "Chicken Curry", minutes: 45, calories: 520, image: "🍛",
    nutrition: { fat: 18, protein: 35, sugar: 8, carbs: 30 },
    ingredients: ["Chicken", "Coconut milk", "Curry powder", "Potato", "Onion"],
    steps: ["Tumis bawang hingga harum", "Masukkan ayam dan bubuk kari", "Tambahkan santan dan kentang", "Masak hingga ayam empuk dan kuah mengental"]
  },
  4: {
    id: 4, name: "Garlic Butter Rice", minutes: 25, calories: 320, image: "🍚",
    nutrition: { fat: 12, protein: 6, sugar: 2, carbs: 50 },
    ingredients: ["Rice", "Garlic", "Butter", "Salt", "Parsley"],
    steps: ["Masak nasi hingga matang", "Tumis bawang putih dengan mentega", "Campurkan dengan nasi", "Taburkan parsley dan sajikan hangat"]
  }
};

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipeDetails[id];
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleAddToMealPlan = () => {
    setSelectedRecipe({ name: recipe.name });
    setModalOpen(true);
  };

  const handleSaveMealPlan = (data) => {
    console.log('Saved to meal plan:', data);
    alert(`${data.recipeName} added to ${data.mealTime} on ${data.date}`);
  };

  if (!recipe) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16 md:pt-20"><p className="text-gray-500">Resep tidak ditemukan</p></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8 pb-24">
        <button onClick={() => navigate(-1)} className="mb-6 text-gray-600 font-semibold flex items-center gap-1 text-sm hover:text-green-700">
          <FaArrowLeft className="text-sm" /> Back to results
        </button>

        <div className="md:flex md:gap-8">
          <div className="md:w-1/3">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex justify-center items-center">
              <div className="w-48 h-48 rounded-2xl flex items-center justify-center shadow-md" style={{ backgroundColor: '#212121' }}>
                <span className="text-8xl">{recipe.image}</span>
              </div>
            </div>
          </div>
          <div className="md:w-2/3 mt-4 md:mt-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-800">{recipe.name}</h1>
                <button onClick={handleAddToMealPlan} className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center hover:bg-green-800">
                  <FaPlus className="text-lg" />
                </button>
              </div>
              <div className="flex gap-6 text-gray-500 text-base mb-6">
                <span>⏱️ {recipe.minutes} min</span>
                <span>🔥 {recipe.calories} kcal</span>
              </div>
              <div className="border-t border-gray-100 pt-4">
                <h2 className="font-semibold text-gray-800 text-lg mb-3">Nutrition</h2>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="bg-gray-50 rounded-lg p-2"><p className="font-bold text-gray-800 text-lg">{recipe.nutrition.fat} gr</p><p className="text-xs text-gray-500">Fat</p></div>
                  <div className="bg-gray-50 rounded-lg p-2"><p className="font-bold text-gray-800 text-lg">{recipe.nutrition.protein} gr</p><p className="text-xs text-gray-500">Protein</p></div>
                  <div className="bg-gray-50 rounded-lg p-2"><p className="font-bold text-gray-800 text-lg">{recipe.nutrition.sugar} gr</p><p className="text-xs text-gray-500">Sugar</p></div>
                  <div className="bg-gray-50 rounded-lg p-2"><p className="font-bold text-gray-800 text-lg">{recipe.nutrition.carbs} gr</p><p className="text-xs text-gray-500">Carbs</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:flex md:gap-8 mt-6">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-semibold text-gray-800 text-lg mb-3">Ingredients</h2>
              <ul className="list-decimal list-inside space-y-2 max-h-96 overflow-y-auto">
                {recipe.ingredients.map((item, idx) => <li key={idx} className="text-gray-600 text-sm py-1 border-b border-gray-50 last:border-0">{item}</li>)}
              </ul>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="font-semibold text-gray-800 text-lg mb-3">Steps</h2>
              <ol className="list-decimal list-inside space-y-3 max-h-96 overflow-y-auto">
                {recipe.steps.map((step, idx) => <li key={idx} className="text-gray-600 text-sm leading-relaxed py-1 border-b border-gray-50 last:border-0">{step}</li>)}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <MealPlanModal isOpen={modalOpen} onClose={() => setModalOpen(false)} recipeName={selectedRecipe?.name} onSave={handleSaveMealPlan} />
      <BottomNav />
    </div>
  );
}

export default RecipeDetail;