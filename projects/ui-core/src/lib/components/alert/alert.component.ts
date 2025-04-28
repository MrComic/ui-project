import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, timeout } from 'rxjs';
import { filter } from 'rxjs/internal/operators/filter';
import { AlertService } from './services/alert.service';
import { PreviousRouterService } from '../../services/util/previuos-router.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'core-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
//implements OnInit,OnDestroy
export class AlertComponent {
  messages: string[] = [];
  type?: string = '';
  subscription?: Subscription;
  className: string[] = [];
  timeout: any;
  constructor(
    private alertService: AlertService,
    private ref: ChangeDetectorRef,
    private router: Router,
    private previousRouterService: PreviousRouterService
  ) {}
  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.previousRouterService.getPreviousUrl() != this.router.url) {
          this.messages = [];
        }
      });
    this.subscription = this.alertService.alert$.subscribe((model) => {
      if (model) {
        if (this.messages == null) this.messages = [];
        this.messages = this.messages.concat(model.messages ?? []);
        this.type = model.type;
        this.className =
          this.type == 'info'
            ? ['bg-blue-50', 'text-blue-700', 'border-blue-600']
            : this.type == 'error' || this.type == 'danger'
            ? ['bg-red-50', 'text-red-700', 'border', 'border-red-600']
            : this.type == 'warning'
            ? ['bg-yellow-50', 'text-yellow-700', 'border-yellow-600']
            : this.type == 'success'
            ? ['bg-green-50', 'text-green-700', 'border-green-600']
            : [''];
        console.log(this.className);
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
          this.messages = [];
        }, 3000);

        this.ref.detectChanges();
      }
    });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  close() {
    this.messages = [];
    this.ref.detectChanges();
  }
}
