import { useState, useEffect } from 'react'
import heroConcert from './assets/hero_concert.png'
import eventParty from './assets/event_party.png'
import eventGuy from './assets/event_guy.png'
import eventGirl from './assets/event_girl.png'
import eventSymphony from './assets/event_symphony.png'
import eventVibe from './assets/event_vibe.png'
import eventAcoustic from './assets/event_acoustic.png'
import './App.css'

// Centralized Event Data (Source of Truth)
const ALL_EVENTS = [
  {
    id: 'grand-fest',
    title: 'Evenza Grand Festival 2026',
    description: 'Our flagship multi-stage musical gathering featuring 40+ national artists, neon laser shows, and interactive student lounges. Experience three days of non-stop beats and immersive installations.',
    image: heroConcert,
    date: 'OCT 20-22',
    time: '4:00 PM - 2:00 AM',
    price: '$120',
    priceVal: 120,
    dateVal: '2026-10-20',
    venue: 'Campus Grand Arena',
    tag: 'Music Festival',
    category: 'Cultural',
    lineup: ['Deadmau5', 'Odesza', 'Illenium', 'Zedd', 'Martin Garrix'],
    slotsLeft: 42,
    spotlight: true
  },
  {
    id: 'elec-symphony',
    title: 'Electric Symphony',
    description: 'A spectacular fusion of classical orchestration and modern electronic beats, featuring a live chamber orchestra synchronized with synthesizer leads and holographic visuals.',
    image: eventSymphony,
    date: 'OCT 12',
    time: '7:30 PM - 10:30 PM',
    price: '$45',
    priceVal: 45,
    dateVal: '2026-10-12',
    venue: 'Main Concert Hall',
    tag: 'Classical Remix',
    category: 'Cultural',
    lineup: ['Max Richter', 'Lindsey Stirling', 'Clean Bandit'],
    slotsLeft: 15
  },
  {
    id: 'vibe-theory',
    title: 'Vibe Theory',
    description: 'The ultimate underground hip-hop showcase. Featuring freestyle battles, local beatmakers, and headline sets by rising campus and national indie rap artists.',
    image: eventVibe,
    date: 'OCT 29',
    time: '9:00 PM - 1:00 AM',
    price: '$35',
    priceVal: 35,
    dateVal: '2026-10-29',
    venue: 'Underground Stage',
    tag: 'Hip Hop',
    category: 'Cultural',
    lineup: ['Kendrick Lamar (Tribute)', 'DJ Shadow', 'Metro Boomin (DJ Set)'],
    slotsLeft: 8
  },
  {
    id: 'mid-acoustic',
    title: 'Midnight Acoustic',
    description: 'Warm, intimate acoustic performances from rising indie singer-songwriters. Enjoy local coffee and unplugged sessions under ambient fairy lights.',
    image: eventAcoustic,
    date: 'NOV 15',
    time: '8:00 PM - 11:00 PM',
    price: '$25',
    priceVal: 25,
    dateVal: '2026-11-15',
    venue: 'Studio Lounge',
    tag: 'Indie Unplugged',
    category: 'Cultural',
    lineup: ['Phoebe Bridgers (Tribute)', 'Bon Iver (Acoustic Set)', 'Boygenius'],
    slotsLeft: 24
  },
  {
    id: 'summer-echoes',
    title: 'Summer Echoes',
    description: 'A breezy sunset pop music festival on the beach. Feel the summer vibes with top indie-pop acts, local food trucks, and live DJ sets during sunset.',
    image: eventParty,
    date: 'AUG 15',
    time: '3:00 PM - 10:00 PM',
    price: '$30',
    priceVal: 30,
    dateVal: '2026-08-15',
    venue: 'San Francisco Beach Park',
    tag: 'Pop Vibes',
    category: 'Cultural',
    lineup: ['Lorde', 'Dua Lipa (Tribute)', 'LANY'],
    slotsLeft: 50
  },
  {
    id: 'thunder-arena',
    title: 'Thunder Arena',
    description: 'Heavy guitar riffs and headbanging drums under the night sky. Experience an energetic atmosphere with the best modern rock and alternative metal bands.',
    image: eventGuy,
    date: 'SEP 02',
    time: '6:30 PM - 11:30 PM',
    price: '$50',
    priceVal: 50,
    dateVal: '2026-09-02',
    venue: 'Austin Texas Pavilion',
    tag: 'Rock Nights',
    category: 'Cultural',
    lineup: ['Foo Fighters (Tribute)', 'Greta Van Fleet', 'Royal Blood'],
    slotsLeft: 31
  },
  {
    id: 'techno-horizon',
    title: 'Techno Horizon',
    description: 'A driving dark techno event that runs until the early morning hours. Featuring immersive industrial laser projections and heavy sub-bass soundsystems.',
    image: eventGirl,
    date: 'SEP 28',
    time: '10:00 PM - 4:00 AM',
    price: '$40',
    priceVal: 40,
    dateVal: '2026-09-28',
    venue: 'Brooklyn Warehouse 9',
    tag: 'Clubbing',
    category: 'Cultural',
    lineup: ['Charlotte de Witte', 'Amelie Lens', 'Boris Brejcha'],
    slotsLeft: 19
  },
  {
    id: 'neon-madness',
    title: 'DJ Battle: Neon Madness',
    description: 'Eight campus DJs go head-to-head in a multi-round turntablism battle. The crowd decides the champion through live decibel metering and cheering.',
    image: eventParty,
    date: 'OCT 04',
    time: '8:00 PM - Midnight',
    price: '$20',
    priceVal: 20,
    dateVal: '2026-10-04',
    venue: 'VIP Lounge',
    tag: 'Electronic',
    category: 'Cultural',
    lineup: ['DJ Spin', 'Neon Phantom', 'Vibe Master'],
    slotsLeft: 12
  },
  {
    id: 'garden-session',
    title: 'Indie Jam: Garden Session',
    description: 'An afternoon of picnic blankets, food trucks, and acoustic melodies on the central campus lawn. Cozy atmosphere, free soft drinks for student ID holders.',
    image: eventGirl,
    date: 'NOV 22',
    time: '1:00 PM - 5:00 PM',
    price: '$15',
    priceVal: 15,
    dateVal: '2026-11-22',
    venue: 'Campus Green',
    tag: 'Indie Unplugged',
    category: 'Cultural',
    lineup: ['Clairo', 'Rex Orange County', 'Mac DeMarco (Tribute)'],
    slotsLeft: 60
  },
  {
    id: 'hackathon-2026',
    title: 'Hackathon 2026',
    description: 'A 36-hour sprint where students build innovative software and hardware solutions. Free food, mentoring, sponsor booths, and prizes up to $5000.',
    image: '/events/hackathon-2026.png',
    date: 'OCT 08-10',
    time: '9:00 AM - 9:00 PM',
    price: 'Free',
    priceVal: 0,
    dateVal: '2026-10-08',
    venue: 'Innovation Lab',
    tag: 'Technical Event',
    category: 'Technical',
    lineup: ['Google Mentors', 'AWS Engineers', 'University Tech Faculty'],
    slotsLeft: 150
  },
  {
    id: 'coding-contest',
    title: 'Coding Contest',
    description: 'Show off your algorithmic problem-solving skills in a competitive programming contest. High-speed challenges, food, and cash prizes for top coders.',
    image: '/events/coding-contest.png',
    date: 'OCT 15',
    time: '2:00 PM - 6:00 PM',
    price: 'Free',
    priceVal: 0,
    dateVal: '2026-10-15',
    venue: 'Computing Center',
    tag: 'Technical Event',
    category: 'Technical',
    lineup: ['ACM Chapter Leads', 'IEEE Committee Experts'],
    slotsLeft: 75
  },
  {
    id: 'cricket-cup',
    title: 'Cricket Tournament: Evenza Cup',
    description: 'The annual inter-department cricket tournament. Cheer for your division and experience high-stakes matches under the floodlights.',
    image: '/events/cricket-tournament.png',
    date: 'SEP 10-18',
    time: '5:00 PM - 9:30 PM',
    price: 'Free',
    priceVal: 0,
    dateVal: '2026-09-10',
    venue: 'Campus Sports Field',
    tag: 'Sports Event',
    category: 'Sports',
    lineup: ['Campus All-Stars', 'Faculty Team Guest Stars'],
    slotsLeft: 300
  },
  {
    id: 'football-champ',
    title: 'Football Championship',
    description: 'Intense 11v11 soccer tournament. 16 student teams battle it out to raise the Evenza Athletics Trophy. High energy and live campus radio broadcast.',
    image: '/events/football-championship.png',
    date: 'SEP 22-26',
    time: '4:00 PM - 8:00 PM',
    price: 'Free',
    priceVal: 0,
    dateVal: '2026-09-22',
    venue: 'Main Stadium',
    tag: 'Sports Event',
    category: 'Sports',
    lineup: ['Varsity Tigers', 'Undergrad FC', 'Alumni Athletic Club'],
    slotsLeft: 200
  },
  {
    id: 'career-guidance',
    title: 'Career Guidance Seminar',
    description: 'Meet alumni and industry experts from top tech, finance, and creative companies to learn how to launch your dream career and network with recruiters.',
    image: '/events/career-guidance-seminar.png',
    date: 'OCT 02',
    time: '10:00 AM - 1:00 PM',
    price: 'Free',
    priceVal: 0,
    dateVal: '2026-10-02',
    venue: 'Seminar Hall 2',
    tag: 'Workshops & Seminars',
    category: 'Workshops',
    lineup: ['Alumni panel', 'Career Center Advisors', 'HR Recruiter Guests'],
    slotsLeft: 120
  },
  {
    id: 'cybersecurity-ws',
    title: 'Cybersecurity Workshop',
    description: 'Hands-on learning in ethical hacking, network security analysis, and secure code practices. Perfect for beginners and security enthusiasts.',
    image: '/events/cybersecurity-workshop.png',
    date: 'NOV 12',
    time: '1:00 PM - 5:00 PM',
    price: 'Free',
    priceVal: 0,
    dateVal: '2026-11-12',
    venue: 'Lab 304',
    tag: 'Workshops & Seminars',
    category: 'Workshops',
    lineup: ['Certified Ethic Hacker Instructors', 'Network Sec Professionals'],
    slotsLeft: 45
  },
  {
    id: 'debate-comp',
    title: 'Debate Competition: Speak Up',
    description: 'A parliamentary-style debate tournament addressing contemporary social, political, and technical issues. Let your voice and arguments be heard.',
    image: '/events/debate-competition.png',
    date: 'OCT 22',
    time: '9:30 AM - 3:30 PM',
    price: 'Free',
    priceVal: 0,
    dateVal: '2026-10-22',
    venue: 'Moot Court Room',
    tag: 'Literary Event',
    category: 'Literary',
    lineup: ['Debating Society Judges', 'Guest Toastmasters'],
    slotsLeft: 50
  },
  {
    id: 'photo-club',
    title: 'Photography Club: Lens Magic',
    description: 'An exhibition of campus snapshots and nature photography captured by student club members. Participate in the mini-photo walk and win gear vouchers!',
    image: '/events/photography-club-event.png',
    date: 'OCT 05',
    time: '11:00 AM - 4:00 PM',
    price: 'Free',
    priceVal: 0,
    dateVal: '2026-10-05',
    venue: 'Creative Lounge',
    tag: 'Club Activity',
    category: 'Club Activities',
    lineup: ['Photography Club Jury', 'Local Studio Guest Speakers'],
    slotsLeft: 90
  }
]

const CATEGORY_GROUPS = [
  {
    title: 'Technical Events',
    icon: '💻',
    list: [
      'Hackathon 2026',
      'Coding Contest',
      'Web Development Workshop',
      'AI & Machine Learning Seminar',
      'Robotics Competition',
      'Project Expo'
    ]
  },
  {
    title: 'Cultural Events',
    icon: '🎭',
    list: [
      'Dance Competition',
      'Singing Contest',
      'Drama & Skit',
      'Fashion Show',
      'Music Night',
      'Talent Hunt'
    ]
  },
  {
    title: 'Sports Events',
    icon: '🏆',
    list: [
      'Cricket Tournament',
      'Football Championship',
      'Volleyball Competition',
      'Athletics Meet',
      'Chess Tournament',
      'Badminton Championship'
    ]
  },
  {
    title: 'Workshops & Seminars',
    icon: '🎓',
    list: [
      'Career Guidance Seminar',
      'Resume Building Workshop',
      'Entrepreneurship Workshop',
      'Digital Marketing Session',
      'Cybersecurity Workshop',
      'Placement Training'
    ]
  },
  {
    title: 'Literary Events',
    icon: '📚',
    list: [
      'Debate Competition',
      'Essay Writing',
      'Quiz Contest',
      'Poetry Competition',
      'Elocution',
      'Story Writing'
    ]
  },
  {
    title: 'Club Activities',
    icon: '🌱',
    list: [
      'Photography Club Event',
      'Coding Club Meetup',
      'NSS Activities',
      'Eco Club Campaign',
      'Innovation Club Event'
    ]
  }
]

// Helper function to return or generate details for any clicked topic
const getEventDetails = (title) => {
  const existing = ALL_EVENTS.find(
    (e) => e.title.toLowerCase() === title.toLowerCase() || e.id === title.toLowerCase()
  )
  if (existing) return existing

  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  
  let category = 'Cultural'
  let tag = 'Campus Activity'
  let desc = `Experience the excitement at our campus ${title}. Join other students in this interactive event designed to showcase skills and build connections.`
  let venue = 'Campus Center Hall'
  let lineup = ['Student Coordinators', 'Faculty Advisors']
  let price = 'Free'
  let priceVal = 0
  let date = 'OCT 24'
  let time = '10:00 AM - 4:00 PM'
  let slotsLeft = Math.floor(10 + Math.random() * 40)
  let image = eventParty

  // Technical category check
  if (
    title.includes('Hackathon') || 
    title.includes('Coding') || 
    title.includes('Web Development') || 
    title.includes('AI') || 
    title.includes('Machine Learning') || 
    title.includes('Robotics') || 
    title.includes('Project Expo')
  ) {
    category = 'Technical'
    tag = 'Technical Event'
    venue = 'Lab Annex 2 / Innovation Center'
    image = eventGuy
    lineup = ['Industry Tech Mentors', 'Coding Club Leads', 'Sponsor Panelists']
    if (title.includes('Hackathon')) {
      desc = 'A high-energy collaborative coding sprint. Form teams, brainstorm solutions, receive professional mentorship, and present your working prototype to win grand prizes.'
      time = '36 Hours (Weekend)'
      date = 'OCT 08-10'
    } else if (title.includes('Coding Contest')) {
      desc = 'A competitive programming test. Solve complex algorithmic challenges under time constraints. Compete for the top spot on the live campus leaderboard.'
      date = 'OCT 15'
    } else if (title.includes('Web Development')) {
      desc = 'Hands-on workshop covering modern web stacks (React, Vite, CSS). Learn component structures, styling guidelines, and deploy a working app in a single session.'
      date = 'OCT 18'
    } else if (title.includes('AI') || title.includes('Seminar') || title.includes('Machine Learning')) {
      desc = 'A seminar discussing the future of Artificial Intelligence and Machine Learning. Covers neural networks, generative intelligence models, and campus research projects.'
      date = 'OCT 25'
    } else if (title.includes('Robotics')) {
      desc = 'Witness bots competing in maze-solving, line-following, and battle arena challenges. Ideal for students interested in mechanical design and embedded controls.'
      date = 'NOV 08'
    } else if (title.includes('Project Expo')) {
      desc = 'Exhibition showcasing outstanding student engineering, design, and software projects. Open to recruiters, faculty advisors, and peer evaluators.'
      date = 'NOV 12'
    }
  } 
  // Cultural category check
  else if (
    title.includes('Dance') || 
    title.includes('Singing') || 
    title.includes('Drama') || 
    title.includes('Skit') || 
    title.includes('Fashion') || 
    title.includes('Music Night') || 
    title.includes('Talent Hunt') ||
    title.includes('Contest')
  ) {
    category = 'Cultural'
    tag = 'Cultural Event'
    venue = 'Main Auditorium'
    image = eventGirl
    lineup = ['Special Guest Judges', 'Cultural Club Officers', 'Campus Performers']
    price = '$10'
    priceVal = 10
    if (title.includes('Dance')) {
      desc = 'The annual campus dance showcase. Enjoy solo, duet, and group routines spanning hip hop, classical, contemporary, and fusion styles.'
      date = 'NOV 05'
    } else if (title.includes('Singing')) {
      desc = 'Singing contest showcasing the best vocal talent on campus. Auditions are open to all majors; come perform your favorite acoustic or pop covers.'
      date = 'NOV 07'
    } else if (title.includes('Drama') || title.includes('Skit')) {
      desc = 'An afternoon of theater, creative skits, and monologues. Watch student actors perform original stories and classical adaptations.'
      date = 'NOV 14'
    } else if (title.includes('Fashion')) {
      desc = 'A dynamic runway show celebrating student designers, styling aesthetics, and sustainable clothing concepts. A major highlight of the semester.'
      date = 'NOV 18'
    } else if (title.includes('Music Night')) {
      desc = 'A live concert evening featuring student bands, acoustic artists, and local garage musicians. Great vibes, food trucks, and ambient lights.'
      date = 'NOV 20'
    } else if (title.includes('Talent Hunt')) {
      desc = 'Whether you juggle, perform stand-up comedy, play an unusual instrument, or have magic tricks, show off your skills in the campus Talent Hunt!'
      date = 'NOV 25'
    }
  } 
  // Sports category check
  else if (
    title.includes('Cricket') || 
    title.includes('Football') || 
    title.includes('Volleyball') || 
    title.includes('Athletics') || 
    title.includes('Chess') || 
    title.includes('Badminton') ||
    title.includes('Tournament') ||
    title.includes('Championship') ||
    title.includes('Meet')
  ) {
    category = 'Sports'
    tag = 'Sports Event'
    venue = 'Campus Stadium / Sports Grounds'
    image = eventSymphony
    lineup = ['Athletic Director Panel', 'Referees Association', 'Team Captains']
    if (title.includes('Cricket')) {
      desc = 'Inter-department cricket tournament. Cheer for your team in high-octane 20-over matches under the stadium floodlights.'
      date = 'SEP 10-18'
    } else if (title.includes('Football')) {
      desc = 'The annual soccer championship. 16 departments compete in bracket-style matches to raise the college sports trophy.'
      date = 'SEP 22-26'
    } else if (title.includes('Volleyball')) {
      desc = 'Fast-paced volleyball matchups on the indoor campus courts. Team spirit, quick spikes, and intense rallies.'
      date = 'OCT 05'
    } else if (title.includes('Athletics')) {
      desc = 'Track and field competition including 100m, 400m sprints, relays, long jump, and shot put. Open to all students.'
      date = 'OCT 12'
    } else if (title.includes('Chess')) {
      desc = 'A mind-bending rapid chess tournament. Test your strategies, openings, and endgame tactics in timed rounds.'
      date = 'OCT 19'
      venue = 'Student Lounge Hall A'
    } else if (title.includes('Badminton')) {
      desc = 'Singles and doubles badminton matches. Knockout tournament structure for beginner and intermediate players.'
      date = 'OCT 26'
    }
  } 
  // Workshops category check
  else if (
    title.includes('Career') || 
    title.includes('Resume') || 
    title.includes('Entrepreneurship') || 
    title.includes('Digital Marketing') || 
    title.includes('Cybersecurity') || 
    title.includes('Placement') ||
    title.includes('Workshop') ||
    title.includes('Session') ||
    title.includes('Training')
  ) {
    category = 'Workshops'
    tag = 'Workshop & Seminar'
    venue = 'Auditorium Seminar Hall'
    image = eventAcoustic
    lineup = ['Industry Guest Speakers', 'Career Development Officers', 'Alumni Mentors']
    if (title.includes('Career')) {
      desc = 'Meet representatives and HR leads from outstanding firms to receive career advice, resume insights, and job application timelines.'
      date = 'OCT 02'
    } else if (title.includes('Resume')) {
      desc = 'Transform your resume with actionable critiques, phrasing templates, and formatting reviews from career counselors.'
      date = 'OCT 07'
    } else if (title.includes('Entrepreneurship')) {
      desc = 'A workshop on launching startups, writing business models, raising funding, and scaling products. Learn how student ideas become real-world businesses.'
      date = 'OCT 14'
    } else if (title.includes('Digital Marketing')) {
      desc = 'Learn SEO tactics, brand positioning strategies, social media campaigns, and digital analytics to grow any online project or brand.'
      date = 'OCT 21'
    } else if (title.includes('Cybersecurity')) {
      desc = 'An introduction to ethical hacking, defense parameters, and data protection. Participate in interactive cyber-defense lab work.'
      date = 'NOV 12'
    } else if (title.includes('Placement')) {
      desc = 'A comprehensive training session covering technical test prep, aptitude test mock questions, and behavioral interview strategies.'
      date = 'NOV 16'
    }
  } 
  // Literary category check
  else if (
    title.includes('Debate') || 
    title.includes('Essay') || 
    title.includes('Quiz') || 
    title.includes('Poetry') || 
    title.includes('Elocution') || 
    title.includes('Story') ||
    title.includes('Writing') ||
    title.includes('Competition')
  ) {
    category = 'Literary'
    tag = 'Literary Event'
    venue = 'Seminar Room B'
    image = eventVibe
    lineup = ['Literary Club Faculty', 'Guest Authors / Journalists']
    if (title.includes('Debate')) {
      desc = 'A parliamentary-style debate tournament addressing contemporary social, political, and technical issues. Argue your points and sway the judges.'
      date = 'OCT 22'
    } else if (title.includes('Essay')) {
      desc = 'Showcase your analytical and writing skills by writing essays on topical campus or global issues. Prizes for original perspectives.'
      date = 'OCT 28'
    } else if (title.includes('Quiz')) {
      desc = 'The campus-wide trivia night. Covers science, history, current events, and pop culture. Form teams of 3 to compete.'
      date = 'NOV 02'
    } else if (title.includes('Poetry')) {
      desc = 'A cozy open-mic event for sharing original poetry, spoken word compositions, and verses. Ambient cafe vibes.'
      date = 'NOV 09'
    } else if (title.includes('Elocution')) {
      desc = 'Speeches on contemporary topics. Judged on vocal presence, clarity of thought, rhetoric, and stage confidence.'
      date = 'NOV 15'
    } else if (title.includes('Story')) {
      desc = 'Creative writing session where participants write short stories based on prompts given on the spot. Winners published in campus journals.'
      date = 'NOV 23'
    }
  } 
  // Club Activities check
  else if (
    title.includes('Photography') || 
    title.includes('Coding Club') || 
    title.includes('NSS') || 
    title.includes('Eco') || 
    title.includes('Innovation') ||
    title.includes('Meetup') ||
    title.includes('Campaign')
  ) {
    category = 'Club Activities'
    tag = 'Club Event'
    venue = 'Student Activity Center'
    image = eventParty
    lineup = ['Club Officers', 'Faculty Advisors', 'Student Volunteers']
    if (title.includes('Photography')) {
      desc = 'Display of work from student photography club members. Features a workshop on editing, lens choice, and shutter techniques.'
      date = 'OCT 05'
    } else if (title.includes('Coding Club') || title.includes('Meetup')) {
      desc = 'Weekly meeting of coding enthusiasts. Learn new algorithms, collaborate on project builds, and participate in peer-to-peer programming workshops.'
      date = 'OCT 12'
    } else if (title.includes('NSS')) {
      desc = 'Social service drive coordinated by the National Service Scheme. Includes campus cleanups, donation collections, and awareness talks.'
      date = 'OCT 19'
    } else if (title.includes('Eco') || title.includes('Campaign')) {
      desc = 'Environmental campaign focusing on tree planting, reducing single-use plastic waste, and recycling practices around campus grounds.'
      date = 'OCT 26'
    } else if (title.includes('Innovation')) {
      desc = 'Interactive brainstorming meetup where students pitch project ideas to receive funding, hardware resources, and workspace keys.'
      date = 'NOV 02'
    }
  }

  return {
    id,
    title,
    description: desc,
    image: `/events/${id}.png`,
    date,
    time,
    price,
    priceVal,
    dateVal: `2026-10-24`,
    venue,
    tag,
    category,
    lineup,
    slotsLeft
  }
}

// Build complete list of events containing all 35 topics + special showcase/music events
const buildCompleteEventsList = () => {
  const list = [];
  
  // 1. Add all special music events from ALL_EVENTS that don't map directly to the 35 standard topics
  const specialMusicIds = [
    'grand-fest', 'elec-symphony', 'vibe-theory', 'mid-acoustic', 
    'summer-echoes', 'thunder-arena', 'techno-horizon', 'neon-madness', 'garden-session'
  ];
  
  specialMusicIds.forEach(id => {
    const found = ALL_EVENTS.find(e => e.id === id);
    if (found) list.push(found);
  });

  // 2. Add the 35 topics from CATEGORY_GROUPS
  CATEGORY_GROUPS.forEach(group => {
    group.list.forEach(topic => {
      // Check if already in the list
      const alreadyInList = list.some(
        e => e.title.toLowerCase() === topic.toLowerCase() || 
             e.id === topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      );
      if (!alreadyInList) {
        list.push(getEventDetails(topic));
      }
    });
  });

  return list;
};

const COMPLETE_EVENTS = buildCompleteEventsList();

function App() {
  const [activeTab, setActiveTab] = useState('Home')
  const [activeSlide, setActiveSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [activeAnnouncement, setActiveAnnouncement] = useState(0)
  const [timeLeft, setTimeLeft] = useState({ days: 18, hours: 12, minutes: 44, seconds: 59 })

  // User auth state
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  
  // Modals for Details and Registration
  const [selectedEventForDetails, setSelectedEventForDetails] = useState(null)
  const [selectedEventForBooking, setSelectedEventForBooking] = useState(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [bookingReceipt, setBookingReceipt] = useState(null)
  
  // Real-time API notification payloads visibility
  const [showEmailPayload, setShowEmailPayload] = useState(false)
  const [showWhatsAppPayload, setShowWhatsAppPayload] = useState(false)

  // Forms state
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '', agree: false })
  const [bookingForm, setBookingForm] = useState({ name: '', email: '', phone: '', ticketType: 'Student Pass', quantity: 1 })
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Events filtering states
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('date-asc')

  const navigationItems = ['Home', 'Events', 'About Us', 'Contact']

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
    targetDate.setDate(targetDate.getDate() + 18)
    
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

  // Auto fill booking form when loggedInUser changes
  useEffect(() => {
    if (loggedInUser) {
      setBookingForm((prev) => ({
        ...prev,
        name: loggedInUser.name,
        email: loggedInUser.email
      }))
    } else {
      setBookingForm((prev) => ({
        ...prev,
        name: '',
        email: ''
      }))
    }
  }, [loggedInUser])

  // Google OAuth Cross-Window postMessage Listener
  useEffect(() => {
    const handleGoogleMessage = (event) => {
      if (event.data && event.data.type === 'GOOGLE_AUTH_SUCCESS') {
        setLoggedInUser({
          name: event.data.name,
          email: event.data.email,
          provider: 'Google'
        })
        setIsLoginOpen(false)
        setIsRegisterOpen(false)
      }
    }
    window.addEventListener('message', handleGoogleMessage)
    return () => window.removeEventListener('message', handleGoogleMessage)
  }, [])

  // Google OAuth Popup Trigger
  const handleGoogleLogin = () => {
    const width = 500
    const height = 600
    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2
    
    const popup = window.open(
      '',
      'GoogleOAuth',
      `width=${width},height=${height},left=${left},top=${top},status=no,resizable=yes`
    )
    
    if (popup) {
      popup.document.write(`
        <html>
          <head>
            <title>Sign in - Google Accounts</title>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                background-color: #ffffff;
                color: #202124;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
                padding: 20px;
                box-sizing: border-box;
              }
              .logo {
                margin-bottom: 20px;
              }
              .container {
                text-align: center;
                max-width: 380px;
                width: 100%;
                border: 1px solid #dadce0;
                border-radius: 8px;
                padding: 40px 24px;
                box-sizing: border-box;
                box-shadow: 0 4px 15px rgba(0,0,0,0.05);
              }
              h1 {
                font-size: 22px;
                font-weight: 400;
                margin: 0 0 8px 0;
                color: #202124;
              }
              p {
                font-size: 15px;
                color: #5f6368;
                margin: 0 0 30px 0;
              }
              .account-box {
                display: flex;
                align-items: center;
                padding: 12px;
                border: 1px solid #dadce0;
                border-radius: 6px;
                cursor: pointer;
                transition: background-color 0.2s, border-color 0.2s;
                margin-bottom: 12px;
                text-align: left;
              }
              .account-box:hover {
                background-color: #f8f9fa;
                border-color: #1a73e8;
              }
              .avatar {
                width: 36px;
                height: 36px;
                background: #1a73e8;
                color: #ffffff;
                font-size: 16px;
                font-weight: bold;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 12px;
              }
              .info {
                flex-grow: 1;
              }
              .name {
                font-size: 14px;
                font-weight: 600;
                color: #3c4043;
              }
              .email {
                font-size: 12px;
                color: #5f6368;
              }
              .footer {
                margin-top: 30px;
                font-size: 12px;
                color: #757575;
                line-height: 1.4;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="logo">
                <svg width="40" height="40" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <h1>Choose an account</h1>
              <p>to continue to Evenza</p>
              
              <div class="account-box" onclick="select('Meena R', 'meena.r@university.edu')">
                <div class="avatar">MR</div>
                <div class="info">
                  <div class="name">Meena R</div>
                  <div class="email">meena.r@university.edu</div>
                </div>
              </div>
              
              <div class="account-box" onclick="select('John Doe', 'john.doe@gmail.com')">
                <div class="avatar" style="background:#34A853">JD</div>
                <div class="info">
                  <div class="name">John Doe</div>
                  <div class="email">john.doe@gmail.com</div>
                </div>
              </div>

              <div class="footer">
                To continue, Google will share your name, email address, and profile picture with Evenza.
              </div>
            </div>
            <script>
              function select(name, email) {
                window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS', name, email }, '*');
                window.close();
              }
            </script>
          </body>
        </html>
      `)
    }
  }

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

  // Navigation handlers
  const handleNavClick = (tab) => {
    if (tab === 'Contact') {
      if (activeTab === 'Home') {
        const contactSection = document.getElementById('contact')
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' })
        }
      } else {
        setActiveTab('Home')
        setTimeout(() => {
          const contactSection = document.getElementById('contact')
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' })
          }
        }, 150)
      }
    } else {
      setActiveTab(tab)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Explore Events (CTA handler)
  const handleExploreEvents = () => {
    setActiveTab('Events')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Open specific category and filter on Events page
  const handleCategoryExplore = (category) => {
    setSelectedCategory(category)
    setActiveTab('Events')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Auth form handlers
  const handleLoginSubmit = (e) => {
    e.preventDefault()
    if (!loginForm.email || !loginForm.password) return
    setLoggedInUser({
      name: loginForm.email.split('@')[0],
      email: loginForm.email
    })
    setIsLoginOpen(false)
    setLoginForm({ email: '', password: '' })
  }

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    if (!registerForm.email || !registerForm.password || registerForm.password !== registerForm.confirmPassword) return
    setLoggedInUser({
      name: registerForm.name || registerForm.email.split('@')[0],
      email: registerForm.email
    })
    setIsRegisterOpen(false)
    setRegisterForm({ name: '', email: '', password: '', confirmPassword: '', agree: false })
  }

  const handleLogout = () => {
    setLoggedInUser(null)
  }

  // Ticket booking handler
  const handleOpenBooking = (event) => {
    setSelectedEventForBooking(event)
    setIsBookingOpen(true)
    setBookingReceipt(null)
    setShowEmailPayload(false)
    setShowWhatsAppPayload(false)
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    const refNum = `EVZ-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 4).toUpperCase()}`
    
    // Calculate total price
    const ticketPrice = selectedEventForBooking.priceVal
    const total = ticketPrice * bookingForm.quantity

    const receipt = {
      reference: refNum,
      eventName: selectedEventForBooking.title,
      eventDate: selectedEventForBooking.date,
      eventVenue: selectedEventForBooking.venue,
      userName: bookingForm.name,
      userEmail: bookingForm.email,
      ticketType: bookingForm.ticketType,
      quantity: bookingForm.quantity,
      price: total
    }
    
    setBookingReceipt(receipt)
  }

  const handleCloseBooking = () => {
    setIsBookingOpen(false)
    setBookingReceipt(null)
    setSelectedEventForBooking(null)
  }

  // Filter and Sort Events
  const filteredEvents = COMPLETE_EVENTS.filter((evt) => {
    const matchesSearch = 
      (evt.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (evt.venue || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (evt.tag || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (evt.lineup || []).some((art) => (art || '').toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = 
      selectedCategory === 'All' || 
      (evt.category || '').toLowerCase() === selectedCategory.toLowerCase() ||
      (evt.tag || '').toLowerCase().includes(selectedCategory.toLowerCase())

    return matchesSearch && matchesCategory
  })

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return a.priceVal - b.priceVal
    } else if (sortBy === 'price-desc') {
      return b.priceVal - a.priceVal
    } else {
      return new Date(a.dateVal) - new Date(b.dateVal)
    }
  })

  return (
    <div className="app-container">
      {/* Background glowing effects */}
      <div className="glow-orb glow-top-left"></div>
      <div className="glow-orb glow-bottom-right"></div>
      <div className="glow-orb glow-middle-left"></div>

      {/* 1. Navigation Header */}
      <header className="navbar">
        <div className="navbar-container">
          <div className="logo-group" onClick={() => handleNavClick('Home')} style={{ cursor: 'pointer' }}>
            <img src="/evenza_logo_text.png" alt="Evenza Brand" className="navbar-logo-img" />
          </div>

          <nav className="nav-links">
            {navigationItems.map((item) => (
              <button
                key={item}
                className={`nav-link-btn ${activeTab === item || (item === 'Contact' && activeTab === 'Home' && window.scrollY > 3000) ? 'active' : ''}`}
                onClick={() => handleNavClick(item)}
              >
                {item}
                {activeTab === item && <span className="active-indicator"></span>}
              </button>
            ))}
          </nav>

          <div className="auth-group">
            {loggedInUser ? (
              <div className="user-profile-badge">
                <span className="user-name">Hi, {loggedInUser.name}</span>
                <button className="btn-logout" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <>
                <button className="btn-login-link" onClick={() => setIsLoginOpen(true)}>Login</button>
                <button className="btn-register-accent" onClick={() => setIsRegisterOpen(true)}>Register</button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="main-content">
        
        {/* VIEW 1: HOME PAGE */}
        {activeTab === 'Home' && (
          <>
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
                      
                      <button className="btn-get-tickets" onClick={handleExploreEvents}>
                        <span>EXPLORE EVENTS</span>
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

            {/* 5. Event Categories Section */}
            <section className="categories-section">
              <div className="section-header">
                <h2 className="section-title">Event Categories</h2>
                <p className="section-subtitle">Discover a wide range of campus activities and events</p>
              </div>

              <div className="new-categories-grid">
                {CATEGORY_GROUPS.map((group, idx) => (
                  <div key={idx} className="new-category-card">
                    <div className="new-category-header">
                      <span className="new-category-icon">{group.icon}</span>
                      <h3 className="new-category-title">{group.title}</h3>
                    </div>
                    <ul className="new-category-list">
                      {group.list.map((item, itemIdx) => (
                        <li 
                          key={itemIdx} 
                          className="new-category-item"
                          onClick={() => {
                            const eventObj = getEventDetails(item)
                            setSelectedEventForDetails(eventObj)
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          <span className="bullet-point">✦</span>
                          <span className="item-text">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
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
                <div 
                  className="spotlight-card" 
                  onClick={() => setSelectedEventForDetails(ALL_EVENTS[0])}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="spotlight-bg-overlay">
                    <img src={ALL_EVENTS[0].image} alt="Spotlight Arena" className="spotlight-bg" />
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
                    <h3 className="spotlight-title">{ALL_EVENTS[0].title}</h3>
                    <p className="spotlight-desc">{ALL_EVENTS[0].description}</p>
                    
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

                    <button 
                      className="btn-spotlight-action"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenBooking(ALL_EVENTS[0])
                      }}
                    >
                      REGISTER NOW
                    </button>
                  </div>
                </div>

                {/* Split minor featured list */}
                <div className="featured-sidebar">
                  {ALL_EVENTS.slice(7, 9).map((evt, idx) => (
                    <div 
                      key={idx} 
                      className="side-featured-card"
                      onClick={() => setSelectedEventForDetails(evt)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="side-card-bg-wrap">
                        <img src={evt.image} alt={evt.title} className="side-card-bg" />
                        <div className="side-card-tint"></div>
                      </div>
                      <div className="side-card-content">
                        <span className="side-tag">{idx === 0 ? 'RUSH TICKETS' : 'LIMITED PASSES'}</span>
                        <h4>{evt.title}</h4>
                        <p>{evt.date} • {evt.venue}</p>
                        <button 
                          className="side-card-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleOpenBooking(evt)
                          }}
                        >
                          CLAIM PASS
                        </button>
                      </div>
                    </div>
                  ))}
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
                      <button className="ann-learn-more-btn" onClick={handleExploreEvents}>
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
            <section id="contact" className="contact-section">
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
          </>
        )}

        {/* VIEW 2: EVENTS PAGE */}
        {activeTab === 'Events' && (
          <section className="events-hub-section">
            <div className="section-header">
              <h2 className="section-title">Upcoming Events</h2>
              <p className="section-subtitle">Find your next experience. Search and filter all upcoming events and sessions</p>
            </div>

            {/* Filter Bar */}
            <div className="events-filter-bar">
              <div className="search-box-wrap">
                <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input 
                  type="text" 
                  className="events-search-input" 
                  placeholder="Search events, artists, venues..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button className="search-clear-btn" onClick={() => setSearchTerm('')}>&times;</button>
                )}
              </div>

              <div className="sort-dropdown-wrap">
                <label htmlFor="sortBy">Sort By: </label>
                <select 
                  id="sortBy" 
                  className="events-sort-select" 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date-asc">Date (Earliest)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                </select>
              </div>
            </div>

            {/* Category Pills */}
            <div className="category-pills">
              {['All', 'Technical', 'Cultural', 'Sports', 'Workshops', 'Literary', 'Club Activities'].map((cat) => (
                <button
                  key={cat}
                  className={`category-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid */}
            {sortedEvents.length > 0 ? (
              <div className="upcoming-grid">
                {sortedEvents.map((evt, idx) => (
                  <div key={evt.id} className="upcoming-card" onClick={() => setSelectedEventForDetails(evt)} style={{ cursor: 'pointer' }}>
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
                      <button 
                        className="btn-buy-ticket"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenBooking(evt)
                        }}
                      >
                        REGISTER NOW
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="events-empty-state">
                <div className="empty-state-icon">🎸</div>
                <h3>No events match your criteria</h3>
                <p>Try clearing your search or selecting a different category filter.</p>
                <button className="btn-reset-filters" onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}>Reset Filters</button>
              </div>
            )}
          </section>
        )}

        {/* VIEW 3: ABOUT US PAGE */}
        {activeTab === 'About Us' && (
          <section className="about-us-section">
            <div className="section-header">
              <h2 className="section-title">Behind the Beats</h2>
              <p className="section-subtitle">Learn more about Evenza's mission, team, and passion</p>
            </div>

            <div className="about-content-grid">
              <div className="about-text-panel">
                <h3>About Evenza</h3>
                <p>Evenza is a centralized platform designed to simplify the organization and participation of college events. Our goal is to connect students, faculty members, and event organizers through a single digital platform.</p>
                <p>The system allows students to explore upcoming events, register online, receive notifications, and stay updated with the latest activities happening on campus. From technical symposiums and workshops to cultural festivals and sports competitions, the platform makes event management easier and more efficient.</p>
                <p>By providing a seamless experience for both organizers and participants, we aim to encourage student engagement, improve event coordination, and create memorable college experiences.</p>
                <div className="about-stats-mini">
                  <div className="mini-stat">
                    <h4>40+</h4>
                    <span>Organizers</span>
                  </div>
                  <div className="mini-stat">
                    <h4>150+</h4>
                    <span>Student Crew Trained</span>
                  </div>
                  <div className="mini-stat">
                    <h4>4+</h4>
                    <span>Venues Orchestrated</span>
                  </div>
                </div>
              </div>
              <div className="about-image-panel">
                <img src={eventParty} alt="About Us Crowd" className="about-media-img" />
              </div>
            </div>

            {/* Values */}
            <div className="about-values-section">
              <h3>Our Core Values</h3>
              <div className="about-values-grid">
                <div className="value-card">
                  <div className="value-icon">🤝</div>
                  <h4>Community First</h4>
                  <p>Creating safe, welcoming spaces where every student finds their musical tribe.</p>
                </div>
                <div className="value-card">
                  <div className="value-icon">🔊</div>
                  <h4>Premium Production</h4>
                  <p>Refusing to compromise on sound engineering, visual lasers, and set designs.</p>
                </div>
                <div className="value-card">
                  <div className="value-icon">⚡</div>
                  <h4>Empowering Students</h4>
                  <p>Providing direct experience running lighting consoles, speaker arrays, and artist bookings.</p>
                </div>
              </div>
            </div>

            {/* Team */}
            <div className="about-team-section">
              <h3>Lead Organizer Committee</h3>
              <div className="about-team-grid">
                {testimonials.map((organizer, idx) => (
                  <div key={idx} className="team-card">
                    <div className="team-avatar-wrapper" style={{ background: organizer.gradient }}>
                      <span>{organizer.initials}</span>
                    </div>
                    <h4>{organizer.name}</h4>
                    <p className="team-role">{idx === 0 ? 'Managing Director' : idx === 1 ? 'Technical Audio Lead' : 'Logistics Coordinator'}</p>
                    <p className="team-major">{organizer.major}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      {/* 10. Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="logo-group" onClick={() => handleNavClick('Home')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <img src="/evenza_logo_text.png" alt="Evenza Brand" className="footer-logo-img" />
            </div>
            <p>Experience the Future of Music.</p>
          </div>
          <div className="footer-socials">
            <a href="https://instagram.com/EvenzaFestival" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="https://twitter.com/EvenzaFestival" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Twitter / X">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
            <a href="https://facebook.com/EvenzaFestival" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="https://youtube.com/EvenzaFestival" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
          </div>
        </div>
        <p className="copyright">© 2026 Evenza. All rights reserved. Premium Event Portal Experience.</p>
      </footer>

      {/* ========================================= */}
      {/*              MODAL WINDOWS                */}
      {/* ========================================= */}

      {/* A. LOGIN MODAL */}
      {isLoginOpen && (
        <div className="modal-backdrop" onClick={() => setIsLoginOpen(false)}>
          <div className="modal-container modal-auth" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsLoginOpen(false)}>&times;</button>
            <div className="auth-header">
              <h3>Welcome Back</h3>
              <p>Sign in to claim your student passes</p>
            </div>
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  placeholder="student@university.edu" 
                  required
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                />
              </div>
              <button type="submit" className="btn-auth-submit">LOGIN</button>
            </form>
            <div className="auth-divider">
              <span>OR</span>
            </div>
            <button type="button" className="btn-google-auth" onClick={handleGoogleLogin}>
              <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
            </button>
            <p className="auth-switch-text">
              Don't have an account?{' '}
              <button 
                className="auth-switch-btn" 
                onClick={() => {
                  setIsLoginOpen(false)
                  setIsRegisterOpen(true)
                }}
              >
                Register here
              </button>
            </p>
          </div>
        </div>
      )}

      {/* B. REGISTER MODAL */}
      {isRegisterOpen && (
        <div className="modal-backdrop" onClick={() => setIsRegisterOpen(false)}>
          <div className="modal-container modal-auth" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsRegisterOpen(false)}>&times;</button>
            <div className="auth-header">
              <h3>Create Student Account</h3>
              <p>Register to unlock free and discounted passes</p>
            </div>
            <form onSubmit={handleRegisterSubmit} className="auth-form">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  placeholder="Jane Doe" 
                  required
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>University Email</label>
                <input 
                  type="email" 
                  placeholder="student@university.edu" 
                  required
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  required
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  required
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                />
              </div>
              <div className="form-checkbox-group">
                <input 
                  type="checkbox" 
                  id="agreeCheckbox" 
                  required
                  checked={registerForm.agree}
                  onChange={(e) => setRegisterForm({ ...registerForm, agree: e.target.checked })}
                />
                <label htmlFor="agreeCheckbox">I agree to the Terms of Service & Privacy Policy</label>
              </div>
              <button type="submit" className="btn-auth-submit">REGISTER ACCOUNT</button>
            </form>
            <div className="auth-divider">
              <span>OR</span>
            </div>
            <button type="button" className="btn-google-auth" onClick={handleGoogleLogin}>
              <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
            </button>
            <p className="auth-switch-text">
              Already have an account?{' '}
              <button 
                className="auth-switch-btn" 
                onClick={() => {
                  setIsRegisterOpen(false)
                  setIsLoginOpen(true)
                }}
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      )}

      {/* C. EVENT DETAILS MODAL */}
      {selectedEventForDetails && (
        <div className="modal-backdrop" onClick={() => setSelectedEventForDetails(null)}>
          <div className="modal-container modal-details" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedEventForDetails(null)}>&times;</button>
            <div className="details-banner">
              <img src={selectedEventForDetails.image} alt={selectedEventForDetails.title} />
              <div className="details-banner-overlay"></div>
              <span className="details-badge">{selectedEventForDetails.tag}</span>
            </div>
            
            <div className="details-body">
              <h2 className="details-title">{selectedEventForDetails.title}</h2>
              
              <div className="details-meta-row">
                <div className="meta-item">
                  <span className="meta-icon">📅</span>
                  <div className="meta-info">
                    <span className="meta-label">DATE & TIME</span>
                    <span className="meta-val">{selectedEventForDetails.date} • {selectedEventForDetails.time}</span>
                  </div>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">📍</span>
                  <div className="meta-info">
                    <span className="meta-label">VENUE</span>
                    <span className="meta-val">{selectedEventForDetails.venue}</span>
                  </div>
                </div>
                <div className="meta-item">
                  <span className="meta-icon">🎫</span>
                  <div className="meta-info">
                    <span className="meta-label">TICKET PRICE</span>
                    <span className="meta-val">{selectedEventForDetails.price}</span>
                  </div>
                </div>
              </div>

              <div className="details-content-split">
                <div className="details-description">
                  <h3>About the Event</h3>
                  <p>{selectedEventForDetails.description}</p>
                </div>

                <div className="details-lineup">
                  <h3>Artist Lineup</h3>
                  <ul className="artist-list-items">
                    {selectedEventForDetails.lineup.map((artist, idx) => (
                      <li key={idx} className="artist-item">
                        <span className="artist-bullet">🎸</span>
                        <span className="artist-name">{artist}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="details-footer">
                <div className="occupancy-info">
                  <span className="occupancy-indicator pulse"></span>
                  <span>Only <strong>{selectedEventForDetails.slotsLeft}</strong> passes remaining!</span>
                </div>
                <div className="details-actions">
                  <button className="btn-details-close" onClick={() => setSelectedEventForDetails(null)}>Back to Hub</button>
                  <button 
                    className="btn-details-register"
                    onClick={() => {
                      const evt = selectedEventForDetails
                      setSelectedEventForDetails(null)
                      handleOpenBooking(evt)
                    }}
                  >
                    REGISTER NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* D. REGISTRATION & RECEIPT MODAL */}
      {isBookingOpen && selectedEventForBooking && (
        <div className="modal-backdrop" onClick={handleCloseBooking}>
          <div className="modal-container modal-booking" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseBooking}>&times;</button>
            
            {!bookingReceipt ? (
              // STEP 1: Registration Form
              <>
                <div className="booking-header">
                  <h3>Secure Your Spot</h3>
                  <p>Registering for <strong>{selectedEventForBooking.title}</strong></p>
                </div>
                
                <form onSubmit={handleBookingSubmit} className="booking-form">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe" 
                      required
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input 
                      type="email" 
                      placeholder="jane.doe@university.edu" 
                      required
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="(555) 000-0000" 
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Pass Type</label>
                      <select 
                        className="booking-select"
                        value={bookingForm.ticketType}
                        onChange={(e) => setBookingForm({ ...bookingForm, ticketType: e.target.value })}
                      >
                        <option value="Student Pass">Student Pass (40% Off)</option>
                        <option value="General Admission">General Admission</option>
                        <option value="VIP Pass">VIP Pass (Front Row + Lounge)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Quantity</label>
                      <input 
                        type="number" 
                        min="1" 
                        max="5"
                        required
                        value={bookingForm.quantity}
                        onChange={(e) => setBookingForm({ ...bookingForm, quantity: parseInt(e.target.value) || 1 })}
                      />
                    </div>
                  </div>

                  <div className="booking-summary-box">
                    <div className="summary-line">
                      <span>Single Pass Price:</span>
                      <span>${selectedEventForBooking.priceVal}</span>
                    </div>
                    <div className="summary-line highlight">
                      <span>Total Price:</span>
                      <span>${selectedEventForBooking.priceVal * bookingForm.quantity}</span>
                    </div>
                  </div>

                  <button type="submit" className="btn-booking-submit">CONFIRM REGISTRATION</button>
                </form>
              </>
            ) : (
              // STEP 2: Concert Pass Receipt Screen
              <div className="receipt-container">
                <div className="receipt-success-badge">
                  <span className="success-icon">✓</span>
                  <h3>Ticket Booked Successfully!</h3>
                  <p>Your concert pass has been generated. Show the QR code at the venue entry.</p>
                </div>

                {/* Physical Ticket Mock */}
                <div className="concert-pass-card">
                  <div className="pass-stub pass-stub-left">
                    <span className="stub-vertical-text">EVENZA SHOWPASS</span>
                  </div>
                  <div className="pass-main">
                    <div className="pass-header-group">
                      <span className="pass-logo-text">Evenza</span>
                      <span className="pass-ref">{bookingReceipt.reference}</span>
                    </div>
                    <h4 className="pass-title">{bookingReceipt.eventName}</h4>
                    
                    <div className="pass-details-grid">
                      <div className="pass-detail">
                        <span className="lbl">HOLDER</span>
                        <span className="val">{bookingReceipt.userName}</span>
                      </div>
                      <div className="pass-detail">
                        <span className="lbl">PASS TYPE</span>
                        <span className="val">{bookingReceipt.ticketType}</span>
                      </div>
                      <div className="pass-detail">
                        <span className="lbl">DATE & VENUE</span>
                        <span className="val">{bookingReceipt.eventDate} • {bookingReceipt.eventVenue}</span>
                      </div>
                      <div className="pass-detail">
                        <span className="lbl">QUANTITY</span>
                        <span className="val">{bookingReceipt.quantity} pass(es)</span>
                      </div>
                    </div>

                    <div className="pass-qrcode-area">
                      {/* Stylized QR Code SVG */}
                      <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="ticket-qrcode">
                        <rect width="100" height="100" fill="white" rx="8" />
                        <rect x="10" y="10" width="25" height="25" fill="black" />
                        <rect x="15" y="15" width="15" height="15" fill="white" />
                        <rect x="18" y="18" width="9" height="9" fill="black" />

                        <rect x="65" y="10" width="25" height="25" fill="black" />
                        <rect x="70" y="15" width="15" height="15" fill="white" />
                        <rect x="73" y="18" width="9" height="9" fill="black" />

                        <rect x="10" y="65" width="25" height="25" fill="black" />
                        <rect x="15" y="70" width="15" height="15" fill="white" />
                        <rect x="18" y="73" width="9" height="9" fill="black" />
                        
                        <rect x="40" y="10" width="5" height="10" fill="black" />
                        <rect x="50" y="15" width="10" height="5" fill="black" />
                        <rect x="45" y="25" width="5" height="15" fill="black" />
                        <rect x="10" y="40" width="10" height="5" fill="black" />
                        <rect x="25" y="45" width="5" height="10" fill="black" />
                        <rect x="35" y="40" width="15" height="5" fill="black" />
                        <rect x="40" y="50" width="10" height="10" fill="black" />
                        
                        <rect x="65" y="40" width="5" height="10" fill="black" />
                        <rect x="75" y="45" width="10" height="5" fill="black" />
                        <rect x="85" y="40" width="5" height="15" fill="black" />
                        
                        <rect x="65" y="65" width="10" height="5" fill="black" />
                        <rect x="80" y="70" width="5" height="10" fill="black" />
                        <rect x="75" y="80" width="15" height="5" fill="black" />
                        <rect x="45" y="65" width="5" height="15" fill="black" />
                        <rect x="55" y="75" width="10" height="5" fill="black" />
                        <rect x="40" y="85" width="15" height="5" fill="black" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Real-time API Dispatch Service Status Panel */}
                <div className="receipt-api-status">
                  <h4 className="api-panel-title">📡 Real-Time Dispatch Services</h4>
                  
                  <div className="api-service-row">
                    <div className="api-service-info">
                      <span className="api-service-icon">📧</span>
                      <div className="api-service-text">
                        <span className="api-service-name">Email Service API</span>
                        <span className="api-service-desc">SendGrid SMTP Dispatcher</span>
                      </div>
                    </div>
                    <div className="api-status-badge success">
                      <span className="status-dot animate"></span>
                      <span>200 OK</span>
                    </div>
                  </div>
                  
                  <div className="api-service-row">
                    <div className="api-service-info">
                      <span className="api-service-icon">💬</span>
                      <div className="api-service-text">
                        <span className="api-service-name">WhatsApp Cloud API</span>
                        <span className="api-service-desc">Meta Graph REST Message Gateway</span>
                      </div>
                    </div>
                    <div className="api-status-badge success">
                      <span className="status-dot animate"></span>
                      <span>200 OK</span>
                    </div>
                  </div>
                  
                  <div className="api-payload-actions">
                    <button className="btn-payload-toggle" onClick={() => setShowEmailPayload(!showEmailPayload)}>
                      {showEmailPayload ? 'Hide Email Payload' : 'View Email API Payload'}
                    </button>
                    <button className="btn-payload-toggle" onClick={() => setShowWhatsAppPayload(!showWhatsAppPayload)}>
                      {showWhatsAppPayload ? 'Hide WhatsApp Payload' : 'View WhatsApp API Payload'}
                    </button>
                  </div>
                  
                  {showEmailPayload && (
                    <pre className="api-payload-code">
{JSON.stringify({
  url: "https://api.sendgrid.com/v3/mail/send",
  headers: {
    "Authorization": "Bearer SG.xxxxx_evenza_auth_key",
    "Content-Type": "application/json"
  },
  body: {
    personalizations: [{
      to: [{ email: bookingReceipt.userEmail }],
      subject: `Your Evenza Ticket: ${bookingReceipt.eventName}`
    }],
    from: { email: "tickets@evenza.edu", name: "Evenza Portal" },
    content: [{
      type: "text/html",
      value: `<h3>Booking Confirmed!</h3><p>Hi ${bookingReceipt.userName}, your spot for ${bookingReceipt.eventName} is secured. Ticket reference: <b>${bookingReceipt.reference}</b></p>`
    }]
  }
}, null, 2)}
                    </pre>
                  )}
                  
                  {showWhatsAppPayload && (
                    <pre className="api-payload-code">
{JSON.stringify({
  url: "https://graph.facebook.com/v17.0/1094820252819/messages",
  headers: {
    "Authorization": "Bearer EAAGxxxxxx_evenza_whatsapp_key",
    "Content-Type": "application/json"
  },
  body: {
    messaging_product: "whatsapp",
    to: bookingForm.phone,
    type: "template",
    template: {
      name: "evenza_ticket_pass",
      language: { code: "en_US" },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: bookingReceipt.userName },
            { type: "text", text: bookingReceipt.eventName },
            { type: "text", text: bookingReceipt.eventDate },
            { type: "text", text: bookingReceipt.reference }
          ]
        }
      ]
    }
  }
}, null, 2)}
                    </pre>
                  )}

                  <div className="real-whatsapp-container">
                    <p>Open this ticket directly on your mobile device:</p>
                    <a 
                      href={`https://api.whatsapp.com/send?phone=${bookingForm.phone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(`Hi ${bookingReceipt.userName}! Here is your Evenza ticket pass for ${bookingReceipt.eventName}.\n\n📅 Date: ${bookingReceipt.eventDate}\n📍 Venue: ${bookingReceipt.eventVenue}\n🎫 Type: ${bookingReceipt.ticketType}\n🔑 Reference: ${bookingReceipt.reference}\n\nSee you at the event!`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-send-whatsapp-real"
                    >
                      <span>Send Prefilled WhatsApp Message</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 0 0 1.333 4.982L2 22l5.202-1.362a9.92 9.92 0 0 0 4.808 1.226h.003c5.502 0 9.99-4.479 9.99-9.987C22 4.478 17.513 2 12.012 2zm0 18.29h-.001a8.25 8.25 0 0 1-4.215-1.154l-.303-.18-3.13.82.835-3.05-.198-.314a8.27 8.27 0 0 1-1.265-4.422c.001-4.561 3.716-8.273 8.281-8.273 2.212 0 4.291.86 5.854 2.427a8.21 8.21 0 0 1 2.425 5.85c-.001 4.562-3.716 8.276-8.283 8.276zm4.535-6.19c-.248-.124-1.468-.724-1.696-.807-.227-.083-.393-.124-.558.124-.166.248-.641.807-.786.973-.145.166-.29.186-.538.062a6.79 6.79 0 0 1-1.998-1.23 7.48 7.48 0 0 1-1.382-1.722c-.145-.248-.016-.381.109-.504.111-.112.248-.29.372-.435.124-.145.165-.248.248-.414.083-.166.042-.31-.02-.435-.062-.124-.558-1.344-.764-1.84-.2-.486-.403-.42-.558-.427-.145-.007-.31-.007-.476-.007a.91.91 0 0 0-.662.31c-.227.248-.868.848-.868 2.069 0 1.22.888 2.397 1.013 2.562.124.166 1.748 2.67 4.235 3.74.59.255 1.053.407 1.41.52.595.19 1.137.162 1.565.099.477-.07 1.468-.6 1.674-1.18.207-.58.207-1.077.145-1.18-.062-.103-.227-.165-.475-.29z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                <div className="receipt-actions">
                  <button className="btn-receipt-download" onClick={() => window.print()}>Print / Download Ticket</button>
                  <button className="btn-receipt-close" onClick={handleCloseBooking}>Close</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}

export default App

