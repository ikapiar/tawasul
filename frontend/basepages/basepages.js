/*
  Base Pages Shared JS (vanilla, no frameworks)
  - This file provides small helpers for the static Bootstrap pages in frontend/basepages.
  - It simulates UI behaviors (search/filter, add items) fully in-memory; nothing is persisted.
  - IMPORTANT: All "API" interactions are simulated with fake data. No backend calls are made.

  Functions:
    - fakeLogin(): Promise<void>
        Simulates Google login by storing a demo user in localStorage.
    - getSessionUser(): Promise<{id,email,name,picture}|null>
        Returns the stored demo user or null (with small delay to mimic network).
    - requireAuth(): Promise<{user|null}>
        Ensures a user is "logged in"; if not, redirects to index.html.
    - logout(): Promise<void>
        Clears the fake session and redirects to index.html.
    - mockStore: in-memory arrays for directory, jobs, mentors, events, messages.
    - showAlert(), filterDirectory(): UI utilities.
*/

const SESSION_KEY = 'demo_session_user';

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fakeLogin() {
  // Simulate OAuth + profile
  await delay(300);
  const demoUser = {
    id: 'demo-' + Math.random().toString(36).slice(2),
    email: 'alumni.demo@ikapiar.id',
    name: 'Alumni Demo',
    picture: 'https://via.placeholder.com/96?text=A'
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(demoUser));
}

async function getSessionUser() {
  await delay(150);
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

async function requireAuth() {
  const user = await getSessionUser();
  if (!user) {
    // Not logged in; go back to landing
    window.location.href = './index.html';
    return { user: null };
  }
  return { user };
}

async function logout() {
  await delay(100);
  localStorage.removeItem(SESSION_KEY);
  window.location.href = './index.html';
}

// In-memory mock data for UI simulation only
const mockStore = {
  directory: [
    { name: 'Andi Pratama', year: 2018, major: 'Teknik Informatika', job: 'Frontend Engineer', skills: ['Angular','Bootstrap'], contact: 'andi@example.com' },
    { name: 'Budi Santoso', year: 2016, major: 'Sistem Informasi', job: 'Product Manager', skills: ['Leadership','Roadmapping'], contact: 'budi@example.com' },
    { name: 'Citra Lestari', year: 2020, major: 'Teknik Industri', job: 'Data Analyst', skills: ['SQL','Python'], contact: 'citra@example.com' }
  ],
  jobs: [
    { title: 'Software Engineer', company: 'PT Maju Jaya', location: 'Jakarta', type: 'Full-time' },
    { title: 'Data Analyst Intern', company: 'DataCorp', location: 'Bandung', type: 'Internship' }
  ],
  mentors: [
    { name: 'Dewi Kartika', field: 'Product Management', slots: 3 },
    { name: 'Rizky Saputra', field: 'Software Engineering', slots: 2 }
  ],
  events: [
    { name: 'Webinar: Karier di Tech', date: '2025-09-20', place: 'Online' },
    { name: 'Reuni Akbar', date: '2025-12-05', place: 'Aula Kampus' }
  ]
};

// UI helpers (Bootstrap based)
function showAlert(container, message, type) {
  // type: 'success' | 'danger' | 'info' | 'warning'
  const div = document.createElement('div');
  div.className = `alert alert-${type || 'info'} alert-dismissible fade show`;
  div.role = 'alert';
  div.textContent = message;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'btn-close';
  btn.setAttribute('data-bs-dismiss', 'alert');
  btn.setAttribute('aria-label', 'Close');
  div.appendChild(btn);
  container.innerHTML = '';
  container.appendChild(div);
}

// Directory filter helper
function filterDirectory(keyword) {
  if (!keyword) return mockStore.directory;
  const k = keyword.toLowerCase();
  return mockStore.directory.filter(item =>
    item.name.toLowerCase().includes(k) ||
    String(item.year).includes(k) ||
    item.major.toLowerCase().includes(k) ||
    item.job.toLowerCase().includes(k) ||
    item.skills.join(',').toLowerCase().includes(k) ||
    item.contact.toLowerCase().includes(k)
  );
}

// Export to window for inline scripts in HTML pages
window.BasePages = {
  fakeLogin,
  getSessionUser,
  requireAuth,
  logout,
  mockStore,
  showAlert,
  filterDirectory
};
