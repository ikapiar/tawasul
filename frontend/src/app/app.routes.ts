import { Routes } from '@angular/router';
import {DashboardGuard} from './core/guards/DashboardGuard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/landing/landing.routes').then(m => m.LandingRoutes)
  },
  {
    path: 'login',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AuthRoutes)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DashboardRoutes),
    canActivate: [DashboardGuard]
  }
];
