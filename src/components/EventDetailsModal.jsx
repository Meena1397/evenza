import React, { useState } from 'react';
import { exportToCalendar } from '../services/calendarService';

const EventDetailsModal = ({ event, isOpen, onClose, onRegister }) => {
  const [activeTab, setActiveTab] = useState('about');
  const [registering, setRegistering] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  if (!isOpen || !event) return null;

  const {
    id,
    title,
    category,
    description,
    date,
    time,
    venue,
    organizer,
    fee,
    seatsAvailable,
    registrations,
    image,
    status,
    schedule,
    rules = [],
    speakers = [],
    contact = {}
  } = event;

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!email || !name) return;

    setRegistering(true);
    try {
      await onRegister(id, { name, email });
      setSuccess(true);
    } catch (err) {
      alert(err.message || "Failed to register!");
    } finally {
      setRegistering(false);
    }
  };

  const getFormattedDate = (dateStr) => {
    try {
      const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
      return new Date(dateStr).toLocaleDateString('en-US', options);
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="fixed inset-0 z-150 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#0d0725] border border-white/10 rounded-2xl overflow-y-auto flex flex-col shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),_0_0_30px_rgba(122,34,255,0.2)] scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-white/5 rounded-full transition-all duration-200"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Banner */}
        <div className="relative aspect-[21/9] w-full overflow-hidden flex-shrink-0">
          <img 
            src={image || "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=60"} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0725] via-black/40 to-transparent" />
          
          {/* Header Title Block inside Banner */}
          <div className="absolute bottom-5 left-6 right-6">
            <span className="px-3 py-0.5 text-[10px] font-bold text-cyan-300 uppercase tracking-widest bg-cyan-900/40 border border-cyan-500/20 rounded-md backdrop-blur-md">
              {category}
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-white mt-2 leading-tight">
              {title}
            </h2>
          </div>
        </div>

        {/* Modal Content Sections */}
        <div className="p-6 md:p-8">
          
          {/* Calendar export & Metadata Quick Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 mb-6 rounded-xl bg-white/2 border border-white/5">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Date & Time</span>
              <span className="text-xs text-slate-200 font-bold">{getFormattedDate(date)} at {time}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => exportToCalendar(event)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-white bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                  <line x1="12" y1="11" x2="12" y2="17" />
                  <polyline points="9 14 12 11 15 14" />
                </svg>
                <span>Add to Calendar</span>
              </button>
            </div>
          </div>

          {/* Sub Navigation tabs */}
          <div className="flex border-b border-white/5 mb-6">
            {['about', 'schedule', 'rules & speakers'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 text-xs font-bold capitalize border-b-2 transition-all duration-200 ${
                  activeTab === tab 
                    ? 'border-purple-500 text-white' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Panels */}
          <div className="mb-8 min-h-[120px]">
            {activeTab === 'about' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  {description}
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <h5 className="text-[10px] text-slate-500 uppercase font-semibold mb-1">Venue Location</h5>
                    <p className="text-xs text-slate-200 font-bold">{venue}</p>
                  </div>
                  <div>
                    <h5 className="text-[10px] text-slate-500 uppercase font-semibold mb-1">Organizer</h5>
                    <p className="text-xs text-slate-200 font-bold">{organizer}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="bg-[#050212]/40 rounded-xl p-4 border border-white/5">
                <h4 className="text-xs font-bold text-white uppercase tracking-wide mb-3">Event Agenda</h4>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line font-medium">
                  {schedule || "No detailed timeline provided. Please check back later."}
                </p>
              </div>
            )}

            {activeTab === 'rules & speakers' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Guidelines */}
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wide mb-3">Guidelines & Rules</h4>
                  {rules.length > 0 ? (
                    <ul className="space-y-2 list-disc list-inside text-xs text-slate-300 font-medium">
                      {rules.map((rule, idx) => (
                        <li key={idx} className="leading-relaxed">{rule}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-500">Standard college rules apply.</p>
                  )}
                </div>

                {/* Speakers */}
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wide mb-3">Speakers & Guests</h4>
                  {speakers.length > 0 ? (
                    <div className="space-y-3">
                      {speakers.map((spk, idx) => (
                        <div key={idx} className="flex items-center gap-3 bg-white/2 border border-white/5 rounded-xl p-2.5">
                          <img 
                            src={spk.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"} 
                            alt={spk.name}
                            className="w-9 h-9 rounded-full object-cover border border-white/10"
                          />
                          <div>
                            <h5 className="text-xs text-white font-extrabold">{spk.name}</h5>
                            <p className="text-[10px] text-slate-400 font-medium">{spk.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">No external speakers listed.</p>
                  )}
                </div>

              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-white/5 my-6" />

          {/* Registration Section */}
          <div className="bg-[#050212]/50 border border-white/5 rounded-2xl p-5">
            {success ? (
              <div className="text-center py-4 space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-1">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h4 className="text-base font-extrabold text-white">Registration Confirmed!</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                  You are registered. A confirmation email with the ticket and schedule has been dispatched to {email}.
                </p>
              </div>
            ) : status === 'closed' || seatsAvailable === 0 ? (
              <div className="text-center py-4 text-slate-500 text-xs font-semibold">
                Registrations are closed for this event.
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 mb-2">
                  <div>
                    <h4 className="text-sm font-extrabold text-white">Secure Your Pass Now</h4>
                    <p className="text-[11px] text-slate-400 font-medium">Available Seats: {seatsAvailable} • Fee: {fee === 0 ? 'Free' : `$${fee}`}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-4 py-2.5 text-xs text-white bg-slate-900/60 border border-white/5 rounded-xl focus:border-purple-500 outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-2.5 text-xs text-white bg-slate-900/60 border border-white/5 rounded-xl focus:border-purple-500 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={registering}
                  className="w-full py-3 text-xs font-bold text-white uppercase tracking-wider rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-md shadow-purple-950/40 transition-all duration-200"
                >
                  {registering ? 'Processing...' : 'Register For Event'}
                </button>
              </form>
            )}
          </div>

          {/* Organizer Contact Info */}
          <div className="flex flex-wrap justify-between text-[10px] text-slate-500 font-semibold mt-6">
            <span>Inquiries: {contact.email || 'info@college.edu'}</span>
            <span>Helpline: {contact.phone || 'N/A'}</span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default EventDetailsModal;
