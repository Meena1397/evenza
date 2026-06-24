import { useState, useEffect } from 'react'
import heroConcert from './assets/hero_concert.png'
import eventParty from './assets/event_party.png'
import eventGuy from './assets/event_guy.png'
import eventGirl from './assets/event_girl.png'
import eventSymphony from './assets/event_symphony.png'
import eventVibe from './assets/event_vibe.png'
import eventAcoustic from './assets/event_acoustic.png'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('Home')
  const [activeSlide, setActiveSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [activeAnnouncement, setActiveAnnouncement] = useState(0)
  const [timeLeft, setTimeLeft] = useState({ days: 30, hours: 12, minutes: 44, seconds: 59 })

  // Contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)

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

  const stats = [
    { value: '50+', label: 'Live Events', icon: '🎉' },
    { value: '12k+', label: 'Tickets Sold', icon: '🎫' },
    { value: '98%', label: 'Positive Vibe', icon: '⭐' },
    { value: '200+', label: 'Artists', icon: '🎸' }
  ]

  const upcomingEvents = [
    {
      image: eventSymphony,
      date: 'OCT 12',
      price: '$45',
      title: 'Electric Symphony',
      venue: 'Main Concert Hall',
      tag: 'Classical Remix'
    },
    {
      image: eventVibe,
      date: 'OCT 29',
      price: '$35',
      title: 'Vibe Theory',
      venue: 'Underground Stage',
      tag: 'Hip Hop'
    },
    {
      image: eventAcoustic,
      date: 'NOV 15',
      price: '$25',
      title: 'Midnight Acoustic',
      venue: 'Studio Lounge',
      tag: 'Indie Unplugged'
    }
  ]

  const announcements = [
    {
      title: 'Early Bird Tickets Live',
      date: 'June 24, 2026',
      content: 'Early Bird ticket sales for Ignite Fest 2026 are officially open. Use code EARLY26 to get 25% off regular prices.'
    },
    {
      title: 'Neon Rave Lineup Leak',
      date: 'June 20, 2026',
      content: 'Three massive electronic music headliners have just been leaked for Neon Rave 2026. Stay tuned for the official artist roster next week.'
    },
    {
      title: 'Student Discount Program',
      date: 'June 15, 2026',
      content: 'Evenza offers exclusive student prices. Verify with your university email to unlock 40% discounts on all main venue ticket orders.'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Jenkins',
      major: 'Computer Science, Sophomore',
      initials: 'SJ',
      gradient: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
      quote: 'Evenza has completely transformed campus nightlife. The visuals and atmosphere at Ignite Fest were absolute top tier!'
    },
    {
      name: 'Alex Rivera',
      major: 'Music Production, Senior',
      initials: 'AR',
      gradient: 'linear-gradient(135deg, #b92b27 0%, #1565c0 100%)',
      quote: 'As a music major, I appreciate the audio engineering quality Evenza brings. Their stages feel like massive professional concert halls.'
    },
    {
      name: 'David Chen',
      major: 'Event Management, Junior',
      initials: 'DC',
      gradient: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)',
      quote: 'Volunteer coordination and backstage management were exceptionally professional. Evenza gives student crew great industry experience.'
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

  // Live Countdown Timer logic
  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 18) // Set event 18 days from current local time
    
    const countdown = setInterval(() => {
      const now = new Date().getTime()
      const diff = targetDate.getTime() - now

      if (diff <= 0) {
        clearInterval(countdown)
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        setTimeLeft({ days, hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(countdown)
  }, [])

  const handleDotClick = (index) => {
    setActiveSlide(index)
    setIsAutoPlaying(false)
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setContactForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setContactForm({ name: '', email: '', subject: '', message: '' })
      setFormSubmitted(false)
    }, 3000)
  }

  return (
    <div className="app-container">
      {/* Background glowing effects */}
      <div className="glow-orb glow-top-left"></div>
      <div className="glow-orb glow-bottom-right"></div>
      <div className="glow-orb glow-middle-left"></div>

      {/* 1. Navigation Header */}
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

      {/* Main Content Sections */}
      <main className="main-content">
        
        {/* 2. Hero Section Carousel */}
        <section className="hero-carousel">
          <div className="hero-carousel-inner">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`hero-slide ${index === activeSlide ? 'active' : ''} ${slide.colorTheme}`}
              >
                <div className="hero-bg-wrapper">
                  <img src={heroConcert} alt="Concert Atmosphere" className="hero-bg-img" />
                  <div className="hero-overlay"></div>
                </div>

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

        {/* 3. Event Statistics Section */}
        <section className="stats-section">
          <div className="stats-grid">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card">
                <div className="stat-icon-wrapper">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Upcoming Events Section */}
        <section className="upcoming-section">
          <div className="section-header">
            <h2 className="section-title">Upcoming Events</h2>
            <p className="section-subtitle">Grab your passes before sales close</p>
          </div>

          <div className="upcoming-grid">
            {upcomingEvents.map((evt, idx) => (
              <div key={idx} className="upcoming-card">
                <div className="upcoming-image-wrapper">
                  <img src={evt.image} alt={evt.title} className="upcoming-img" />
                  <div className="upcoming-badge">{evt.date}</div>
                  <div className="upcoming-price">{evt.price}</div>
                </div>
                <div className="upcoming-info">
                  <span className="upcoming-tag">{evt.tag}</span>
                  <h3 className="upcoming-title">{evt.title}</h3>
                  <div className="upcoming-venue-group">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{evt.venue}</span>
                  </div>
                  <button className="btn-buy-ticket">BUY TICKET</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Event Categories Section */}
        <section className="categories-section">
          <div className="section-header">
            <h2 className="section-title">Event Categories</h2>
            <p className="section-subtitle">Discover live musical events tailored to your vibe</p>
          </div>

          <div className="categories-grid">
            <div className="category-card text-list-card">
              <h3 className="card-header-title">Music Festivals</h3>
              <ul className="category-list">
                {['Rock', 'Pop', 'Electronic', 'Hip Hop'].map((genre) => (
                  <li key={genre} className="list-item">
                    <span className="item-name">{genre}</span>
                    <button className="item-arrow-btn" aria-label={`Explore ${genre} festivals`}>
                      <svg className="chevron-right" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

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

        {/* 6. Featured Events Section */}
        <section className="featured-section">
          <div className="section-header">
            <h2 className="section-title">Featured Spotlight</h2>
            <p className="section-subtitle">Hand-picked experiences you can't afford to miss</p>
          </div>

          <div className="featured-layout">
            {/* Countdown Main Spotlight Card */}
            <div className="spotlight-card">
              <div className="spotlight-bg-overlay">
                <img src={heroConcert} alt="Spotlight Arena" className="spotlight-bg" />
                <div className="spotlight-tint"></div>
              </div>
              <div className="spotlight-content">
                <div className="spotlight-header">
                  <span className="spotlight-tag">BIGGEST SHOW OF THE YEAR</span>
                  <div className="live-pill">
                    <span className="pulse-dot"></span>
                    <span>TICKETS OPEN</span>
                  </div>
                </div>
                <h3 className="spotlight-title">EVENZA GRAND FESTIVAL 2026</h3>
                <p className="spotlight-desc">Our flagship multi-stage musical gathering featuring 40+ national artists, neon laser shows, and interactive student lounges.</p>
                
                {/* Live React Countdown Timer */}
                <div className="countdown-timer">
                  <div className="countdown-unit">
                    <span className="countdown-val">{String(timeLeft.days).padStart(2, '0')}</span>
                    <span className="countdown-lbl">Days</span>
                  </div>
                  <div className="countdown-sep">:</div>
                  <div className="countdown-unit">
                    <span className="countdown-val">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="countdown-lbl">Hours</span>
                  </div>
                  <div className="countdown-sep">:</div>
                  <div className="countdown-unit">
                    <span className="countdown-val">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="countdown-lbl">Minutes</span>
                  </div>
                  <div className="countdown-sep">:</div>
                  <div className="countdown-unit">
                    <span className="countdown-val">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className="countdown-lbl">Seconds</span>
                  </div>
                </div>

                <button className="btn-spotlight-action">RESERVE VIP PASS</button>
              </div>
            </div>

            {/* Split minor featured list */}
            <div className="featured-sidebar">
              <div className="side-featured-card">
                <div className="side-card-bg-wrap">
                  <img src={eventParty} alt="Electronic night" className="side-card-bg" />
                  <div className="side-card-tint"></div>
                </div>
                <div className="side-card-content">
                  <span className="side-tag">RUSH TICKETS</span>
                  <h4>DJ Battle: Neon Madness</h4>
                  <p>Oct 04 • VIP Lounge</p>
                  <button className="side-card-btn">CLAIM 15% OFF</button>
                </div>
              </div>

              <div className="side-featured-card">
                <div className="side-card-bg-wrap">
                  <img src={eventGirl} alt="Acoustic live" className="side-card-bg" />
                  <div className="side-card-tint"></div>
                </div>
                <div className="side-card-content">
                  <span className="side-tag">LIMITED PASSES</span>
                  <h4>Indie Jam: Garden Session</h4>
                  <p>Nov 22 • Campus Green</p>
                  <button className="side-card-btn">CLAIM PASS</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Announcements Section */}
        <section className="announcements-section">
          <div className="section-header">
            <h2 className="section-title">Latest Announcements</h2>
            <p className="section-subtitle">Important updates and notification feeds</p>
          </div>

          <div className="announcements-layout">
            <div className="announcements-sidebar-list">
              {announcements.map((ann, i) => (
                <button
                  key={i}
                  className={`announcement-tab-btn ${activeAnnouncement === i ? 'active' : ''}`}
                  onClick={() => setActiveAnnouncement(i)}
                >
                  <div className="ann-tab-meta">
                    <span className="ann-tab-dot"></span>
                    <span className="ann-tab-date">{ann.date}</span>
                  </div>
                  <h4 className="ann-tab-title">{ann.title}</h4>
                </button>
              ))}
            </div>

            <div className="announcement-content-panel">
              <div className="ann-content-wrapper">
                <div className="ann-content-header">
                  <span className="ann-status-badge">NEWS FEED</span>
                  <span className="ann-panel-date">{announcements[activeAnnouncement].date}</span>
                </div>
                <h3 className="ann-panel-title">{announcements[activeAnnouncement].title}</h3>
                <p className="ann-panel-body">{announcements[activeAnnouncement].content}</p>
                <div className="ann-panel-footer">
                  <button className="ann-learn-more-btn">
                    <span>Read Details</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Student Testimonials Section */}
        <section className="testimonials-section">
          <div className="section-header">
            <h2 className="section-title">Student Testimonials</h2>
            <p className="section-subtitle">Here is what the campus community is saying</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((test, index) => (
              <div key={index} className="testimonial-card">
                <div className="quote-icon">“</div>
                <p className="testimonial-quote">{test.quote}</p>
                
                <div className="student-profile">
                  <div className="avatar-placeholder" style={{ background: test.gradient }}>
                    <span>{test.initials}</span>
                  </div>
                  <div className="student-info">
                    <h4 className="student-name">{test.name}</h4>
                    <p className="student-major">{test.major}</p>
                  </div>
                </div>

                <div className="rating-stars">
                  {Array(5).fill(0).map((_, idx) => (
                    <span key={idx} className="star-icon">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 9. Contact Section */}
        <section className="contact-section">
          <div className="section-header">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">Reach out to the Evenza team for inquiries and support</p>
          </div>

          <div className="contact-container">
            {/* Form */}
            <div className="contact-form-panel">
              {formSubmitted ? (
                <div className="form-success-alert">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00d2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <h3>Message Sent!</h3>
                  <p>Thank you for contacting Evenza. We will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={contactForm.name}
                        onChange={handleFormChange}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleFormChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleFormChange}
                      placeholder="Ticket Question / Venue Details"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={contactForm.message}
                      onChange={handleFormChange}
                      placeholder="Write your query here..."
                      rows="5"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn-submit-form">SEND MESSAGE</button>
                </form>
              )}
            </div>

            {/* Info Cards */}
            <div className="contact-info-panel">
              <div className="info-item">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="info-text">
                  <h4>Address Location</h4>
                  <p>University Campus Hall, Room 402, SF, CA</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div className="info-text">
                  <h4>Email Support</h4>
                  <p>support@evenza.edu</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div className="info-text">
                  <h4>Follow Instagram</h4>
                  <p>@EvenzaFestival</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 10. Footer Section */}
      <footer className="footer">
        <p>© 2026 Evenza. All rights reserved. Premium Event Portal Experience.</p>
      </footer>
    </div>
  )
}

export default App
