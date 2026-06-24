import React from 'react';

const EventStats = ({ events }) => {
  // Aggregate stats based on loaded events
  const totalEvents = events.length;
  const activeEvents = events.filter(evt => evt.status === 'open' || evt.status === 'closing_soon').length;
  
  // Calculate total student registrations
  const totalRegistrations = events.reduce((sum, evt) => sum + (evt.registrations || 0), 0) + 12400; // static base + active counts

  const statsItems = [
    {
      value: totalEvents,
      label: 'Total Events',
      color: 'text-purple-400 border-purple-500/20 bg-purple-500/5',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      )
    },
    {
      value: activeEvents,
      label: 'Active Events',
      color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )
    },
    {
      value: totalRegistrations.toLocaleString(),
      label: 'Registered Students',
      color: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      )
    },
    {
      value: '80+',
      label: 'Organizers',
      color: 'text-orange-400 border-orange-500/20 bg-orange-500/5',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      )
    },
    {
      value: '25+',
      label: 'Colleges Connected',
      color: 'text-pink-400 border-pink-500/20 bg-pink-500/5',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10v6" />
          <path d="M6 12v4M18 12v4" />
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M6 17v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3" />
        </svg>
      )
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {statsItems.map((item, idx) => (
        <div 
          key={idx} 
          className="flex flex-col items-center justify-center p-5 bg-[#0d0725]/40 border border-white/5 rounded-2xl text-center backdrop-blur-md hover:border-white/10 hover:bg-[#160d3d]/50 transition-all duration-300"
        >
          <div className={`p-3 rounded-xl border mb-3 ${item.color.split(' ')[1]} ${item.color.split(' ')[0]} ${item.color.split(' ')[2]}`}>
            {item.icon}
          </div>
          
          <span className="text-2xl font-extrabold text-white tracking-tight leading-none mb-1.5">
            {item.value}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default EventStats;
