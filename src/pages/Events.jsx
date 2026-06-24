import React, { useState, useEffect, useMemo } from 'react';
import EventCard from '../components/EventCard';
import EventFilter from '../components/EventFilter';
import EventCalendar from '../components/EventCalendar';
import EventTimeline from '../components/EventTimeline';
import EventStats from '../components/EventStats';
import EventDetailsModal from '../components/EventDetailsModal';
import { getEventsData, registerForEventMock } from '../services/firebase';
import { sendRegistrationEmail } from '../services/emailService';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(null);
  const [selectedEventForModal, setSelectedEventForModal] = useState(null);
  
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Pagination / Load More
  const [visibleEventsCount, setVisibleEventsCount] = useState(8);

  // Filters State
  const initialFilters = {
    search: '',
    categories: [],
    datePreset: 'all', // all, today, tomorrow, this-week, this-month, custom
    startDate: '',
    endDate: '',
    locations: [],
    statuses: [],
    fee: null, // null, free, paid
    organizerTypes: [],
    sortBy: 'newest'
  };
  const [filters, setFilters] = useState(initialFilters);

  // Load events
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const data = await getEventsData();
      setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  // Filter change handler
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
    setVisibleEventsCount(8); // Reset pagination on filter change
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
    setSelectedCalendarDay(null);
    setVisibleEventsCount(8);
  };

  const handleDaySelect = (dateStr) => {
    setSelectedCalendarDay(dateStr);
    setVisibleEventsCount(8);
  };

  // Helper date checker functions
  const isDateWithinThisWeek = (dateToCheck) => {
    const now = new Date(2026, 5, 24); // June 24, 2026
    const checkDate = new Date(dateToCheck);
    
    // Get start of week (Sunday)
    const sunday = new Date(now);
    sunday.setDate(now.getDate() - now.getDay());
    sunday.setHours(0,0,0,0);

    // Get end of week (Saturday)
    const saturday = new Date(sunday);
    saturday.setDate(sunday.getDate() + 6);
    saturday.setHours(23,59,59,999);

    return checkDate >= sunday && checkDate <= saturday;
  };

  const isDateWithinThisMonth = (dateToCheck) => {
    const now = new Date(2026, 5, 24); // June 24, 2026
    const checkDate = new Date(dateToCheck);
    return checkDate.getMonth() === now.getMonth() && checkDate.getFullYear() === now.getFullYear();
  };

  // Filter and Sort logic
  const filteredEvents = useMemo(() => {
    let result = [...events];

    // Calendar selection override or filter
    if (selectedCalendarDay) {
      result = result.filter(evt => evt.date === selectedCalendarDay);
    }

    // Search query
    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(evt => 
        evt.title.toLowerCase().includes(query) ||
        evt.organizer.toLowerCase().includes(query) ||
        evt.venue.toLowerCase().includes(query)
      );
    }

    // Categories
    if (filters.categories && filters.categories.length > 0) {
      result = result.filter(evt => filters.categories.includes(evt.category));
    }

    // Date Preset
    const targetDateStr = '2026-06-24'; // System target time date
    if (filters.datePreset !== 'all' && filters.datePreset !== 'custom') {
      if (filters.datePreset === 'today') {
        result = result.filter(evt => evt.date === targetDateStr);
      } else if (filters.datePreset === 'tomorrow') {
        result = result.filter(evt => evt.date === '2026-06-25');
      } else if (filters.datePreset === 'this-week') {
        result = result.filter(evt => isDateWithinThisWeek(evt.date));
      } else if (filters.datePreset === 'this-month') {
        result = result.filter(evt => isDateWithinThisMonth(evt.date));
      }
    } else if (filters.datePreset === 'custom') {
      if (filters.startDate) {
        result = result.filter(evt => evt.date >= filters.startDate);
      }
      if (filters.endDate) {
        result = result.filter(evt => evt.date <= filters.endDate);
      }
    }

    // Location Format
    if (filters.locations && filters.locations.length > 0) {
      result = result.filter(evt => filters.locations.includes(evt.eventType));
    }

    // Registration Status
    if (filters.statuses && filters.statuses.length > 0) {
      result = result.filter(evt => filters.statuses.includes(evt.status));
    }

    // Free / Paid
    if (filters.fee) {
      if (filters.fee === 'free') {
        result = result.filter(evt => evt.fee === 0);
      } else if (filters.fee === 'paid') {
        result = result.filter(evt => evt.fee > 0);
      }
    }

    // Organizer Type
    if (filters.organizerTypes && filters.organizerTypes.length > 0) {
      result = result.filter(evt => filters.organizerTypes.includes(evt.organizerType));
    }

    // Sorting
    if (filters.sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filters.sortBy === 'date') {
      result.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (filters.sortBy === 'popular') {
      result.sort((a, b) => (b.registrations + b.seatsAvailable) - (a.registrations + a.seatsAvailable));
    } else if (filters.sortBy === 'registrations') {
      result.sort((a, b) => b.registrations - a.registrations);
    } else if (filters.sortBy === 'alphabetical') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [events, filters, selectedCalendarDay]);

  // Trending & Highlighted Events
  const trendingEvents = useMemo(() => {
    // Top 3 events based on registrations descending
    return [...events]
      .sort((a, b) => b.registrations - a.registrations)
      .slice(0, 3);
  }, [events]);

  const popularCategories = useMemo(() => {
    // Count category occurrences
    const counts = {};
    events.forEach(evt => {
      counts[evt.category] = (counts[evt.category] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(entry => entry[0]);
  }, [events]);

  // Register Handler
  const handleRegisterUser = async (eventId, userData) => {
    const response = await registerForEventMock(eventId, userData);
    if (response.success) {
      // Update core state
      setEvents(response.updatedEvents);
      
      // Update matching event in Details Modal if open
      const matchedEvt = response.updatedEvents.find(e => e.id === eventId);
      if (selectedEventForModal && selectedEventForModal.id === eventId) {
        setSelectedEventForModal(matchedEvt);
      }

      // Fire email notification
      await sendRegistrationEmail(
        userData.email,
        userData.name,
        matchedEvt.title,
        {
          date: matchedEvt.date,
          time: matchedEvt.time,
          venue: matchedEvt.venue,
          organizer: matchedEvt.organizer
        }
      );
    }
  };

  // Newsletter Submit
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  return (
    <div className="py-24">
      {/* Background glow orbs specific for Events page */}
      <div className="bg-glow-container">
        <div className="glow-orb orb-1" />
        <div className="glow-orb orb-2" />
      </div>

      {/* Hero Section */}
      <section className="text-center py-12 mb-12">
        <span className="px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-widest text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full">
          Evenza Hub
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-4 mb-3">
          Discover Campus <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-fill-transparent">Events</span>
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Find, register, and participate in technical hackathons, cultural festivals, sports tournaments, workshops, and career drives across colleges.
        </p>
        
        {/* Total counter pill */}
        <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-white/3 border border-white/5 rounded-full text-xs font-semibold text-slate-300 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Showing {filteredEvents.length} of {events.length} Live College Events</span>
        </div>
      </section>

      {/* Featured Trends Section */}
      <section className="mb-12">
        <h3 className="text-base font-extrabold uppercase tracking-wider text-white mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
          Trending Spots
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trendingEvents.map((evt, idx) => (
            <div 
              key={evt.id}
              onClick={() => setSelectedEventForModal(evt)}
              className="group relative h-48 rounded-2xl overflow-hidden border border-white/5 hover:border-white/15 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img 
                src={evt.image} 
                alt={evt.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Gradient tint */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <span className="text-[9px] font-extrabold text-cyan-400 uppercase tracking-widest">
                  #{idx + 1} Trending • {evt.category}
                </span>
                <h4 className="text-sm font-extrabold text-white mt-1 group-hover:text-cyan-300 transition-colors duration-200 truncate">
                  {evt.title}
                </h4>
                <p className="text-[10px] text-slate-300 mt-0.5">{evt.date} • {evt.organizer}</p>
              </div>
              
              {/* Hot indicator icon */}
              <div className="absolute top-4 right-4 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-lg p-1.5 backdrop-blur-md">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.46,12.78A8,8,0,1,1,11.5,3.95a7,7,0,0,1,7.96,8.83Z" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Grid Content (Sidebar widgets + Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Advanced Filters & Main Event Grid (Span 8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Advanced Filter panel */}
          <EventFilter 
            filters={filters} 
            onFilterChange={handleFilterChange} 
            onClearFilters={handleClearFilters}
          />

          {/* Grid display of active cards */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
              <span className="text-xs text-slate-500 font-bold">Synchronizing database...</span>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-20 bg-[#0d0725]/20 border border-white/5 rounded-2xl">
              <svg className="w-12 h-12 text-slate-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
              </svg>
              <h4 className="text-base font-extrabold text-white">No Matching Events</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                No active entries match your current filter parameters. Try resetting filters.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-4 px-4 py-2 text-xs font-bold text-white bg-purple-600/20 border border-purple-500/30 rounded-xl hover:bg-purple-600/35 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredEvents.slice(0, visibleEventsCount).map((event) => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    onViewDetails={() => setSelectedEventForModal(event)}
                    onRegister={() => setSelectedEventForModal(event)}
                  />
                ))}
              </div>
              
              {/* Pagination controls */}
              {visibleEventsCount < filteredEvents.length && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setVisibleEventsCount(prev => prev + 6)}
                    className="px-6 py-3 text-xs font-extrabold text-white bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-all duration-300"
                  >
                    Load More Events
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Side: Interactive Widgets Sidebar (Span 4) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Interactive Calendar Widget */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
              </svg>
              Events Calendar
            </h4>
            <EventCalendar 
              events={events} 
              onDaySelect={handleDaySelect}
            />
            {selectedCalendarDay && (
              <div className="mt-3 flex items-center justify-between text-xs p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                <span className="text-purple-300 font-bold">Filtered by date: {selectedCalendarDay}</span>
                <button 
                  onClick={() => setSelectedCalendarDay(null)}
                  className="text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Trending Analytics list widget */}
          <div className="bg-[#0d0725]/40 border border-white/5 rounded-2xl p-5 backdrop-blur-md">
            <h4 className="text-xs font-extrabold uppercase tracking-wide text-white mb-4">
              Category Rankings
            </h4>
            <div className="space-y-3">
              {popularCategories.map((cat, idx) => (
                <div key={idx} className="flex justify-between items-center bg-[#050212]/30 p-3 border border-white/2 rounded-xl">
                  <span className="text-xs text-slate-300 font-bold">{cat}</span>
                  <span className="text-[10px] font-extrabold text-purple-400 bg-purple-500/15 border border-purple-500/10 px-2.5 py-0.5 rounded-full">
                    Top {idx + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Chronological Timeline Widget */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
              <svg className="w-4 h-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Upcoming Schedule
            </h4>
            <EventTimeline 
              events={events.filter(e => e.status === 'open' || e.status === 'closing_soon')} 
              onViewDetails={setSelectedEventForModal}
            />
          </div>

        </div>

      </div>

      {/* Aggregate Statistics section */}
      <section className="mt-20">
        <h3 className="text-base font-extrabold uppercase tracking-wider text-white mb-8 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
          Metrics Board
        </h3>
        <EventStats events={events} />
      </section>

      {/* Newsletter signup section */}
      <section className="relative mt-20 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-[#7a22ff]/20 via-[#ff2a7a]/15 to-[#ffb800]/10 border border-white/5 overflow-hidden backdrop-blur-md">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-pink-500/20 blur-3xl rounded-full" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-left">
            <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2 leading-tight">
              Get Event Alerts Direct to Inbox
            </h3>
            <p className="text-xs md:text-sm text-slate-400 max-w-md">
              Subscribe to the newsletter for direct announcements, hackathon reminders, and registration ticket open updates.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {newsletterSubscribed ? (
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 px-6 py-4 rounded-xl text-emerald-400 font-bold text-xs">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Thank you! Your subscription is active.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full">
                <input
                  type="email"
                  placeholder="Enter email address"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-4 py-3 bg-[#050212]/50 border border-white/5 focus:border-purple-500 rounded-xl text-xs text-white placeholder-slate-500 outline-none w-full sm:w-72"
                />
                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-md shadow-purple-950/40 rounded-xl transition-all duration-200 flex-shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Details modal popup */}
      <EventDetailsModal
        event={selectedEventForModal}
        isOpen={selectedEventForModal !== null}
        onClose={() => setSelectedEventForModal(null)}
        onRegister={handleRegisterUser}
      />
    </div>
  );
};

export default Events;
