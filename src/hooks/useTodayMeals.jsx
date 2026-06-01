import { useEffect, useState } from 'react';
import { apiFetch } from '../utils/api.js';
import { formatYMD } from '../utils/dates.js';

export function useTodayMeals() {
    const [mealsByTime, setMealsByTime] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const todayStr = formatYMD(new Date());

    useEffect(() => {
        const fetchTodayPlan = async () => {
            setIsLoading(true);
            setErrorMessage('');

            try {
                const query = new URLSearchParams({
                    start_date: todayStr,
                    end_date: todayStr,
                }).toString();

                const result = await apiFetch(`calendar?${query}`, {
                    method: 'GET',
                    requireToken: true,
                });

                setMealsByTime(result?.data?.[todayStr] || {});
            } catch (error) {
                console.error('Fetch failed:', error);
                setErrorMessage('Failed to load today meals.');
                setMealsByTime({});
            } finally {
                setIsLoading(false);
            }
        };

        fetchTodayPlan();
    }, [todayStr]);

    return {
        mealsByTime,
        isLoading,
        errorMessage,
        todayStr,
    };
}