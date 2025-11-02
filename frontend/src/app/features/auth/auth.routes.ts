import { Routes } from '@angular/router';

export const AuthRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../../layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent)
      }
    ]
  }
];
