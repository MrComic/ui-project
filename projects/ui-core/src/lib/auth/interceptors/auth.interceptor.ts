// src/app/auth.interceptor.ts
import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpInterceptorFn,
  HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, delay, filter, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../services/auth.service';
import { ConfigurationService } from '../../services/ConfigurationService.service';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401 && !req.url.includes('/auth/refresh')) {
        return handle401Error(req, next, authService, router);
      }
      return throwError(() => error);
    })
  );
};

function handle401Error(
  req: any,
  next: any,
  authService: AuthService,
  router: Router
): Observable<any> {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((newToken) => {
        isRefreshing = false;
        refreshTokenSubject.next(newToken.accessToken);

        return next(
          req.clone({
            setHeaders: { Authorization: `Bearer ${newToken.accessToken}` },
          })
        );
      }),
      catchError((err) => {
        isRefreshing = false;
        console.log(err);
        authService.logout();
        router.navigate(['/login']);
        return throwError(() => err);
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) =>
        next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }))
      )
    );
  }
}
