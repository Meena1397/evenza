import React from 'react';

const EventTimeline = ({ events, onViewDetails }) => {
  // Sort events chronologically by date
  const sortedEvents = [...events].sort((a, b) => new Date(a.date) - new Date(b.date));

  const getMonthAbbreviation = (dateStr) => {
    try {
      const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      const date = new Date(dateStr);
      return monthNames[date.getMonth()];
    } catch (e) {
      return '';
    }
  };

  const getDayNumber = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return String(date.getDate()).padStart(2, '0');
    } catch (e) {
      return '';
    }
  };

  const getNodeColorClass = (cat) => {
    switch (cat.toLowerCase()) {
      case 'fest':
      case 'cultural':
        return { border: 'border-orange-500', text: 'text-orange-400', bg: 'bg-orange-500/10' };
      case 'workshop':
      case 'seminar':
        return { border: 'border-cyan-500', text: 'text-cyan-400', bg: 'bg-cyan-500/10' };
      case 'sports':
        return { border: 'border-pink-500', text: 'text-pink-400', bg: 'bg-pink-500/10' };
      default:
        return { border: 'border-purple-500', text: 'text-purple-400', bg: 'bg-purple-500/10' };
    }
  };

  if (sortedEvents.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 text-sm font-medium">
        No upcoming events in timeline.
      </div>
    );
  }

  return (
    <div className="relative pl-6 border-l-2 border-white/5 space-y-6 py-2">
      {sortedEvents.map((evt, idx) => {
        const theme = getNodeColorClass(evt.category);
        const day = getDayNumber(evt.date);
        const month = getMonthAbbreviation(evt.date);

        return (
          <div key={evt.id} className="relative group">
            
            {/* Timeline Dot Connector */}
            <div className={`absolute -left-[33px] top-4 w-4 h-4 rounded-full bg-[#050212] border-3 ${theme.border} group-hover:scale-125 transition-transform duration-200 z-10`} />

            {/* Timeline Node Card */}
            <div className="flex gap-4 items-center bg-[#0d0725]/30 hover:bg-[#160d3d]/50 border border-white/5 hover:border-white/10 rounded-2xl p-4 transition-all duration-300">
              
              {/* Date Block */}
              <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl border-1.5 ${theme.border} ${theme.bg} ${theme.text} flex-shrink-0 font-bold`}>
                <span className="text-lg leading-none">{day}</span>
                <span className="text-[9px] tracking-wider mt-0.5">{month}</span>
              </div>

              {/* Info Details */}
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[9px] font-bold uppercase tracking-wider ${theme.text}`}>
                    {evt.category}
                  </span>
                  <span className="text-slate-500 text-[10px]">•</span>
                  <span className="text-slate-400 text-[10px]">{evt.time}</span>
                </div>
                
                <h4 className="text-sm font-extrabold text-white truncate group-hover:text-cyan-300 transition-colors duration-200">
                  {evt.title}
                </h4>
                
                <p className="text-xs text-slate-400 truncate mt-1">
                  {evt.venue}
                </p>
              </div>

              {/* View Action Arrow */}
              <button
                onClick={() => onViewDetails(evt)}
                className={`p-2 bg-white/3 hover:bg-white/10 rounded-lg ${theme.text} border border-white/5 transition-all duration-200`}
                aria-label="View event details"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

            </div>

          </div>
        );
      })}
    </div>
  );
};

export default EventTimeline;
