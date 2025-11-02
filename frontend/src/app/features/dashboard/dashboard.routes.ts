import { Routes } from '@angular/router';

export const DashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../../layouts/dashboard-layout/dashboard-layout.component').then(m => m.DashboardLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/dashboard-home/dashboard-home.component').then(m => m.DashboardHomeComponent)
      }
    ]
  }
];
