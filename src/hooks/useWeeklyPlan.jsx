import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { apiFetch } from '../utils/api';
import { formatYMD, addDays } from '../utils/dates';
import { normalizeApiData } from '../utils/mealPlanUtils';

export function useWeeklyPlan() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [weeklyData, setWeeklyData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const todayStr = formatYMD(new Date());
  const paramStart = searchParams.get('start_date');
  const paramEnd = searchParams.get('end_date');

  const startDateStr = paramStart || todayStr;
  const endDateStr =
    paramEnd || formatYMD(addDays(new Date(paramStart || todayStr), 6));

  useEffect(() => {
    if (!paramStart || !paramEnd) {
      setSearchParams(
        { start_date: startDateStr, end_date: endDateStr },
        { replace: true },
      );
    }
  }, [paramStart, paramEnd, startDateStr, endDateStr, setSearchParams]);

  useEffect(() => {
    const fetchWeek = async () => {
      if (!paramStart || !paramEnd) return;
      setIsLoading(true);

      try {
        const query = new URLSearchParams({
          start_date: paramStart,
          end_date: paramEnd,
        }).toString();

        const result = await apiFetch(`calendar?${query}`, {
          method: 'GET',
          requireToken: true,
        });

        setWeeklyData(normalizeApiData(result?.data));
      } catch (error) {
        console.error('Fetch failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeek();
  }, [paramStart, paramEnd]);

  const handlePrevWeek = () => {
    const newStart = formatYMD(addDays(startDateStr, -7));
    const newEnd = formatYMD(addDays(endDateStr, -7));
    setSearchParams({ start_date: newStart, end_date: newEnd });
  };

  const handleNextWeek = () => {
    const newStart = formatYMD(addDays(startDateStr, 7));
    const newEnd = formatYMD(addDays(endDateStr, 7));
    setSearchParams({ start_date: newStart, end_date: newEnd });
  };

  const daysArray = useMemo(() => {
    const days = [];
    for (let i = 0; i <= 6; i++) {
      const currentDate = addDays(startDateStr, i);
      days.push({
        dateStr: formatYMD(currentDate),
        displayDate: currentDate.toLocaleDateString('en-US', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
      });
    }
    return days;
  }, [startDateStr]);

  return {
    paramStart,
    paramEnd,
    weeklyData,
    isLoading,
    startDateStr,
    endDateStr,
    daysArray,
    handlePrevWeek,
    handleNextWeek,
  };
}
