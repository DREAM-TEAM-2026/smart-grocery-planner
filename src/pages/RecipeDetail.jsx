import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import MealPlanModal from '../components/MealPlanModal';
import BottomNav from '../components/BottomNav';
import { useState } from 'react';

// Data dummy resep detail
const recipeDetails = {
  1: {
    id: 1,
    name: "Taco Salad Bowl",
    minutes: 15,
    calories: 450,
    image: "🥗",
    nutrition: { fat: 13, protein: 13, sugar: 13, carbs: 13 },
    ingredients: ["Lorem ipsum dolor sit amet", "Consectetur adipiscing elit", "Sed do eiusmod tempor", "Incididunt ut labore et dolore"],
    steps: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor", "Consectetur adipiscing elit, sed do eiusmod tempor", "Sed do eiusmod tempor incididunt ut labore et dolore", "Incididunt ut labore et dolore magna aliqua"]
  },
  2: {
    id: 2,
    name: "Spicy Noodles",
    minutes: 20,
    calories: 380,
    image: "🍜",
    nutrition: { fat: 10, protein: 12, sugar: 5, carbs: 45 },
    ingredients: ["Noodles", "Garlic", "Chili", "Soy sauce", "Egg"],
    steps: ["Rebus mie hingga matang", "Tumis bawang putih hingga harum", "Masukkan cabai dan kecap asin", "Campurkan dengan mie, sajikan dengan telur dadar"]
  },
  3: {
    id: 3,
    name: "Chicken Curry",
    minutes: 45,
    calories: 520,
    image: "🍛",
    nutrition: { fat: 18, protein: 35, sugar: 8, carbs: 30 },
    ingredients: ["Chicken", "Coconut milk", "Curry powder", "Potato", "Onion"],
    steps: ["Tumis bawang hingga harum", "Masukkan ayam dan bubuk kari", "Tambahkan santan dan kentang", "Masak hingga ayam empuk dan kuah mengental"]
  },
  4: {
    id: 4,
    name: "Garlic Butter Rice",
    minutes: 25,
    calories: 320,
    image: "🍚",
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
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Resep tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 pb-24">
      <div className="max-w-md mx-auto">
        {/* Tombol Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-gray-600 font-semibold flex items-center gap-1 text-sm"
        >
          <FaArrowLeft className="text-sm" /> Back
        </button>

        {/* Gambar Menu - Background diubah ke #212121 */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-2xl flex items-center justify-center shadow-md" style={{ backgroundColor: '#212121' }}>
            <span className="text-6xl">{recipe.image}</span>
          </div>
        </div>

        {/* Nama Resep & Tombol + */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold text-gray-800">{recipe.name}</h1>
          <button
            onClick={handleAddToMealPlan}
            className="w-8 h-8 rounded-full bg-green-700 text-white flex items-center justify-center hover:bg-green-800 transition-colors"
          >
            <FaPlus className="text-sm" />
          </button>
        </div>

        {/* Info Waktu & Kalori */}
        <div className="flex gap-4 text-gray-500 text-sm mb-6">
          <span>⏱️ {recipe.minutes} min</span>
          <span>🔥 {recipe.calories} kcal</span>
        </div>

        {/* Nutrition */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <h2 className="font-semibold text-gray-800 mb-3">Nutrition</h2>
          <div className="grid grid-cols-4 text-center">
            <div><p className="font-bold text-gray-800">{recipe.nutrition.fat} gr</p><p className="text-xs text-gray-500">Fat</p></div>
            <div><p className="font-bold text-gray-800">{recipe.nutrition.protein} gr</p><p className="text-xs text-gray-500">Protein</p></div>
            <div><p className="font-bold text-gray-800">{recipe.nutrition.sugar} gr</p><p className="text-xs text-gray-500">Sugar</p></div>
            <div><p className="font-bold text-gray-800">{recipe.nutrition.carbs} gr</p><p className="text-xs text-gray-500">Carbs</p></div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <h2 className="font-semibold text-gray-800 mb-3">Ingredients</h2>
          <ol className="list-decimal list-inside space-y-2">
            {recipe.ingredients.map((item, idx) => (
              <li key={idx} className="text-gray-600 text-sm">{item}</li>
            ))}
          </ol>
        </div>

        {/* Steps */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
          <h2 className="font-semibold text-gray-800 mb-3">Steps</h2>
          <ol className="list-decimal list-inside space-y-3">
            {recipe.steps.map((step, idx) => (
              <li key={idx} className="text-gray-600 text-sm leading-relaxed">{step}</li>
            ))}
          </ol>
        </div>
      </div>

      {/* Modal Add to Meal Plan */}
      <MealPlanModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        recipeName={selectedRecipe?.name}
        onSave={handleSaveMealPlan}
      />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export default RecipeDetail;