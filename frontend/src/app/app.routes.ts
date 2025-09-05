import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/pages').then(m => m.LandingComponent) },
  { path: 'connect', loadComponent: () => import('./pages/pages').then(m => m.ConnectComponent) },
  { path: 'directory', loadComponent: () => import('./pages/pages').then(m => m.DirectoryComponent) },
  { path: 'jobs', loadComponent: () => import('./pages/pages').then(m => m.JobsComponent) },
  { path: 'mentorship', loadComponent: () => import('./pages/pages').then(m => m.MentorshipComponent) },
  { path: 'events', loadComponent: () => import('./pages/pages').then(m => m.EventsComponent) },
  { path: 'messages', loadComponent: () => import('./pages/pages').then(m => m.MessagesComponent) },
  { path: 'profile', loadComponent: () => import('./pages/pages').then(m => m.ProfileComponent) },
  { path: '**', redirectTo: '' }
];
