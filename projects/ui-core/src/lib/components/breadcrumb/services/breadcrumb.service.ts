import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Breadcrumb } from '../Breadcrumb.model';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  public breadcrumbs: Array<Breadcrumb> = new Array<Breadcrumb>();
  private _breadcrumbs: Subject<Array<Breadcrumb>> = new Subject();
  readonly _breadcrumbs$: Observable<Array<Breadcrumb>> =
    this._breadcrumbs.asObservable();

  constructor(private router: Router) {}

  add(breadcrumbs: Array<Breadcrumb>) {
    this.breadcrumbs = breadcrumbs;
    this._breadcrumbs.next(breadcrumbs);
  }
  openPageWithBreadcrumb(index: number) {
    let navigationExtras!: any;
    if (this.breadcrumbs[index].queryParams) {
      navigationExtras = {
        queryParams: this.breadcrumbs[index].queryParams,
      };
    } else {
      navigationExtras = undefined;
    }
    if (
      this.breadcrumbs[index].pathParamList &&
      this.breadcrumbs[index].pathParamList.length > 0
    ) {
      if (navigationExtras) {
        this.router.navigate(
          this.breadcrumbs[index].pathParamList.filter((x) => x != ''),
          navigationExtras
        );
      } else {
        this.router.navigate(
          this.breadcrumbs[index].pathParamList.filter((x) => x != '')
        );
      }
    } else {
      if (navigationExtras) {
        this.router.navigate([this.breadcrumbs[index].path], navigationExtras);
      } else {
        this.router.navigate([this.breadcrumbs[index].path]);
      }
    }
  }
}
