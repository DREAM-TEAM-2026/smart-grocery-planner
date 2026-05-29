import {
  FaLeaf,
  FaAppleAlt,
  FaDrumstickBite,
  FaPepperHot,
  FaCheese,
  FaBreadSlice,
  FaSeedling,
  FaBoxOpen,
} from 'react-icons/fa';

export const ingredientsByCategory = {
  Veggies: ['Carrot', 'Broccoli', 'Spinach', 'Kale', 'Cauliflower', 'Zucchini'],
  Fruits: ['Apple', 'Banana', 'Orange', 'Strawberry', 'Grapes', 'Watermelon'],
  Proteins: ['Chicken', 'Eggs', 'Tofu', 'Beef', 'Fish', 'Shrimp'],
  Spices: ['Garlic', 'Ginger', 'Turmeric', 'Cumin', 'Paprika', 'Black Pepper'],
  Dairy: ['Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream', 'Buttermilk'],
  Carbs: ['Rice', 'Pasta', 'Bread', 'Potato', 'Oats', 'Quinoa'],
  Nuts: ['Almonds', 'Walnuts', 'Cashews', 'Peanuts', 'Pecans', 'Hazelnuts'],
  Others: ['Soy Sauce', 'Olive Oil', 'Honey', 'Salt', 'Sugar', 'Vinegar'],
};

export const categories = [
  { name: 'Veggies', icon: <FaLeaf className='text-green-600' /> },
  { name: 'Fruits', icon: <FaAppleAlt className='text-red-500' /> },
  { name: 'Proteins', icon: <FaDrumstickBite className='text-amber-600' /> },
  { name: 'Spices', icon: <FaPepperHot className='text-orange-500' /> },
  { name: 'Dairy', icon: <FaCheese className='text-yellow-500' /> },
  { name: 'Carbs', icon: <FaBreadSlice className='text-amber-700' /> },
  { name: 'Nuts', icon: <FaSeedling className='text-amber-800' /> },
  { name: 'Others', icon: <FaBoxOpen className='text-gray-500' /> },
];
