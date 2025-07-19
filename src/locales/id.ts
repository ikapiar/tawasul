export default {
  sidebar: {
    nav: {
      dashboard: 'Dasbor',
      alumni_directory: 'Direktori Alumni',
      job_board: 'Papan Pekerjaan',
      mentorship: 'Mentorship',
      events: 'Acara',
      messages: 'Pesan',
      smart_match: 'Smart Match',
    },
  },
  home: {
    views: {
      titles: {
        dashboard: 'Dasbor',
        alumni: 'Direktori Alumni',
        jobs: 'Papan Pekerjaan',
        mentorship: 'Papan Mentorship',
        events: 'Acara',
        messages: 'Pesan',
        match: 'Smart Matching',
      },
      descriptions: {
        dashboard: 'Selamat datang di dasbor ikapiar Connect Anda.',
        alumni: 'Cari dan terhubung dengan alumni.',
        jobs: 'Temukan peluang kerja dan magang.',
        mentorship: 'Temukan mentor untuk membimbing Anda.',
        events: 'Acara jaringan dan reuni yang akan datang.',
        messages: 'Percakapan pribadi Anda.',
        match: 'Dapatkan saran koneksi alumni bertenaga AI.',
      },
    },
  },
  alumni: {
    search_placeholder: 'Cari berdasarkan nama, jurusan, pekerjaan, atau keahlian...',
    class_of: 'Angkatan',
    connect_button: 'Hubungi',
  },
  dashboard: {
    welcome_back: 'Selamat Datang Kembali!',
    welcome_message: 'Jaringan Anda adalah kekayaan bersih Anda. Terhubung kembali dengan teman lama, jalin hubungan profesional baru, dan jelajahi peluang dalam komunitas ikapiar.',
    explore_network_button: 'Jelajahi Jaringan',
    networking_alt: 'Acara networking',
    features: {
      alumni: {
        title: 'Direktori Alumni',
        description: 'Jelajahi profil dan terhubung dengan sesama alumni.',
      },
      jobs: {
        title: 'Papan Pekerjaan',
        description: 'Temukan peluang kerja dan magang eksklusif.',
      },
      mentorship: {
        title: 'Mentorship',
        description: 'Cari mentor atau tawarkan bimbingan Anda kepada siswa.',
      },
      events: {
        title: 'Acara',
        description: 'Tetap terinformasi tentang acara jaringan yang akan datang.',
      },
    },
    ai_connections: {
      title: 'Koneksi Berbasis AI',
      description: 'Biarkan alat Pencocokan Cerdas kami memperkenalkan Anda kepada alumni yang relevan berdasarkan minat dan tujuan karier Anda.',
    },
    messaging: {
      title: 'Pesan Langsung',
      description: 'Mulai percakapan, minta saran, atau sekadar menyapa dengan sistem pesan pribadi kami.',
    },
    find_matches_button: 'Cari Jodoh',
    open_messages_button: 'Buka Pesan',
  },
  messages: {
    search_placeholder: 'Cari pesan...',
    status_online: 'Online',
    type_message_placeholder: 'Ketik pesan...',
  },
  events: {
    upcoming_events: 'Acara Mendatang',
  },
  jobs: {
    title: 'Peluang',
    description: 'Telusuri lowongan kerja dan magang yang diposting oleh sesama alumni.',
    table: {
      role: 'Posisi',
      company: 'Perusahaan',
      location: 'Lokasi',
      type: 'Jenis',
      posted: 'Dikirim',
      action: 'Aksi',
    },
    types: {
      'full-time': 'Penuh Waktu',
      internship: 'Magang',
      'part-time': 'Paruh Waktu',
    },
    apply_button: 'Lamar',
  },
  mentorship: {
    title: 'Cari Mentor',
    description: 'Terhubung dengan alumni berpengalaman yang terbuka untuk menjadi mentor.',
    table: {
      mentor: 'Mentor',
      expertise: 'Keahlian',
      current_role: 'Posisi Saat Ini',
      availability: 'Ketersediaan',
      action: 'Aksi',
    },
    availabilities: {
      available: 'Tersedia',
      limited: 'Terbatas',
      unavailable: 'Tidak Tersedia',
    },
    request_button: 'Minta',
  },
  match: {
    title: 'Temukan Koneksi Anda',
    description: 'Jelaskan minat akademis, aspirasi karier, dan hobi Anda. AI kami akan menemukan alumni dengan jalur yang serupa.',
    form: {
      profile_label: 'Profil Anda',
      profile_placeholder: "mis., 'Saya seorang mahasiswa tingkat akhir yang bersemangat tentang energi terbarukan dan analisis data. Saya mencari saran untuk masuk ke industri teknologi hijau dan ingin terhubung dengan para profesional di bidang itu. Saya juga anggota klub debat dan suka hiking.'",
      submit_button: 'Dapatkan Saran',
      generating_button: 'Menghasilkan...',
    },
    suggestions: {
      title: 'Saran Koneksi',
      error_title: 'Kesalahan',
    },
  },
} as const;
