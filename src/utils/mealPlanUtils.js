export const calculateActiveMeal = () => {
  const hour = new Date().getHours();
  if (hour >= 4 && hour < 11) return 'breakfast';
  if (hour >= 11 && hour < 16) return 'lunch';
  if (hour >= 16 || hour < 4) return 'dinner';
  return null;
};

export const normalizeApiData = (apiData) => {
  const normalized = {};
  if (!apiData) return normalized;

  Object.entries(apiData).forEach(([dateKey, dailyMeals]) => {
    const formattedMeals = {};
    Object.entries(dailyMeals).forEach(([mealType, mealData]) => {
      formattedMeals[mealType] = {
        recipe_name: mealData.recipe_name,
        minutes: mealData.minutes,
        calories: mealData.calories,
        scheduleId: mealData.id,
      };
    });
    normalized[dateKey] = formattedMeals;
  });

  return normalized;
};
