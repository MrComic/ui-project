import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { CoreLoginComponent } from '../../../ui-core/src/lib/auth/components/core-login/core-login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { delay, map, of, timeout } from 'rxjs';
import { AuthGuard } from '../../../ui-core/src/lib/auth/guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ScopesRoutes } from './components/scopes/scopes.routes';
import { ScopesSubjectBagRoutes } from './components/scope-subject-bag/scopes.routes';

export const dummyResolver: ResolveFn<boolean> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return of('Route!')
    .pipe(delay(400))
    .pipe(map(() => true));
};

export const routes: Routes = [
  {
    path: 'login',
    component: CoreLoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        data: { label: 'dashboard' },
        component: DashboardComponent,
        resolve: { data: dummyResolver },
      },
      ...ScopesRoutes,
      ...ScopesSubjectBagRoutes,
    ],
  },
];
