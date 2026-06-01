import { FaEgg, FaSun, FaMoon } from 'react-icons/fa';
import {useNavigate} from "react-router-dom";

function MealPreviewCard({ mealType, meal, isActiveSlot = false }) {
    const IconComponent =
        mealType === 'breakfast' ? FaEgg : mealType === 'lunch' ? FaSun : FaMoon;

    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/recipe/${id}`)
    }

    const baseStyle = 'rounded-xl p-4 transition-all relative border-2 ';

    const cardStyle = isActiveSlot
        ? `${baseStyle}bg-green-50 border-green-400 shadow-lg`
        : `${baseStyle}bg-white border-transparent shadow-sm`;

    if (!meal) {
        return (
            <div
                className={`${baseStyle}flex flex-col justify-center items-center h-full min-h-[100px] ${
                    isActiveSlot
                        ? 'bg-green-50/80 border-green-400 border-dashed'
                        : 'bg-white/50 border-white/50'
                }`}
            >
                <IconComponent
                    className={`text-lg mb-2 ${
                        isActiveSlot ? 'text-green-600' : 'text-gray-400'
                    }`}
                />

                <p
                    className={`text-sm capitalize ${
                        isActiveSlot ? 'text-green-800 font-semibold' : 'text-gray-500'
                    }`}
                >
                    No {mealType} planned
                </p>
            </div>
        );
    }

    return (
        <div className={cardStyle} onClick={() => handleClick(meal.id)}>
            <div className='flex items-center gap-2 mb-3' >
                <IconComponent
                    className={`text-sm ${
                        isActiveSlot ? 'text-green-700' : 'text-gray-400'
                    }`}
                />

                <h3
                    className={`text-sm font-normal capitalize ${
                        isActiveSlot ? 'text-green-900 font-bold' : 'text-gray-500'
                    }`}
                >
                    {mealType} {isActiveSlot && '(Now)'}
                </h3>
            </div>

            <div>
                <p className='font-semibold text-gray-800 line-clamp-1'>
                    {meal.recipe_name}
                </p>
                <p
                    className={`text-xs ${
                        isActiveSlot ? 'text-green-800' : 'text-gray-500'
                    }`}
                >
                    {meal.minutes} min | {meal.calories} kcal
                </p>
            </div>
        </div>
    );
}

export default MealPreviewCard;