import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { ScopeSubjectService } from '../scope-subject/services/scope-subject.service';
import { inject } from '@angular/core';

export const ScopesSubjectBagRoutes: Routes = [
  {
    path: 'scope-subject-bag',
    data: { label: 'scope-subject-bag' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './scope-subject-bag-list/scope-subject-bag-list.component'
          ).then((m) => m.ScopeSubjectBagListComponent),
      },
      {
        path: 'manage-subjects/:id',
        loadComponent: () =>
          import('./manage-subjects/manage-subjects.component').then(
            (p) => p.ManageSubjectsComponent
          ),
        data: {
          label: 'scope-subjects-bag-subjects',
        },
      },
    ],
  },
];
