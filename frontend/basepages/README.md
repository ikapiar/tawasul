# Base Pages (Vanilla + Bootstrap, Fake Data Only)

This folder contains minimal, framework-free baseline pages for the core features, styled strictly with Bootstrap classes (no custom CSS) and using small vanilla JS helpers from `basepages.js`.

Pages:
- index.html — Landing (public)
- about.html — About (public)
- connect.html — Dashboard (protected)
- directory.html — Alumni Directory (protected, searchable)
- messages.html — Direct Messaging (protected, in-memory demo)
- jobs.html — Job Board (protected, list + add job demo)
- mentorship.html — Mentorship Board (protected, request demo)
- events.html — Event Calendar (protected, list + add demo)
- profile.html — My Profile (protected)

Shared JS (no backend calls):
- basepages.js — documented vanilla helpers:
  - fakeLogin(): simulate a Google login, stores a demo user in localStorage
  - getSessionUser(): returns the stored demo user (or null)
  - requireAuth(): redirects to index.html if no session
  - logout(): clears the fake session
  - mockStore: demo data for directory, jobs, mentors, events, messages
  - showAlert(), filterDirectory(): UI utilities for the demos

Important:
- All interactions are simulated in-memory. Nothing is persisted beyond localStorage for the fake session.
- There are no API integrations here. Do not depend on any `/api/*` endpoints.

How to try locally (any static server or just open):
- Open `index.html` in a browser (file:// or served via any static server).
- Click “Masuk/Gabung” to call `fakeLogin()` and then navigate to `connect.html`.
- Protected pages call `requireAuth()` on load and will redirect to `index.html` when not logged in.
- Use “Keluar” to clear the fake session.

Notes:
- Bootstrap 5.3 via CDN (CSS + bundle JS).
- Vanilla JS only, no jQuery.
- These pages are baseline UI mocks and can be iterated or replaced by the real Angular SPA later.
