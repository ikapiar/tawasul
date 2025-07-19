export default {
  sidebar: {
    nav: {
      dashboard: 'Dashboard',
      alumni_directory: 'Alumni Directory',
      job_board: 'Job Board',
      mentorship: 'Mentorship',
      events: 'Events',
      messages: 'Messages',
      smart_match: 'Smart Match',
    },
  },
  home: {
    views: {
      titles: {
        dashboard: 'Dashboard',
        alumni: 'Alumni Directory',
        jobs: 'Job Board',
        mentorship: 'Mentorship Board',
        events: 'Events',
        messages: 'Messages',
        match: 'Smart Matching',
      },
      descriptions: {
        dashboard: 'Welcome to your ikapiar Connect dashboard.',
        alumni: 'Search and connect with alumni.',
        jobs: 'Find job and internship opportunities.',
        mentorship: 'Find a mentor to guide you.',
        events: 'Upcoming networking events and reunions.',
        messages: 'Your private conversations.',
        match: 'Get AI-powered alumni connection suggestions.',
      },
    },
  },
  alumni: {
    search_placeholder: 'Search by name, major, job, or skill...',
    class_of: 'Class of',
    connect_button: 'Connect',
  },
  dashboard: {
    welcome_back: 'Welcome Back!',
    welcome_message: 'Your network is your net worth. Reconnect with old friends, forge new professional relationships, and explore opportunities within the ikapiar community.',
    explore_network_button: 'Explore Network',
    networking_alt: 'Networking event',
    features: {
      alumni: {
        title: 'Alumni Directory',
        description: 'Explore profiles and connect with fellow alumni.',
      },
      jobs: {
        title: 'Job Board',
        description: 'Discover exclusive job and internship opportunities.',
      },
      mentorship: {
        title: 'Mentorship',
        description: 'Find a mentor or offer your guidance to students.',
      },
      events: {
        title: 'Events',
        description: 'Stay updated on upcoming networking events.',
      },
    },
    ai_connections: {
      title: 'AI-Powered Connections',
      description: 'Let our Smart Matching tool introduce you to relevant alumni based on your interests and career goals.',
    },
    messaging: {
      title: 'Direct Messaging',
      description: 'Start a conversation, ask for advice, or just say hello with our private messaging system.',
    },
    find_matches_button: 'Find Matches',
    open_messages_button: 'Open Messages',
  },
  messages: {
    search_placeholder: 'Search messages...',
    status_online: 'Online',
    type_message_placeholder: 'Type a message...',
  },
  events: {
    upcoming_events: 'Upcoming Events',
  },
  jobs: {
    title: 'Opportunities',
    description: 'Browse job and internship openings posted by fellow alumni.',
    table: {
      role: 'Role',
      company: 'Company',
      location: 'Location',
      type: 'Type',
      posted: 'Posted',
      action: 'Action',
    },
    types: {
      'full-time': 'Full-time',
      internship: 'Internship',
      'part-time': 'Part-time',
    },
    apply_button: 'Apply',
  },
  mentorship: {
    title: 'Find a Mentor',
    description: 'Connect with experienced alumni who are open to mentoring.',
    table: {
      mentor: 'Mentor',
      expertise: 'Expertise',
      current_role: 'Current Role',
      availability: 'Availability',
      action: 'Action',
    },
    availabilities: {
      available: 'Available',
      limited: 'Limited',
      unavailable: 'Unavailable',
    },
    request_button: 'Request',
  },
  match: {
    title: 'Find Your Connection',
    description: "Describe your academic interests, career aspirations, and hobbies. Our AI will find alumni with similar paths.",
    form: {
      profile_label: 'Your Profile',
      profile_placeholder: "e.g., 'I'm a junior passionate about renewable energy and data analysis. I'm looking for advice on breaking into the green tech industry and would love to connect with professionals in that field. I'm also part of the debate club and enjoy hiking.'",
      submit_button: 'Get Suggestions',
      generating_button: 'Generating...',
    },
    suggestions: {
      title: 'Suggested Connections',
      error_title: 'Error',
    },
  },
} as const;
