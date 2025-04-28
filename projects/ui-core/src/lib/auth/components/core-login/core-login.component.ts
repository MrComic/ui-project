import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '../../../translate/services/translate.service';
import { ConfigurationService } from '../../../services/ConfigurationService.service';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent } from '../../../components/forms/button/button.component';
import { LoaderButtonDirective } from '../../../../directives/loader-button.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'core-login',
  imports: [
    RouterModule,
    TranslocoPipe,
    LoaderButtonDirective,
    ReactiveFormsModule,
    FontAwesomeModule,
    ButtonComponent,
  ],
  standalone: true,
  templateUrl: './core-login.component.html',
  styleUrl: './core-login.component.css',
})
export class CoreLoginComponent {
  public loginForm: FormGroup;
  errorMessage: string = '';
  login = faUser;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    config: ConfigurationService,
    private translate: TranslateService
  ) {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('value');
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe({
        next: (res) => {
          if (res) {
            this.authService.storeToken(res);

            const returnUrl =
              this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigate([returnUrl]);
          } else {
            this.errorMessage = this.translate.translate(
              'login.errors.invalidUserName'
            );
          }
        },
        error: (e) => {
          if (e.error.statusCode === 400) {
            this.errorMessage = e.error.errors.generalErrors.reduce(
              (acc: string, curr: string) => acc + curr,
              ''
            );
          } else {
            this.errorMessage = this.translate.translate(
              'login.errors.invalidUserName'
            );
          }
        },
        complete: () => console.info('complete'),
      });
    }
  }
}
