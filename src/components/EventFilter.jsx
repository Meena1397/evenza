import React, { useState } from 'react';

const EventFilter = ({ filters, onFilterChange, onClearFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    'Technical', 'Cultural', 'Sports', 'Workshop', 'Seminar', 
    'Hackathon', 'Competition', 'Fest', 'Placement Drive'
  ];

  const locations = [
    { value: 'on-campus', label: 'On Campus' },
    { value: 'online', label: 'Online' },
    { value: 'hybrid', label: 'Hybrid' }
  ];

  const statuses = [
    { value: 'open', label: 'Open' },
    { value: 'closing_soon', label: 'Closing Soon' },
    { value: 'closed', label: 'Closed' }
  ];

  const fees = [
    { value: 'free', label: 'Free' },
    { value: 'paid', label: 'Paid' }
  ];

  const organizerTypes = [
    { value: 'department', label: 'Department' },
    { value: 'club', label: 'Club' },
    { value: 'student-council', label: 'Student Council' },
    { value: 'external', label: 'External Organization' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'date', label: 'Event Date' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'registrations', label: 'Highest Registrations' },
    { value: 'alphabetical', label: 'Alphabetical' }
  ];

  const handleCheckboxChange = (field, value) => {
    const currentValues = filters[field] || [];
    const isChecked = currentValues.includes(value);
    
    let nextValues;
    if (isChecked) {
      nextValues = currentValues.filter(v => v !== value);
    } else {
      nextValues = [...currentValues, value];
    }
    
    onFilterChange(field, nextValues);
  };

  const handlePresetDateChange = (preset) => {
    // Presets: today, tomorrow, week, month, custom
    onFilterChange('datePreset', preset);
  };

  return (
    <div className="w-full bg-[#0d0725]/40 border border-white/5 rounded-2xl p-5 backdrop-blur-md mb-8">
      {/* Search Bar & Basic Sort & Expand Toggle */}
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
        
        {/* Search */}
        <div className="flex-1 relative">
          <svg className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by Event Name, Organizer, Venue..."
            value={filters.search || ''}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[#050212]/50 border border-white/5 focus:border-purple-500 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-all duration-300"
          />
        </div>

        {/* Sort & Quick Buttons */}
        <div className="flex items-center gap-3">
          {/* Sorting */}
          <div className="relative flex items-center bg-[#050212]/50 border border-white/5 rounded-xl px-3 py-1">
            <span className="text-xs text-slate-500 mr-2 font-medium">Sort By:</span>
            <select
              value={filters.sortBy || 'newest'}
              onChange={(e) => onFilterChange('sortBy', e.target.value)}
              className="bg-transparent text-xs text-white outline-none cursor-pointer py-2 pr-2 font-semibold"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value} className="bg-[#0f092b] text-slate-200">
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Panel Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold rounded-xl border transition-all duration-300 ${
              isOpen || Object.keys(filters).some(k => k !== 'search' && k !== 'sortBy' && filters[k] && (!Array.isArray(filters[k]) || filters[k].length > 0))
                ? 'bg-purple-600/20 text-purple-300 border-purple-500/30'
                : 'bg-white/5 text-slate-300 border-white/5 hover:bg-white/10'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
            <span>Filters</span>
            <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {/* Clear Button */}
          <button
            onClick={onClearFilters}
            className="px-4 py-3 text-xs font-semibold text-slate-400 hover:text-white bg-[#ff5e3a]/10 hover:bg-[#ff5e3a]/25 border border-[#ff5e3a]/10 hover:border-[#ff5e3a]/30 rounded-xl transition-all duration-300"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Advanced Filters Expandable Grid */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-[1000px] opacity-100 mt-6 pt-6 border-t border-white/5' : 'max-h-0 opacity-0'
      }`}>
        
        {/* Category Checklist */}
        <div className="flex flex-col gap-2.5">
          <h4 className="text-xs uppercase tracking-wider text-purple-400 font-bold mb-1">Categories</h4>
          <div className="max-h-40 overflow-y-auto space-y-1.5 pr-2 scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-transparent">
            {categories.map(cat => (
              <label key={cat} className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={(filters.categories || []).includes(cat)}
                  onChange={() => handleCheckboxChange('categories', cat)}
                  className="rounded text-purple-600 focus:ring-purple-500 bg-[#050212]/50 border-white/5"
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Date Filter Selection */}
        <div className="flex flex-col gap-2.5">
          <h4 className="text-xs uppercase tracking-wider text-purple-400 font-bold mb-1">Event Date</h4>
          <div className="grid grid-cols-2 gap-1.5 mb-2">
            {['all', 'today', 'tomorrow', 'this-week', 'this-month', 'custom'].map(preset => (
              <button
                key={preset}
                type="button"
                onClick={() => handlePresetDateChange(preset)}
                className={`py-1.5 text-[10px] font-bold rounded-lg border capitalize transition-all duration-200 ${
                  (filters.datePreset || 'all') === preset
                    ? 'bg-purple-600/30 text-purple-300 border-purple-500/40'
                    : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                }`}
              >
                {preset.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Custom Date Inputs */}
          {filters.datePreset === 'custom' && (
            <div className="flex gap-2">
              <input
                type="date"
                value={filters.startDate || ''}
                onChange={(e) => onFilterChange('startDate', e.target.value)}
                className="flex-1 px-2 py-1.5 bg-[#050212]/50 border border-white/5 rounded-lg text-[10px] text-white outline-none focus:border-purple-500"
              />
              <input
                type="date"
                value={filters.endDate || ''}
                onChange={(e) => onFilterChange('endDate', e.target.value)}
                className="flex-1 px-2 py-1.5 bg-[#050212]/50 border border-white/5 rounded-lg text-[10px] text-white outline-none focus:border-purple-500"
              />
            </div>
          )}
        </div>

        {/* Location & Status Filters */}
        <div className="flex flex-col gap-5">
          {/* Location */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs uppercase tracking-wider text-purple-400 font-bold mb-1">Format</h4>
            <div className="flex gap-1.5">
              {locations.map(loc => (
                <button
                  key={loc.value}
                  type="button"
                  onClick={() => handleCheckboxChange('locations', loc.value)}
                  className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg border transition-all duration-200 ${
                    (filters.locations || []).includes(loc.value)
                      ? 'bg-purple-600/30 text-purple-300 border-purple-500/40'
                      : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                  }`}
                >
                  {loc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Registration Status */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs uppercase tracking-wider text-purple-400 font-bold mb-1">Status</h4>
            <div className="flex gap-1.5">
              {statuses.map(st => (
                <button
                  key={st.value}
                  type="button"
                  onClick={() => handleCheckboxChange('statuses', st.value)}
                  className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg border text-center transition-all duration-200 ${
                    (filters.statuses || []).includes(st.value)
                      ? 'bg-purple-600/30 text-purple-300 border-purple-500/40'
                      : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Fee & Organizer Type Filters */}
        <div className="flex flex-col gap-5">
          {/* Fees */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs uppercase tracking-wider text-purple-400 font-bold mb-1">Ticket Fee</h4>
            <div className="flex gap-1.5">
              {fees.map(f => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => onFilterChange('fee', filters.fee === f.value ? null : f.value)}
                  className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg border transition-all duration-200 ${
                    filters.fee === f.value
                      ? 'bg-purple-600/30 text-purple-300 border-purple-500/40'
                      : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Organizer Type */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-xs uppercase tracking-wider text-purple-400 font-bold mb-1">Organizer Type</h4>
            <div className="max-h-24 overflow-y-auto space-y-1.5 pr-2 scrollbar-thin">
              {organizerTypes.map(type => (
                <label key={type.value} className="flex items-center gap-2.5 text-xs text-slate-300 hover:text-white cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={(filters.organizerTypes || []).includes(type.value)}
                    onChange={() => handleCheckboxChange('organizerTypes', type.value)}
                    className="rounded text-purple-600 focus:ring-purple-500 bg-[#050212]/50 border-white/5"
                  />
                  <span>{type.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EventFilter;
