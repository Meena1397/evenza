import React, { useState } from 'react';

const EventCalendar = ({ events, onDaySelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 24)); // June 24, 2026 (local time)
  const [selectedDayStr, setSelectedDayStr] = useState('');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Get total days in month
  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  
  // Get weekday of first day of month (0 = Sun, 6 = Sat)
  const getFirstDayOfMonth = (y, m) => new Date(y, m, 1).getDay();

  const totalDays = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // Generate calendar days grid
  const calendarDays = [];

  // Previous month padding days
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const prevMonthTotalDays = getDaysInMonth(prevYear, prevMonth);
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonthTotalDays - i,
      month: prevMonth,
      year: prevYear,
      isCurrentMonth: false
    });
  }

  // Current month days
  for (let i = 1; i <= totalDays; i++) {
    calendarDays.push({
      day: i,
      month: month,
      year: year,
      isCurrentMonth: true
    });
  }

  // Next month padding days
  const remainingCells = 42 - calendarDays.length;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  for (let i = 1; i <= remainingCells; i++) {
    calendarDays.push({
      day: i,
      month: nextMonth,
      year: nextYear,
      isCurrentMonth: false
    });
  }

  // Check if a calendar day has events
  const getEventsForDay = (y, m, d) => {
    const formattedDate = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    return events.filter(evt => evt.date === formattedDate);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDayClick = (cell) => {
    const dateStr = `${cell.year}-${String(cell.month + 1).padStart(2, '0')}-${String(cell.day).padStart(2, '0')}`;
    setSelectedDayStr(dateStr === selectedDayStr ? '' : dateStr);
    
    // Bubble up the selected date (or null if deselected)
    onDaySelect(dateStr === selectedDayStr ? null : dateStr);
  };

  return (
    <div className="w-full bg-[#0d0725]/40 border border-white/5 rounded-2xl p-5 backdrop-blur-md">
      
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-[15px] font-extrabold text-white">
          {monthNames[month]} {year}
        </h3>
        
        <div className="flex gap-1.5">
          <button 
            onClick={handlePrevMonth}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white border border-white/5 transition-all duration-200"
            aria-label="Previous month"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button 
            onClick={handleNextMonth}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white border border-white/5 transition-all duration-200"
            aria-label="Next month"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Weekdays Row */}
      <div className="grid grid-cols-7 text-center mb-2.5">
        {daysOfWeek.map(day => (
          <div key={day} className="text-[10px] uppercase font-bold tracking-wider text-slate-500 py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((cell, index) => {
          const dayEvents = getEventsForDay(cell.year, cell.month, cell.day);
          const hasEvents = dayEvents.length > 0;
          
          const currentCellDateStr = `${cell.year}-${String(cell.month + 1).padStart(2, '0')}-${String(cell.day).padStart(2, '0')}`;
          const isSelected = selectedDayStr === currentCellDateStr;
          
          // Check if it represents today (June 24, 2026)
          const isToday = cell.year === 2026 && cell.month === 5 && cell.day === 24;

          return (
            <button
              key={index}
              onClick={() => handleDayClick(cell)}
              className={`relative flex flex-col justify-between items-center aspect-square py-1.5 border rounded-xl transition-all duration-200 ${
                !cell.isCurrentMonth 
                  ? 'text-slate-600 border-transparent hover:bg-white/2' 
                  : isSelected
                    ? 'bg-purple-600 border-purple-500 text-white shadow-md shadow-purple-900/30'
                    : isToday
                      ? 'bg-purple-500/10 border-purple-500/30 text-purple-300'
                      : 'text-slate-300 border-transparent bg-white/1 hover:bg-white/5 hover:border-white/10'
              }`}
            >
              <span className="text-[11px] font-bold">{cell.day}</span>
              
              {/* Event Markers dots under number */}
              {hasEvents && (
                <div className="flex gap-0.5 justify-center mt-1">
                  {dayEvents.slice(0, 3).map((evt, eIdx) => {
                    let dotColor = 'bg-purple-400';
                    if (evt.category === 'Fest' || evt.category === 'Cultural') dotColor = 'bg-orange-400';
                    else if (evt.category === 'Workshop' || evt.category === 'Seminar') dotColor = 'bg-cyan-400';
                    else if (evt.category === 'Sports') dotColor = 'bg-pink-400';

                    return (
                      <span 
                        key={eIdx} 
                        className={`w-1 h-1 rounded-full ${isSelected ? 'bg-white' : dotColor}`} 
                      />
                    );
                  })}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default EventCalendar;
