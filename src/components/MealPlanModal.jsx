import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

function MealPlanModal({ isOpen, onClose, recipeName, onSave }) {
  const [selectedDate, setSelectedDate] = useState('Tuesday, May 5, 2026');
  const [selectedMealTime, setSelectedMealTime] = useState('Lunch');
  const [showCalendar, setShowCalendar] = useState(false);

  if (!isOpen) return null;

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const calendarDays = [
    { date: 26, fullDate: 'Sunday, May 26, 2026' },
    { date: 27, fullDate: 'Monday, May 27, 2026' },
    { date: 28, fullDate: 'Tuesday, May 28, 2026' },
    { date: 29, fullDate: 'Wednesday, May 29, 2026' },
    { date: 30, fullDate: 'Thursday, May 30, 2026' },
    { date: 31, fullDate: 'Friday, May 31, 2026' },
    { date: 1, fullDate: 'Saturday, June 1, 2026' },
    { date: 2, fullDate: 'Sunday, June 2, 2026' },
    { date: 3, fullDate: 'Monday, June 3, 2026' },
    { date: 4, fullDate: 'Tuesday, June 4, 2026' },
    { date: 5, fullDate: 'Wednesday, June 5, 2026' },
    { date: 6, fullDate: 'Thursday, June 6, 2026' },
    { date: 7, fullDate: 'Friday, June 7, 2026' },
  ];

  const handleDateSelect = (fullDate) => {
    setSelectedDate(fullDate);
    setShowCalendar(false);
  };

  const isSelectedDate = (fullDate) => {
    return selectedDate === fullDate;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-visible relative">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Add to Meal Plan</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-gray-600 text-sm mb-4 font-medium">{recipeName}</p>

          {/* Select Date */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-medium mb-1">Select Date</label>
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full text-left px-3 py-2 border border-gray-300 rounded-lg text-gray-800 text-sm flex justify-between items-center"
            >
              <span>{selectedDate}</span>
              <span className="text-gray-400">▼</span>
            </button>
            
            {showCalendar && (
              <div className="absolute top-full left-0 right-0 mt-2 rounded-xl shadow-lg z-[100] overflow-hidden">
                <div className="bg-green-700 px-4 py-3">
                  <div className="text-center font-semibold text-white">May 2026</div>
                </div>
                <div className="bg-green-700 px-4 pb-4">
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekDays.map(day => (
                      <div key={day} className="text-center text-xs text-white/80 py-1 font-medium">{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, idx) => {
                      const isSelected = isSelectedDate(day.fullDate);
                      return (
                        <button
                          key={idx}
                          onClick={() => handleDateSelect(day.fullDate)}
                          className={`text-center text-sm py-2 rounded-lg transition-colors ${
                            isSelected
                              ? 'bg-white text-green-700 font-semibold'
                              : 'text-white hover:bg-white/20'
                          }`}
                        >
                          {day.date}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Select Meal Time */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-1">Select Meal Time</label>
            <div className="flex gap-2">
              {['Breakfast', 'Lunch', 'Dinner'].map((meal) => (
                <button
                  key={meal}
                  onClick={() => setSelectedMealTime(meal)}
                  className={`flex-1 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedMealTime === meal
                      ? 'bg-green-700 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {meal}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons - Corner Radius 50% (rounded-full) */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2 rounded-full border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSave({ recipeName, date: selectedDate, mealTime: selectedMealTime });
                onClose();
              }}
              className="flex-1 py-2 rounded-full font-medium transition-colors"
              style={{ backgroundColor: '#E8FCC1', color: '#2E7D32' }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealPlanModal;