import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfigurationService } from '../../services/ConfigurationService.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private configService: ConfigurationService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  canActivate(): boolean {
    const token = localStorage.getItem('access_token');
    var configs = this.configService.getAll();
    if (configs && configs['enable_auth'] == 'true') {
      if (token && !this.jwtHelper.isTokenExpired(token)) {
        return true;
      }
    } else {
      console.log(configs['enable_auth']);
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
