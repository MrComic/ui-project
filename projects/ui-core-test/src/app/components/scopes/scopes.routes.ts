import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { ScopeSubjectService } from '../scope-subject/services/scope-subject.service';
import { inject } from '@angular/core';

export const ScopesRoutes: Routes = [
  {
    path: 'scopes',
    data: { label: 'scopes' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./scopes/scopes.component').then((m) => m.ScopesComponent),
        children: [],
      },
      {
        path: 'scope-subjects/:ScopeId',
        data: { label: 'scope-subjects' },
        loadComponent: () =>
          import('../scope-subject/scope-subject/scope-subject.component').then(
            (m) => m.ScopeSubjectComponent
          ),
        resolve: {
          data: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
            const service = inject(ScopeSubjectService);
            var subjectId = route.params['ScopeId'];
            return service.getWithSubjectId(subjectId);
          },
        },
        providers: [ScopeSubjectService],
      },
    ],
  },
];
