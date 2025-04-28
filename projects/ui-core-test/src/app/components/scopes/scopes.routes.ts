import { Routes } from '@angular/router';

export const ScopesRoutes: Routes = [
  {
    path: 'scopes',
    data: { label: 'scopes' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./scopes/scopes.component').then((m) => m.ScopesComponent),
      },
    ],
  },
];
