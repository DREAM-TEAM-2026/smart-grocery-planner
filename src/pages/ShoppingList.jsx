import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckDouble, FaTrashAlt, FaShoppingCart, FaChevronDown, FaChevronRight } from 'react-icons/fa';
import BottomNav from '../components/BottomNav';

function ShoppingList() {
  const navigate = useNavigate();
  const [openRecipes, setOpenRecipes] = useState({});
  
  // Data dummy dengan 3 resep (lebih banyak)
  const [shoppingData, setShoppingData] = useState([
    {
      id: 1,
      recipeName: "Taco Salad Bowl",
      recipeId: 1,
      items: [
        { id: 1, name: "Carrot", quantity: "3 pcs", checked: false },
        { id: 2, name: "Carrot", quantity: "3 pcs", checked: false },
        { id: 3, name: "Cooking oil", quantity: "1 lt", checked: false },
        { id: 4, name: "Lettuce", quantity: "1 head", checked: false },
        { id: 5, name: "Chicken breast", quantity: "200 gr", checked: false },
        { id: 6, name: "Cheese", quantity: "50 gr", checked: false },
      ]
    },
    {
      id: 2,
      recipeName: "Spicy Noodles",
      recipeId: 2,
      items: [
        { id: 7, name: "Noodles", quantity: "200 gr", checked: false },
        { id: 8, name: "Garlic", quantity: "3 cloves", checked: false },
        { id: 9, name: "Chili", quantity: "5 pcs", checked: false },
        { id: 10, name: "Soy sauce", quantity: "2 tbsp", checked: false },
        { id: 11, name: "Egg", quantity: "2 pcs", checked: false },
        { id: 12, name: "Green onion", quantity: "2 stalks", checked: false },
      ]
    },
    {
      id: 3,
      recipeName: "Chicken Curry",
      recipeId: 3,
      items: [
        { id: 13, name: "Chicken", quantity: "500 gr", checked: false },
        { id: 14, name: "Coconut milk", quantity: "200 ml", checked: false },
        { id: 15, name: "Curry powder", quantity: "2 tbsp", checked: false },
        { id: 16, name: "Potato", quantity: "2 pcs", checked: false },
        { id: 17, name: "Onion", quantity: "1 pcs", checked: false },
        { id: 18, name: "Garlic", quantity: "3 cloves", checked: false },
      ]
    },
    {
      id: 4,
      recipeName: "Garlic Butter Rice",
      recipeId: 4,
      items: [
        { id: 19, name: "Rice", quantity: "2 cups", checked: false },
        { id: 20, name: "Garlic", quantity: "4 cloves", checked: false },
        { id: 21, name: "Butter", quantity: "2 tbsp", checked: false },
        { id: 22, name: "Salt", quantity: "1 tsp", checked: false },
        { id: 23, name: "Parsley", quantity: "1 tbsp", checked: false },
      ]
    }
  ]);

  const toggleAccordion = (recipeId) => {
    setOpenRecipes(prev => ({ ...prev, [recipeId]: !prev[recipeId] }));
  };

  const toggleCheck = (recipeIndex, itemIndex) => {
    setShoppingData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData[recipeIndex].items[itemIndex].checked = !newData[recipeIndex].items[itemIndex].checked;
      return newData;
    });
  };

  const checkAll = () => {
    setShoppingData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.forEach(recipe => {
        recipe.items.forEach(item => { item.checked = true; });
      });
      return newData;
    });
  };

  const clearAll = () => {
    setShoppingData(prev => {
      const newData = JSON.parse(JSON.stringify(prev));
      newData.forEach(recipe => {
        recipe.items.forEach(item => { item.checked = false; });
      });
      return newData;
    });
  };

  const totalItems = shoppingData.reduce((sum, recipe) => sum + recipe.items.length, 0);
  const checkedItems = shoppingData.reduce((sum, recipe) => 
    sum + recipe.items.filter(item => item.checked).length, 0
  );
  const progressPercentage = totalItems > 0 ? (checkedItems / totalItems) * 100 : 0;

  const goToRecipeDetail = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-20">
      {/* Header Card Hijau */}
      <div className="bg-[#2E7D32] rounded-b-2xl shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8 pb-6">
          <div className="flex items-center justify-center gap-2">
            <FaShoppingCart className="text-white text-2xl" />
            <h1 className="text-2xl md:text-3xl font-bold text-center text-white">Shopping List</h1>
          </div>
        </div>
      </div>

      {/* Konten Utama */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 pb-32">
        {/* Progress Card */}
        <div className="bg-gray-50 rounded-xl p-4 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 text-sm">Shopping Progress</span>
            <span className="text-green-700 font-bold text-sm">{checkedItems}/{totalItems}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-700 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-gray-500 text-xs mt-2 text-center">
            {checkedItems === totalItems ? "All items checked! Ready to shop!" : "Keep checking items you've bought"}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={checkAll}
            className="flex-1 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium"
            style={{ backgroundColor: '#E8FCC1', color: '#2E7D32' }}
          >
            <FaCheckDouble /> Check All
          </button>
          <button
            onClick={clearAll}
            className="flex-1 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium bg-gray-100 text-gray-700"
          >
            <FaTrashAlt /> Clear All
          </button>
        </div>

        {/* Shopping List - Grid 2 kolom untuk desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shoppingData.map((recipe, recipeIdx) => {
            const isOpen = openRecipes[recipe.id];
            return (
              <div key={recipe.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h2 
                      onClick={() => goToRecipeDetail(recipe.recipeId)}
                      className="font-semibold text-gray-800 text-md cursor-pointer hover:text-green-700 transition-colors"
                    >
                      {recipe.recipeName}
                    </h2>
                    <button
                      onClick={() => toggleAccordion(recipe.id)}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {isOpen ? <FaChevronDown className="text-sm" /> : <FaChevronRight className="text-sm" />}
                    </button>
                  </div>
                </div>
                
                {isOpen && (
                  <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
                    {recipe.items.map((item, itemIdx) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => toggleCheck(recipeIdx, itemIdx)}
                            className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                          />
                          <div>
                            <p className={`text-gray-800 ${item.checked ? 'line-through text-gray-400' : ''}`}>
                              {item.name}
                            </p>
                            <p className={`text-xs ${item.checked ? 'text-gray-400' : 'text-gray-500'}`}>
                              {item.quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {shoppingData.length === 0 && (
          <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
            <p className="text-gray-500">No items in shopping list</p>
            <p className="text-gray-400 text-sm mt-2">Add meals to your plan first</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}

export default ShoppingList;