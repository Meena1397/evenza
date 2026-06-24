import { useState } from 'react';
import eventSymphony from './assets/event_symphony.png';
import eventParty from './assets/event_party.png';
import eventGirl from './assets/event_girl.png';
import eventGuy from './assets/event_guy.png';
import Events from './pages/Events';
import './App.css';

// Custom high-fidelity SVG illustration for Hero Section
const HeroIllustration = () => {
  return (
    <svg viewBox="0 0 500 500" className="hero-main-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Glow gradients */}
        <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7a22ff" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#050212" stopOpacity="0" />
        </radialGradient>
        
        {/* Letter 'E' gradients */}
        <linearGradient id="e-grad-back" x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#00d2ff" />
          <stop offset="50%" stopColor="#7a22ff" />
          <stop offset="100%" stopColor="#ff2a7a" />
        </linearGradient>
        
        <linearGradient id="e-grad-front" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#ff7a00" />
          <stop offset="100%" stopColor="#ffb800" />
        </linearGradient>

        <linearGradient id="ticket-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff2a7a" />
          <stop offset="100%" stopColor="#ffb800" />
        </linearGradient>

        <linearGradient id="star-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffea00" />
          <stop offset="100%" stopColor="#ff6b00" />
        </linearGradient>
        
        {/* Drop shadow filters */}
        <filter id="shadow-e" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="12" stdDeviation="15" floodColor="#7a22ff" floodOpacity="0.3" />
        </filter>
        
        <filter id="shadow-ticket" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="4" dy="10" stdDeviation="8" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* Background glow behind letter E */}
      <circle cx="250" cy="250" r="230" fill="url(#bg-glow)" />

      {/* Large faint background Letter 'E' */}
      <text x="180" y="380" fill="white" fillOpacity="0.03" fontSize="300" fontWeight="900" fontFamily="sans-serif">E</text>

      {/* Main Stylized Letter 'E' Graphic */}
      <g filter="url(#shadow-e)">
        {/* Back swoosh of letter 'E' */}
        <path 
          d="M 330 140 
             C 240 100, 160 180, 160 270 
             C 160 360, 240 420, 340 370
             C 380 350, 420 280, 420 280
             C 420 280, 390 320, 350 330
             C 280 350, 210 320, 210 270
             C 210 220, 260 170, 330 170
             Z" 
          fill="url(#e-grad-back)" 
        />
        
        {/* Front horizontal ribbon of letter 'E' */}
        <path 
          d="M 200 280 
             C 220 260, 260 210, 320 210
             C 380 210, 400 260, 360 280
             C 330 295, 270 295, 230 295
             Z" 
          fill="url(#e-grad-front)" 
        />
      </g>

      {/* Graduation Cap resting on top of E */}
      <g className="float-element">
        {/* Tassel line and button */}
        <path d="M 285 62 L 235 110 C 230 115, 230 125, 235 125 L 245 130" stroke="#ffb800" strokeWidth="3" strokeLinecap="round" />
        <circle cx="245" cy="130" r="5" fill="#ffb800" />
        
        {/* Diamond cap top */}
        <polygon points="285,45 390,75 285,105 180,75" fill="#1b1c31" stroke="#5a29b8" strokeWidth="4" />
        <polygon points="285,50 370,75 285,100 200,75" fill="#111226" />
        
        {/* Cap skull base */}
        <path d="M 240 88 L 240 115 C 240 125, 330 125, 330 115 L 330 88" fill="#141529" stroke="#5a29b8" strokeWidth="3" />
        <path d="M 250 92 C 250 102, 320 102, 320 92" stroke="#5a29b8" strokeWidth="2" />
        
        {/* Cap button */}
        <ellipse cx="285" cy="75" rx="7" ry="5" fill="#ffb800" />
      </g>

      {/* Event Ticket in Bottom Right */}
      <g filter="url(#shadow-ticket)" className="float-delayed" transform="rotate(-12, 380, 360)">
        {/* Ticket body */}
        <rect x="330" y="320" width="130" height="75" rx="8" fill="url(#ticket-grad)" />
        
        {/* Ticket side cutouts */}
        <circle cx="330" cy="357" r="10" fill="#050212" />
        <circle cx="460" cy="357" r="10" fill="#050212" />
        
        {/* Ticket design elements */}
        <line x1="365" y1="330" x2="365" y2="385" stroke="#050212" strokeWidth="2" strokeDasharray="4 4" strokeOpacity="0.4" />
        
        {/* Cutout star icon inside ticket */}
        <path d="M 412 342 L 415 350 L 423 351 L 417 357 L 419 365 L 412 360 L 405 365 L 407 357 L 401 351 L 409 350 Z" fill="#050212" fillOpacity="0.3" />
      </g>

      {/* Floating Sparkles & Stars */}
      <g className="float-element">
        {/* Star Top Right */}
        <path d="M 430 90 L 434 100 L 444 102 L 436 108 L 439 118 L 430 112 L 421 118 L 424 108 L 416 102 L 426 100 Z" fill="url(#star-grad)" />
        
        {/* Star Mid Left */}
        <path d="M 120 190 L 122 195 L 127 196 L 123 200 L 124 205 L 120 202 L 116 205 L 117 200 L 113 196 L 118 195 Z" fill="#00d2ff" />
        
        {/* Small Purple Star */}
        <path d="M 370 170 L 372 174 L 377 175 L 373 179 L 374 184 L 370 181 L 366 184 L 367 179 L 363 175 L 368 174 Z" fill="#b800ff" />
        
        {/* Small Confetti pieces */}
        <circle cx="160" cy="120" r="4" fill="#ff2a7a" />
        <rect x="400" y="210" width="8" height="8" rx="2" transform="rotate(45, 400, 210)" fill="#ffb800" />
        <rect x="140" y="320" width="6" height="12" rx="1" transform="rotate(15, 140, 320)" fill="#00d2ff" />
        <circle cx="280" cy="430" r="5" fill="#7a22ff" />
      </g>
    </svg>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [searchOpen, setSearchOpen] = useState(false);
  const [themeMode, setThemeMode] = useState('dark');
  const [hoveredTimeline, setHoveredTimeline] = useState(null);

  const navigationItems = ['Home', 'Events', 'About Us', 'Organize', 'Blog', 'Contact'];

  const featuredEvents = [
    {
      id: 1,
      tag: 'Tech',
      image: eventSymphony,
      title: 'Tech Fest 2026',
      location: 'Main Auditorium',
      date: '22 - 25 May, 2026',
      participants: '500+ Participants',
      class: 'tech'
    },
    {
      id: 2,
      tag: 'Cultural',
      image: eventParty,
      title: 'Cultural Night',
      location: 'Open Air Theatre',
      date: '27 May, 2026',
      participants: '800+ Participants',
      class: 'cultural'
    },
    {
      id: 3,
      tag: 'Workshop',
      image: eventGirl,
      title: 'Web Dev Workshop',
      location: 'Lab 3, Block B',
      date: '05 June, 2026',
      participants: '150+ Participants',
      class: 'workshop'
    },
    {
      id: 4,
      tag: 'Sports',
      image: eventGuy,
      title: 'Sports Meet 2026',
      location: 'College Ground',
      date: '10 - 12 June, 2026',
      participants: '600+ Participants',
      class: 'sports'
    }
  ];

  const stats = [
    { value: '120+', label: 'Events Hosted', type: 'purple', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    )},
    { value: '15K+', label: 'Active Students', type: 'blue', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    )},
    { value: '80+', label: 'Event Organizers', type: 'orange', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    )},
    { value: '25+', label: 'Colleges Connected', type: 'pink', icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10v6"></path>
        <path d="M6 12v4M18 12v4"></path>
        <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
        <path d="M6 17v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3"></path>
      </svg>
    )}
  ];

  const features = [
    {
      title: 'Easy Registration',
      description: 'Quick and hassle-free registration for all events.',
      color: 'purple',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    },
    {
      title: 'Smart Entry',
      description: 'QR-based digital tickets for smooth event entry.',
      color: 'blue',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
          <path d="M9 6h6M9 10h6M9 14h6"></path>
        </svg>
      )
    },
    {
      title: 'Real-time Updates',
      description: 'Instant notifications and reminders for events.',
      color: 'orange',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
      )
    },
    {
      title: 'Event Insights',
      description: 'Powerful analytics and reports for organizers.',
      color: 'pink',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      )
    }
  ];

  const timelineEvents = [
    { day: '20', month: 'May', title: 'Tech Fest 2026', location: 'Main Auditorium', color: 'purple' },
    { day: '27', month: 'May', title: 'Cultural Night', location: 'Open Air Theatre', color: 'orange' },
    { day: '05', month: 'Jun', title: 'Web Dev Workshop', location: 'Lab 3, Block B', color: 'blue' },
    { day: '10', month: 'Jun', title: 'Sports Meet 2026', location: 'College Ground', color: 'pink' }
  ];

  return (
    <>
      {/* Background glow orbs */}
      <div className="bg-glow-container">
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
      </div>

      {/* 1. Header (Navbar) */}
      <header className="navbar">
        <div className="navbar-container">
          <div className="logo-group" onClick={() => setActiveTab('Home')}>
            {/* Styled colorful logo mark */}
            <svg className="logo-icon-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00d2ff" />
                  <stop offset="50%" stopColor="#7a22ff" />
                  <stop offset="100%" stopColor="#ff5e3a" />
                </linearGradient>
              </defs>
              {/* Back Ring */}
              <circle cx="50" cy="50" r="38" stroke="url(#logo-grad)" strokeWidth="8" strokeLinecap="round" strokeDasharray="180 80" />
              {/* Front letter E shape */}
              <path d="M 45 35 L 65 35 M 45 50 L 60 50 M 45 65 L 65 65 M 45 35 L 45 65" stroke="url(#logo-grad)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="logo-info">
              <span className="logo-text">Campus Events</span>
              <span className="logo-tagline">Plan • Manage • Celebrate</span>
            </div>
          </div>

          <nav className="nav-links">
            {navigationItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className={`nav-link ${activeTab === item ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item);
                }}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            {/* Search Icon Toggle */}
            <button 
              className="icon-btn" 
              onClick={() => setSearchOpen(!searchOpen)} 
              aria-label="Search events"
              style={{ position: 'relative' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              {searchOpen && (
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="search-input" 
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute',
                    right: '45px',
                    top: '3px',
                    background: '#130d35',
                    border: '1px solid #7a22ff',
                    borderRadius: '20px',
                    padding: '0.4rem 1rem',
                    color: '#fff',
                    outline: 'none',
                    fontSize: '0.85rem',
                    width: '150px'
                  }}
                  autoFocus
                />
              )}
            </button>

            {/* Theme Toggle Button */}
            <button 
              className="icon-btn" 
              onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {themeMode === 'dark' ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              )}
            </button>

            <button className="login-btn">Login</button>
          </div>
        </div>
      </header>

      <main className="app-container">
        {activeTab === 'Events' ? (
          <Events />
        ) : (
          <>
            {/* 2. Hero Section */}
        <section className="hero-section" id="home">
          <div className="hero-content">
            <span className="hero-badge">Welcome To</span>
            <h1 className="hero-title">
              CAMPUS <br/>
              <span className="gradient-text">EVENTS</span>
            </h1>
            <p className="hero-subtitle">
              Plan <span className="dot"></span> Manage <span className="dot"></span> Celebrate
            </p>
            <p className="hero-description">
              A smart platform to discover, organize and manage college events effortlessly.
            </p>
            
            <div className="hero-btn-group">
              <a 
                href="#events" 
                className="btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('Events');
                }}
              >
                <span>Explore Events</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
              <button className="btn-outline">
                <span>Create Event</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </button>
            </div>

            {/* Overlapping student proof avatars */}
            <div className="social-proof">
              <div className="avatar-stack">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Student avatar 1" />
                <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80" alt="Student avatar 2" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Student avatar 3" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Student avatar 4" />
              </div>
              <p className="social-proof-text">
                <span>15K+</span> students are already <br/>part of Campus Events.
              </p>
            </div>
          </div>

          <div className="hero-graphic">
            <div className="hero-svg-container">
              <HeroIllustration />
            </div>
          </div>
        </section>

        {/* 3. Featured Events Section */}
        <section className="section-wrapper" id="events">
          <div className="section-header">
            <h2 className="section-title">
              <span className="emoji">✨</span> FEATURED EVENTS
            </h2>
            <a href="#all-events" className="section-link">
              <span>View All Events</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          <div className="events-grid">
            {featuredEvents.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-img-container">
                  <img src={event.image} alt={event.title} className="event-card-img" />
                  <span className={`event-badge ${event.class}`}>{event.tag}</span>
                </div>
                <div className="event-info">
                  <h3 className="event-card-title">{event.title}</h3>
                  
                  <div className="event-details-list">
                    <div className="event-detail-item">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span>{event.location}</span>
                    </div>
                    <div className="event-detail-item">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>{event.date}</span>
                    </div>
                    <div className="event-detail-item">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                      </svg>
                      <span>{event.participants}</span>
                    </div>
                  </div>

                  <button className={`card-btn ${event.class}`}>Register Now</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Stats Counter Section */}
        <section className="stats-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className={`stat-icon-wrapper ${stat.type}`}>
                  {stat.icon}
                </div>
                <div className="stat-info">
                  <span className="stat-number">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Why Choose Us Section */}
        <section className="why-section" id="about-us">
          <div className="why-title-group">
            <h2 className="why-section-title">WHY CHOOSE CAMPUS EVENTS?</h2>
            <div className="title-underline-grad"></div>
          </div>

          <div className="why-grid">
            {features.map((feature, index) => (
              <div key={index} className="why-card">
                <div className={`why-icon-circle ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="why-card-title">{feature.title}</h3>
                <p className="why-card-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Upcoming Events Timeline */}
        <section className="section-wrapper" id="organize">
          <div className="section-header">
            <h2 className="section-title">
              <span className="emoji">📅</span> UPCOMING EVENTS
            </h2>
            <a href="#calendar" className="section-link">
              <span>View Full Calendar</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          <div className="timeline-wrapper">
            <div className="timeline-line-container">
              {/* Central horizontal line */}
              <div className="timeline-horizontal-line">
                <div className="timeline-horizontal-line-progress"></div>
              </div>

              <div className="timeline-grid">
                {timelineEvents.map((evt, idx) => (
                  <div 
                    key={idx} 
                    className={`timeline-node ${evt.color} ${hoveredTimeline === idx ? 'hovered' : ''}`}
                    onMouseEnter={() => setHoveredTimeline(idx)}
                    onMouseLeave={() => setHoveredTimeline(null)}
                  >
                    {/* Event Detail Box above dot */}
                    <div className="timeline-card">
                      <div className="timeline-date-box">
                        <span className="timeline-day">{evt.day}</span>
                        <span className="timeline-month">{evt.month}</span>
                      </div>
                      <div className="timeline-info">
                        <h4 className="timeline-event-title">{evt.title}</h4>
                        <span className="timeline-event-desc">{evt.location}</span>
                      </div>
                    </div>

                    {/* Connecting Dot */}
                    <div className="timeline-dot"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. Call To Action (CTA) Banner */}
        <section className="cta-banner" id="contact">
          <div className="cta-left">
            <div className="cta-megaphone-container">
              {/* Detailed megaphone SVG */}
              <svg className="cta-megaphone-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="speaker-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffb800" />
                    <stop offset="100%" stopColor="#ff2a7a" />
                  </linearGradient>
                  <linearGradient id="handle-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#7a22ff" />
                    <stop offset="100%" stopColor="#4500ad" />
                  </linearGradient>
                </defs>
                {/* Sound waves floating */}
                <path d="M 68 35 A 15 15 0 0 1 68 65" stroke="white" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.4" className="float-element" />
                <path d="M 78 25 A 30 30 0 0 1 78 75" stroke="white" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.7" className="float-delayed" />
                
                {/* Megaphone Handle */}
                <path d="M 40 55 L 43 78 C 44 83, 33 85, 32 80 L 32 58 Z" fill="url(#handle-grad)" />
                
                {/* Megaphone Body */}
                <path d="M 20 40 L 48 30 L 58 68 L 22 56 Z" fill="url(#speaker-grad)" />
                
                {/* Megaphone Opening Rim */}
                <ellipse cx="58" cy="49" rx="7" ry="19" fill="#1b1c31" stroke="white" strokeWidth="3" />
                
                {/* Megaphone Back / Button */}
                <path d="M 21 40 C 18 42, 18 54, 21 56 Z" fill="#ffb800" />
              </svg>
            </div>
            <div className="cta-text">
              <h2 className="cta-title">Ready to Host Your Next Event?</h2>
              <p className="cta-description">
                Plan, manage and celebrate amazing events with Campus Events - your all-in-one event partner.
              </p>
            </div>
          </div>

          <button className="cta-btn" onClick={() => setActiveTab('Events')}>
            <span>Get Started</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </section>
          </>
        )}
      </main>

      {/* 8. Footer */}
      <footer className="footer">
        <div className="footer-container">
          <span className="footer-logo">Campus Events</span>
          <p className="footer-text">© 2026 Campus Events. All rights reserved.</p>
          <div className="footer-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#help">Help Center</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
