// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Observable, tap } from 'rxjs';
import { ConfigurationService } from '../../services/ConfigurationService.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserData } from '../models/user-data.model';
import { Router } from '@angular/router';
import { AccessToken } from '../models/access-token.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private returnUrl: string | null = null;
  config: any;
  constructor(
    private http: HttpService,
    private router: Router,
    private jwtService: JwtHelperService,
    private configService: ConfigurationService
  ) {}

  getUserImage(username: string) {
    this.config = this.configService.getAll();
    if (this.config['enable_auth'] == false) {
      return this.http.getWithFile(`/images/image.png`, {
        responseType: 'blob',
      });
    }
    console.log(this.config['enable_auth'] == 'false');
    return this.http.getWithFile(
      `${this.config['apiUrl']}/auth/User/image/` + username,
      { responseType: 'blob' }
    );
  }

  login(username: string, password: string): Observable<any> {
    let config = this.configService.getAll();
    return this.http.post<any>(`${config['apiUrl']}/auth/login`, {
      username,
      password,
    });
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getuser(): string | null {
    return this.jwtService.decodeToken(
      localStorage.getItem('access_token')?.toString() || ''
    );
  }

  getUserDataFromToken(): UserData | null {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return null;
    }
    const decodedToken = this.jwtService.decodeToken(token);
    const userData =
      decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata'
      ];
    return userData ? JSON.parse(userData) : null;
  }

  getUserIdFromToken(): UserData | null {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return null;
    }
    const decodedToken = this.jwtService.decodeToken(token);
    const userData =
      decodedToken[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ];
    return userData;
  }

  storeToken(token: AccessToken): void {
    localStorage.setItem('access_token', token.accessToken);
    localStorage.setItem('refresh_token', token.refreshToken);
    localStorage.setItem(
      'access_token_expiry',
      token.accessTokenExpiry.toString()
    );
    localStorage.setItem(
      'refresh_token_validity_Minutes',
      token.refreshTokenValidityMinutes.toString()
    );
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  refreshToken(): Observable<AccessToken> {
    let config = this.configService.getAll();
    return this.http
      .post<AccessToken>(`${config['apiUrl']}/auth/refresh-token`, {
        refreshToken: this.getRefreshToken(),
        userId: this.getUserIdFromToken(),
      })
      .pipe(
        tap((response) => {
          this.storeToken(response);
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }

  setReturnUrl(url: string): void {
    this.returnUrl = url;
  }

  getReturnUrl(): string | null {
    return this.returnUrl;
  }
}
