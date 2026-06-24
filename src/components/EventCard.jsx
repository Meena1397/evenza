import React from 'react';

const EventCard = ({ event, onViewDetails, onRegister }) => {
  const {
    title,
    category,
    date,
    time,
    venue,
    organizer,
    fee,
    registrations,
    seatsAvailable,
    image,
    status
  } = event;

  // Status styling helpers
  const getStatusDetails = () => {
    switch (status) {
      case 'open':
        return { text: 'Open', classes: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' };
      case 'closing_soon':
        return { text: 'Closing Soon', classes: 'bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse' };
      case 'closed':
      default:
        return { text: 'Closed', classes: 'bg-rose-500/10 text-rose-400 border-rose-500/20' };
    }
  };

  const statusInfo = getStatusDetails();

  // Category specific coloring for visual diversity
  const getCategoryClass = () => {
    switch (category.toLowerCase()) {
      case 'technical':
      case 'hackathon':
        return 'from-purple-600 to-indigo-600 shadow-purple-900/30';
      case 'cultural':
      case 'fest':
        return 'from-orange-600 to-pink-600 shadow-orange-900/30';
      case 'workshop':
      case 'seminar':
        return 'from-cyan-600 to-blue-600 shadow-cyan-900/30';
      case 'sports':
        return 'from-pink-600 to-red-600 shadow-pink-900/30';
      default:
        return 'from-indigo-600 to-blue-600 shadow-indigo-900/30';
    }
  };

  // Convert date into readable format: "Wed, Jun 24, 2026"
  const getFormattedDate = (dateStr) => {
    try {
      const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
      return new Date(dateStr).toLocaleDateString('en-US', options);
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="group relative flex flex-col justify-between h-full bg-[#0d0725]/60 hover:bg-[#160d3d]/80 border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5),_0_0_20px_rgba(122,34,255,0.15)]">
      
      {/* Event Image & Badges */}
      <div className="relative aspect-video w-full overflow-hidden">
        <img 
          src={image || "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=60"} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Top Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10 pointer-events-none">
          <span className={`px-3.5 py-1 text-[11px] font-bold text-white uppercase rounded-full bg-gradient-to-r shadow-md ${getCategoryClass()}`}>
            {category}
          </span>
          <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-md border backdrop-blur-md ${statusInfo.classes}`}>
            {statusInfo.text}
          </span>
        </div>

        {/* Dark overlay card-header */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0725] via-transparent to-transparent opacity-80" />
      </div>

      {/* Card Info Content */}
      <div className="flex flex-col flex-grow p-5">
        {/* Title */}
        <h3 className="text-[17px] font-extrabold text-white leading-tight line-clamp-2 mb-3.5 group-hover:text-cyan-300 transition-colors duration-300">
          {title}
        </h3>

        {/* Details list */}
        <div className="space-y-2 mb-5 flex-grow">
          {/* Date & Time */}
          <div className="flex items-start gap-2.5 text-xs text-slate-300">
            <svg className="w-4 h-4 text-slate-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="font-medium">{getFormattedDate(date)} • {time}</span>
          </div>

          {/* Location */}
          <div className="flex items-start gap-2.5 text-xs text-slate-300">
            <svg className="w-4 h-4 text-slate-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="truncate">{venue}</span>
          </div>

          {/* Organizer */}
          <div className="flex items-start gap-2.5 text-xs text-slate-300">
            <svg className="w-4 h-4 text-slate-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span className="truncate">{organizer}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/5 my-4" />

        {/* Seats and Fee Metadata Row */}
        <div className="flex justify-between items-center text-xs text-slate-400 mb-5">
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Registration Fee</span>
            <span className="text-sm font-bold text-white">
              {fee === 0 ? <span className="text-emerald-400 font-extrabold">Free</span> : `$${fee}`}
            </span>
          </div>
          
          <div className="flex flex-col gap-0.5 text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Availability</span>
            <span className="text-sm font-bold text-white">
              {seatsAvailable === 0 ? (
                <span className="text-rose-400">Sold Out</span>
              ) : (
                <span>{seatsAvailable} seats left <span className="text-[10px] text-slate-500 font-normal">({registrations} registered)</span></span>
              )}
            </span>
          </div>
        </div>

        {/* Buttons Action Group */}
        <div className="flex gap-2">
          <button 
            onClick={onViewDetails}
            className="flex-1 px-4 py-2.5 text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-200"
          >
            View Details
          </button>
          
          <button 
            onClick={onRegister}
            disabled={status === 'closed' || seatsAvailable === 0}
            className={`flex-1 px-4 py-2.5 text-xs font-bold text-white rounded-xl shadow-md transition-all duration-200 ${
              status === 'closed' || seatsAvailable === 0
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border-transparent shadow-none'
                : status === 'closing_soon'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 hover:shadow-orange-950/40'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:shadow-purple-950/40'
            }`}
          >
            {status === 'closed' || seatsAvailable === 0 ? 'Closed' : 'Register'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
