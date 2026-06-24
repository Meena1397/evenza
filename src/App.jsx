import { useState, useEffect } from 'react'
import heroConcert from './assets/hero_concert.png'
import eventParty from './assets/event_party.png'
import eventGuy from './assets/event_guy.png'
import eventGirl from './assets/event_girl.png'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('Home')
  const [activeSlide, setActiveSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const navigationItems = ['Home', 'Events', 'Artists', 'Schedule', 'Contact']

  const slides = [
    {
      title: 'IGNITE FEST 2026',
      subtitle: 'Experience the Future of Music',
      badge: 'LIVE MUSIC EXPERIENCE',
      colorTheme: 'cyan-theme'
    },
    {
      title: 'NEON RAVE 2026',
      subtitle: 'Where Beats Meet the Stars',
      badge: 'ELECTRONIC & DANCE',
      colorTheme: 'purple-theme'
    },
    {
      title: 'ACOUSTIC SESSIONS',
      subtitle: 'Pure Sounds, Intimate Vibes',
      badge: 'UNPLUGGED & INDIE',
      colorTheme: 'indigo-theme'
    }
  ]

  // Auto-play logic for carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying, slides.length])

  const handleDotClick = (index) => {
    setActiveSlide(index)
    setIsAutoPlaying(false) // Pause auto-play when user interacts manually
  }

  return (
    <div className="app-container">
      {/* Background glowing effects */}
      <div className="glow-orb glow-top-left"></div>
      <div className="glow-orb glow-bottom-right"></div>

      {/* Navigation Header */}
      <header className="navbar">
        <div className="navbar-container">
          <div className="logo-group">
            <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="url(#logo-grad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 7L7 12L12 17" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 12H11" stroke="url(#logo-grad)" strokeWidth="2" strokeLinecap="round"/>
              <defs>
                <linearGradient id="logo-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00d2ff" />
                  <stop offset="1" stopColor="#7a22ff" />
                </linearGradient>
              </defs>
            </svg>
            <span className="logo-text">Evenza</span>
          </div>

          <nav className="nav-links">
            {navigationItems.map((item) => (
              <button
                key={item}
                className={`nav-link-btn ${activeTab === item ? 'active' : ''}`}
                onClick={() => setActiveTab(item)}
              >
                {item}
                {activeTab === item && <span className="active-indicator"></span>}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section Carousel */}
        <section className="hero-carousel">
          <div className="hero-carousel-inner">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`hero-slide ${index === activeSlide ? 'active' : ''} ${slide.colorTheme}`}
              >
                {/* Background Image with Tint Overlay */}
                <div className="hero-bg-wrapper">
                  <img src={heroConcert} alt="Concert Atmosphere" className="hero-bg-img" />
                  <div className="hero-overlay"></div>
                </div>

                {/* Hero Content */}
                <div className="hero-content">
                  <span className="hero-badge">{slide.badge}</span>
                  <h1 className="hero-title">{slide.title}</h1>
                  <p className="hero-subtitle">{slide.subtitle}</p>
                  
                  <button className="btn-get-tickets">
                    <span>GET TICKETS</span>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Dots */}
          <div className="carousel-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`dot-btn ${index === activeSlide ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </section>

        {/* Event Categories Section */}
        <section className="categories-section">
          <div className="section-header">
            <h2 className="section-title">Event Categories</h2>
            <p className="section-subtitle">Discover live musical events tailored to your vibe</p>
          </div>

          <div className="categories-grid">
            {/* Card 1: Music Festivals (Custom List Card) */}
            <div className="category-card text-list-card">
              <h3 className="card-header-title">Music Festivals</h3>
              
              <ul className="category-list">
                <li className="list-item">
                  <span className="item-name">Rock</span>
                  <button className="item-arrow-btn" aria-label="Explore Rock festivals">
                    <svg className="chevron-right" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </li>
                <li className="list-item">
                  <span className="item-name">Pop</span>
                  <button className="item-arrow-btn" aria-label="Explore Pop festivals">
                    <svg className="chevron-right" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </li>
                <li className="list-item">
                  <span className="item-name">Electronic</span>
                  <button className="item-arrow-btn" aria-label="Explore Electronic festivals">
                    <svg className="chevron-right" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </li>
                <li className="list-item">
                  <span className="item-name">Hip Hop</span>
                  <button className="item-arrow-btn" aria-label="Explore Hip Hop festivals">
                    <svg className="chevron-right" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </li>
              </ul>
            </div>

            {/* Card 2: Image Card (Festival Party) */}
            <div className="category-card image-card">
              <div className="image-wrapper">
                <img src={eventParty} alt="Festival crowd having fun" className="card-img" />
                <div className="card-gradient"></div>
              </div>
              
              <div className="card-badge badge-cyan">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>

              <div className="card-details">
                <span className="event-tag tag-cyan">Pop Vibes</span>
                <h4 className="event-title">Summer Echoes</h4>
                <p className="event-info">Aug 15 • San Francisco, CA</p>
              </div>
            </div>

            {/* Card 3: Image Card (Guy Smiling) */}
            <div className="category-card image-card">
              <div className="image-wrapper">
                <img src={eventGuy} alt="Smiling man at event" className="card-img" />
                <div className="card-gradient"></div>
              </div>

              <div className="card-badge badge-purple">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>

              <div className="card-details">
                <span className="event-tag tag-purple">Rock Nights</span>
                <h4 className="event-title">Thunder Arena</h4>
                <p className="event-info">Sep 02 • Austin, TX</p>
              </div>
            </div>

            {/* Card 4: Image Card (Girl Smiling) */}
            <div className="category-card image-card">
              <div className="image-wrapper">
                <img src={eventGirl} alt="Smiling woman enjoying music" className="card-img" />
                <div className="card-gradient"></div>
              </div>

              <div className="card-badge badge-indigo">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>

              <div className="card-details">
                <span className="event-tag tag-indigo">Clubbing</span>
                <h4 className="event-title">Techno Horizon</h4>
                <p className="event-info">Sep 28 • New York, NY</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 Evenza. All rights reserved. Premium Event Portal Experience.</p>
      </footer>
    </div>
  )
}

export default App
