// Sample events database for Evenza College Event Management System
export const sampleEvents = [
  {
    id: 'evt-1',
    title: 'National HackFest 2026',
    category: 'Hackathon',
    description: 'A 36-hour national-level hackathon bringing together the brightest minds to solve real-world challenges in AI, Web3, and HealthTech. Build, pitch, and win prizes worth $5000.',
    date: '2026-07-15',
    time: '09:00 AM',
    venue: 'Main Seminar Hall, CSE Dept',
    organizer: 'Coding Club & CSE Department',
    organizerType: 'department',
    fee: 0,
    registrations: 342,
    seatsAvailable: 50,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=60',
    status: 'open',
    eventType: 'on-campus',
    createdAt: '2026-06-01T10:00:00.000Z',
    schedule: 'Day 1: 9:00 AM Team formation, 10:00 AM Coding Starts. Day 2: 4:00 PM Coding Ends, 5:00 PM Presentations and Judgement.',
    rules: [
      'Maximum 4 members per team.',
      'All code must be written during the hackathon. Pre-existing code is prohibited.',
      'Participants must bring their own laptops and hardware.'
    ],
    speakers: [
      { name: 'Dr. Sarah Connor', role: 'AI Lead, DeepMind', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80' },
      { name: 'Markus Vance', role: 'Founder, Web3 Alliance', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' }
    ],
    contact: { email: 'hackfest@college.edu', phone: '+1 (555) 019-2834' }
  },
  {
    id: 'evt-2',
    title: 'Symphony: Annual Cultural Fest',
    category: 'Fest',
    description: 'The biggest celebration of art, music, dance, and drama. Join us for a star-studded evening featuring live concerts, street plays, fashion shows, and art galleries.',
    date: '2026-07-28',
    time: '05:00 PM',
    venue: 'Open Air Theatre (OAT)',
    organizer: 'Student Council',
    organizerType: 'student-council',
    fee: 150,
    registrations: 1205,
    seatsAvailable: 295,
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60',
    status: 'open',
    eventType: 'on-campus',
    createdAt: '2026-06-05T09:00:00.000Z',
    schedule: '5:00 PM Gates open, 5:30 PM Classical and Fusion Dance, 7:00 PM Battle of the Bands, 9:00 PM Live Concert Headline.',
    rules: [
      'Valid college ID card required at entry.',
      'Outside food, beverages, and sharp objects are strictly prohibited.',
      'Standard student code of conduct applies.'
    ],
    speakers: [
      { name: 'DJ Zedd', role: 'Headliner / Music Producer', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=100&auto=format&fit=crop&q=80' }
    ],
    contact: { email: 'symphony@college.edu', phone: '+1 (555) 012-9988' }
  },
  {
    id: 'evt-3',
    title: 'Advanced Web Dev Bootcamp',
    category: 'Workshop',
    description: 'An intensive interactive workshop focusing on Next.js, Server Actions, React 19, and Tailwind CSS v4 layout architectures. Perfect for developers looking to upgrade their skills.',
    date: '2026-06-25', // Tomorrow!
    time: '10:00 AM',
    venue: 'Virtual Classroom (Zoom)',
    organizer: 'Web Development Club',
    organizerType: 'club',
    fee: 0,
    registrations: 489,
    seatsAvailable: 11, // Closing soon!
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=60',
    status: 'closing_soon',
    eventType: 'online',
    createdAt: '2026-06-10T14:30:00.000Z',
    schedule: '10:00 AM - 12:00 PM React 19 and Next.js Core. 1:00 PM - 3:00 PM Styling with Tailwind v4. 3:00 PM - 4:00 PM Q&A and build submission.',
    rules: [
      'Pre-requisite: Basic JavaScript and HTML knowledge.',
      'Zoom link will be sent only to registered emails 2 hours before the event.',
      'E-certificates will be provided to attendees who complete the project.'
    ],
    speakers: [
      { name: 'Alisha Patel', role: 'Senior Developer, Vercel', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' }
    ],
    contact: { email: 'webdev@college.edu', phone: '+1 (555) 017-4567' }
  },
  {
    id: 'evt-4',
    title: 'Inter-College Football Championship',
    category: 'Sports',
    description: 'Witness the ultimate sports rivalry! Colleges from across the region battle for the prestigious Evenza Football Trophy and a cash prize pool of $2000.',
    date: '2026-07-10',
    time: '08:00 AM',
    venue: 'Main College Sports Ground',
    organizer: 'Sports Committee',
    organizerType: 'club',
    fee: 250,
    registrations: 160,
    seatsAvailable: 40,
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=60',
    status: 'open',
    eventType: 'on-campus',
    createdAt: '2026-06-12T08:00:00.000Z',
    schedule: 'Day 1: Knockout rounds. Day 2: Quarter-finals & Semi-finals. Day 3: Final match followed by presentation ceremony.',
    rules: [
      'Teams must consist of 11 players and 4 substitutes maximum.',
      'Standard FIFA rules apply.',
      'Players must wear proper football kits, shin guards, and boots.'
    ],
    speakers: [
      { name: 'Coach Gordon', role: 'Former National Player', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' }
    ],
    contact: { email: 'sports@college.edu', phone: '+1 (555) 018-9012' }
  },
  {
    id: 'evt-5',
    title: 'Seminar: Future of Quantum Computing',
    category: 'Seminar',
    description: 'An insightful seminar introducing quantum superposition, entanglement, and the roadmap to commercial quantum hardware. Hosted by leading IBM research scientists.',
    date: '2026-07-05',
    time: '02:00 PM',
    venue: 'Auditorium C, Physics Block',
    organizer: 'Physics Department',
    organizerType: 'department',
    fee: 0,
    registrations: 210,
    seatsAvailable: 90,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60',
    status: 'open',
    eventType: 'hybrid',
    createdAt: '2026-06-15T11:00:00.000Z',
    schedule: '2:00 PM Introductory remarks. 2:15 PM Keynote on Quantum Supremacy. 3:15 PM Demonstration on IBM Q Experience. 3:45 PM Networking session.',
    rules: [
      'On-campus attendees must register by July 3.',
      'Online access link will be active 15 minutes before the start.'
    ],
    speakers: [
      { name: 'Dr. Raymond Shaw', role: 'Quantum Scientist, IBM', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80' }
    ],
    contact: { email: 'quantum@college.edu', phone: '+1 (555) 016-1234' }
  },
  {
    id: 'evt-6',
    title: 'Mega Placement Drive 2026',
    category: 'Placement Drive',
    description: 'Opportunities knock! Over 30 multinational companies, startups, and tech giants arrive on campus for recruitments across IT, Core Engineering, and Marketing streams.',
    date: '2026-07-20',
    time: '09:00 AM',
    venue: 'College Placement Cell',
    organizer: 'Training & Placement Office',
    organizerType: 'department',
    fee: 0,
    registrations: 850,
    seatsAvailable: 0, // Closed / Full
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60',
    status: 'closed',
    eventType: 'on-campus',
    createdAt: '2026-05-20T08:00:00.000Z',
    schedule: '9:00 AM Aptitude tests. 1:00 PM Group discussions. 3:00 PM Personal & Technical interviews. 6:00 PM Result declaration.',
    rules: [
      'Open to final year and pre-final year students only.',
      'Formal attire is mandatory.',
      'Carry 5 copies of your updated resume and academic transcript.'
    ],
    speakers: [],
    contact: { email: 'placement@college.edu', phone: '+1 (555) 011-8899' }
  },
  {
    id: 'evt-7',
    title: 'RoboWars Competition',
    category: 'Competition',
    description: 'Hear the gears grind! High-powered custom combat robots clash in a secure bulletproof arena to claim supremacy. An adrenaline-pumping experience of engineering prowess.',
    date: '2026-07-02',
    time: '11:00 AM',
    venue: 'Mechanical Workshop Plaza',
    organizer: 'Robotics Society',
    organizerType: 'club',
    fee: 300,
    registrations: 45,
    seatsAvailable: 5, // Closing soon!
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60',
    status: 'closing_soon',
    eventType: 'on-campus',
    createdAt: '2026-06-08T12:00:00.000Z',
    schedule: '11:00 AM Robot safety checking. 12:00 PM Group matches. 3:00 PM Semi-finals. 5:00 PM Mega Final Clashes.',
    rules: [
      'Robot weight limit: Max 15 kg.',
      'No combustion engine or chemicals allowed in weapons.',
      'Safety procedures must be strictly followed in testing zones.'
    ],
    speakers: [],
    contact: { email: 'robotics@college.edu', phone: '+1 (555) 019-3322' }
  },
  {
    id: 'evt-8',
    title: 'Google Cloud Study Jam',
    category: 'Workshop',
    description: 'Learn Cloud Fundamentals! Dive into Google Cloud Infrastructure, Kubernetes, BigQuery, and generative AI tools. Gain practical hands-on experience and secure Cloud credits.',
    date: '2026-06-30',
    time: '03:00 PM',
    venue: 'Google Meet',
    organizer: 'Google Developer Student Clubs',
    organizerType: 'club',
    fee: 0,
    registrations: 380,
    seatsAvailable: 220,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=60',
    status: 'open',
    eventType: 'online',
    createdAt: '2026-06-18T10:00:00.000Z',
    schedule: '3:00 PM Setup and Google Cloud Console intro. 3:30 PM Working on Qwiklabs. 4:30 PM Troubleshooting & Badges completion.',
    rules: [
      'Registrants must create a free Qwiklabs profile beforehand.',
      'Ensure a stable internet connection.'
    ],
    speakers: [
      { name: 'Karthik Rao', role: 'GDSC Facilitator / Cloud Eng', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80' }
    ],
    contact: { email: 'gdsc@college.edu', phone: '+1 (555) 015-7777' }
  },
  {
    id: 'evt-9',
    title: 'Finance & Investing Summit',
    category: 'Seminar',
    description: 'Get financially literate! Learn about stock markets, mutual funds, cryptocurrency, personal finance, and smart saving strategies from financial advisors.',
    date: '2026-07-22',
    time: '10:00 AM',
    venue: 'MBA Block Auditorium',
    organizer: 'Department of Management studies',
    organizerType: 'department',
    fee: 100,
    registrations: 150,
    seatsAvailable: 150,
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=60',
    status: 'open',
    eventType: 'hybrid',
    createdAt: '2026-06-20T09:00:00.000Z',
    schedule: '10:00 AM Keynote: Personal Finance in 20s. 11:30 AM Workshop: Intro to Stock Trading. 1:30 PM Panel Discussion on Crypto Assets.',
    rules: [
      'Register to receive the event kit.',
      'Live stream recording will be shared with premium registrants.'
    ],
    speakers: [
      { name: 'Monica Geller', role: 'Portfolio Manager, Chase', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80' }
    ],
    contact: { email: 'finance@college.edu', phone: '+1 (555) 014-8888' }
  },
  {
    id: 'evt-10',
    title: 'Annual Coding Championship',
    category: 'Competition',
    description: 'A solo competitive programming competition designed to test logic, algorithms, and speed. Compete against top coders across the state on HackerRank.',
    date: '2026-06-24', // Today!
    time: '02:00 PM',
    venue: 'Online HackerRank Arena',
    organizer: 'Computer Science Department',
    organizerType: 'department',
    fee: 0,
    registrations: 512,
    seatsAvailable: 0,
    image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&auto=format&fit=crop&q=60',
    status: 'closed',
    eventType: 'online',
    createdAt: '2026-06-01T15:00:00.000Z',
    schedule: '2:00 PM Contest links active. 2:00 PM - 5:00 PM Competitive Round. 6:00 PM Editorial and winners announcement.',
    rules: [
      'Plagiarism checks will be conducted strictly. Any copied code will result in immediate disqualification.',
      'C, C++, Java, Python, Kotlin languages are supported.'
    ],
    speakers: [],
    contact: { email: 'coders@college.edu', phone: '+1 (555) 013-1111' }
  },
  {
    id: 'evt-11',
    title: 'Photography Walk & Competition',
    category: 'Competition',
    description: 'Express your vision! A campus-wide photography walk focusing on architecture, portraiture, and nature. Capture moments and submit your best clicks to win awards.',
    date: '2026-07-08',
    time: '07:00 AM',
    venue: 'Campus Botanical Garden',
    organizer: 'Photography Club',
    organizerType: 'club',
    fee: 50,
    registrations: 98,
    seatsAvailable: 52,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=60',
    status: 'open',
    eventType: 'on-campus',
    createdAt: '2026-06-14T06:00:00.000Z',
    schedule: '7:00 AM Assembly and briefing. 7:30 AM - 10:00 AM Photo walk. 12:00 PM Submission deadline online.',
    rules: [
      'Photos must be clicked on campus on July 8.',
      'Post-processing should be restricted to basic color/exposure tuning.',
      'Both mobile and DSLR camera submissions are welcome in separate categories.'
    ],
    speakers: [],
    contact: { email: 'photo@college.edu', phone: '+1 (555) 012-4433' }
  },
  {
    id: 'evt-12',
    title: 'Consulting 101 Masterclass',
    category: 'Workshop',
    description: 'Learn the core frameworks of strategy consulting. Crack case studies, build market entry models, and prepare for top tier firm recruitments with former McKinsey consultants.',
    date: '2026-07-12',
    time: '04:00 PM',
    venue: 'Microsoft Teams',
    organizer: 'Consulting Club',
    organizerType: 'external',
    fee: 200,
    registrations: 120,
    seatsAvailable: 80,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60',
    status: 'open',
    eventType: 'hybrid',
    createdAt: '2026-06-20T10:00:00.000Z',
    schedule: '4:00 PM McKinsey Framework overview. 5:00 PM Mock case solving session. 6:00 PM Q&A and networking.',
    rules: [
      'Registered attendees will receive prep-materials.',
      'Attendance certificate is provided.'
    ],
    speakers: [
      { name: 'Harvey Specter', role: 'Managing Partner, McKinsey Co.', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80' }
    ],
    contact: { email: 'consulting@college.edu', phone: '+1 (555) 019-8765' }
  }
];
