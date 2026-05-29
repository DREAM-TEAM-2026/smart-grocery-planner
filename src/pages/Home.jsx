import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaSearch, 
  FaPlus, 
  FaTrashAlt, 
  FaHome, 
  FaCalendarAlt, 
  FaShoppingCart,
  FaLeaf,
  FaAppleAlt,
  FaDrumstickBite,
  FaPepperHot,
  FaCheese,
  FaBreadSlice,
  FaSeedling,
  FaBoxOpen,
  FaEgg,
  FaSun,
  FaMoon
} from 'react-icons/fa';
import BottomNav from '../components/BottomNav';

function Home() {
  const navigate = useNavigate();
  const [basket, setBasket] = useState([]);
  const [activeMealTab, setActiveMealTab] = useState('lunch');
  const [activeCategory, setActiveCategory] = useState('Veggies');

  // Data resep per waktu makan
  const mealsByTime = {
    breakfast: { name: "Pancake", minutes: 10, calories: 320, icon: "🥞", label: "Breakfast" },
    lunch: { name: "Taco Salad Bowl", minutes: 15, calories: 450, icon: "🥗", label: "Lunch" },
    dinner: { name: "Chicken Curry", minutes: 45, calories: 520, icon: "🍛", label: "Dinner" }
  };

  const currentMeal = mealsByTime[activeMealTab];

  // Data bahan berdasarkan kategori (untuk Quick Add)
  const ingredientsByCategory = {
    Veggies: ["Carrot", "Broccoli", "Spinach", "Kale", "Cauliflower", "Zucchini"],
    Fruits: ["Apple", "Banana", "Orange", "Strawberry", "Grapes", "Watermelon"],
    Proteins: ["Chicken", "Eggs", "Tofu", "Beef", "Fish", "Shrimp"],
    Spices: ["Garlic", "Ginger", "Turmeric", "Cumin", "Paprika", "Black Pepper"],
    Dairy: ["Milk", "Cheese", "Yogurt", "Butter", "Cream", "Buttermilk"],
    Carbs: ["Rice", "Pasta", "Bread", "Potato", "Oats", "Quinoa"],
    Nuts: ["Almonds", "Walnuts", "Cashews", "Peanuts", "Pecans", "Hazelnuts"],
    Others: ["Soy Sauce", "Olive Oil", "Honey", "Salt", "Sugar", "Vinegar"],
  };

  const currentIngredients = ingredientsByCategory[activeCategory] || ingredientsByCategory.Veggies;

  const categories = [
    { name: "Veggies", icon: <FaLeaf className="text-green-600" /> },
    { name: "Fruits", icon: <FaAppleAlt className="text-red-500" /> },
    { name: "Proteins", icon: <FaDrumstickBite className="text-amber-600" /> },
    { name: "Spices", icon: <FaPepperHot className="text-orange-500" /> },
    { name: "Dairy", icon: <FaCheese className="text-yellow-500" /> },
    { name: "Carbs", icon: <FaBreadSlice className="text-amber-700" /> },
    { name: "Nuts", icon: <FaSeedling className="text-amber-800" /> },
    { name: "Others", icon: <FaBoxOpen className="text-gray-500" /> },
  ];

  const addToBasket = (item) => {
    if (!basket.includes(item)) {
      setBasket([...basket, item]);
    }
  };

  const removeFromBasket = (index) => {
    setBasket(basket.filter((_, i) => i !== index));
  };

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(categoryName);
  };

  // Pindah ke halaman Check Your Ingredients
  const handleNext = () => {
    if (basket.length > 0) {
      navigate('/check-ingredients', { state: { basket } });
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-4 pb-20 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-xl font-bold text-gray-800">Hi, Sarah! 👋</h1>
        <p className="text-gray-500 text-sm mt-0.5">What would you like to cook today?</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
        <input
          type="text"
          placeholder="Search for recipes"
          className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Prepare your Meal */}
      <div className="mb-6">
        <h2 className="font-semibold text-gray-800 text-sm mb-2">Prepare your Meal</h2>
        
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setActiveMealTab('breakfast')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeMealTab === 'breakfast' 
                ? 'bg-green-700 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <FaEgg className="text-sm" />
            Breakfast
          </button>
          <button
            onClick={() => setActiveMealTab('lunch')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeMealTab === 'lunch' 
                ? 'bg-green-700 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <FaSun className="text-sm" />
            Lunch
          </button>
          <button
            onClick={() => setActiveMealTab('dinner')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeMealTab === 'dinner' 
                ? 'bg-green-700 text-white' 
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <FaMoon className="text-sm" />
            Dinner
          </button>
        </div>

        <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
          <div className="text-center">
            <span className="text-3xl">{currentMeal.icon}</span>
            <h3 className="font-semibold text-sm mt-2">{currentMeal.name}</h3>
            <p className="text-gray-500 text-xs mt-1">{currentMeal.minutes} min | {currentMeal.calories} kcal</p>
            <span className="text-[10px] text-green-600 mt-2 block">{currentMeal.label}</span>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h2 className="font-semibold text-gray-800 text-sm mb-2">Categories</h2>
        <div className="grid grid-cols-4 gap-2">
          {categories.map((cat) => (
            <div 
              key={cat.name} 
              onClick={() => handleCategoryClick(cat.name)}
              className={`bg-white rounded-lg p-2 text-center shadow-sm border cursor-pointer hover:bg-gray-50 transition-colors ${
                activeCategory === cat.name ? 'ring-2 ring-green-500 border-green-500' : 'border-gray-100'
              }`}
            >
              <div className="flex justify-center text-lg">{cat.icon}</div>
              <p className="text-[11px] font-medium text-gray-700 mt-0.5">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Add */}
      <div className="mb-6">
        <h2 className="font-semibold text-gray-800 text-sm mb-2">Quick Add - {activeCategory}</h2>
        <div className="grid grid-cols-2 gap-2">
          {currentIngredients.map((item) => (
            <button
              key={item}
              onClick={() => addToBasket(item)}
              className="bg-white rounded-lg p-2 text-center shadow-sm border border-gray-100 flex items-center justify-between px-3"
            >
              <span className="text-sm text-gray-700">{item}</span>
              <FaPlus className="text-green-600 text-xs" />
            </button>
          ))}
        </div>
      </div>

      {/* Your Basket */}
      {basket.length > 0 && (
        <div className="mb-6 bg-white rounded-xl p-3 shadow-md border border-gray-100">
          <h2 className="font-semibold text-gray-800 text-sm mb-2">Your Basket ({basket.length})</h2>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {basket.map((item, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-100 rounded-full text-xs flex items-center gap-1.5">
                {item}
                <button onClick={() => removeFromBasket(idx)}>
                  <FaTrashAlt className="text-red-500 text-[10px]" />
                </button>
              </span>
            ))}
          </div>
          <button 
            onClick={handleNext}
            className="w-full bg-green-700 text-white py-2.5 rounded-xl text-sm font-semibold"
          >
            Next →
          </button>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

export default Home;