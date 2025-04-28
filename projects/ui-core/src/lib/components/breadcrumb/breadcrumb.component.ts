import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  NavigationExtras,
  RouterModule,
} from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { filter, distinctUntilChanged, map } from 'rxjs/operators';
import { Breadcrumb, PathParams } from './Breadcrumb.model';
import { CloneService } from '../../services/util/clone.service';
import { isNullOrWhiteSpace } from '../../services/util/helper';
import { BreadcrumbService } from './services/breadcrumb.service';
import { ThemeService } from '../../services/theme/theme.service';
import { BreadcrumbItemComponent } from './breadcrumb-item/breadcrumb-item.component';
import { CommonModule } from '@angular/common';
import { TranslateService } from '../../translate/services/translate.service';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [BreadcrumbItemComponent, RouterModule, CommonModule],
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent implements OnInit {
  title: string = '';
  breadcrumbs: Breadcrumb[] = [];
  @Input() color: string = '';
  isDarkMode: boolean = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cloneService: CloneService,
    private themeService: ThemeService,
    private translate: TranslateService,
    private breadcrumbService: BreadcrumbService
  ) {
    this.themeService.$theme.subscribe((d) => {
      this.isDarkMode = d == 'dark';
    });
  }

  private prepareBreadCrumbs() {
    this.breadcrumbs = [];
    let root: ActivatedRoute = this.activatedRoute.root;
    this.getBreadcrumbs(root);
    this.breadcrumbs[this.breadcrumbs.length - 1].isActive = true;
    this.title = this.breadcrumbs[this.breadcrumbs.length - 1].label;
    this.breadcrumbService.add(this.breadcrumbs);
  }

  ngOnInit() {
    this.prepareBreadCrumbs();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe((event) => {
        this.prepareBreadCrumbs();
      });
  }

  getBreadcrumbs(
    route: ActivatedRoute,
    pathParams: PathParams = { path: '', pathParamList: [] }
  ): void {
    const copy = this.cloneService.deepClone(pathParams);
    const result = this.getPathAndParams(route, copy);
    if (route.routeConfig && !route?.routeConfig?.data?.['label']) {
      if (route.firstChild) {
        if (route?.firstChild?.routeConfig?.data)
          return this.getBreadcrumbs(route.firstChild, result);
        else if (route.firstChild.firstChild)
          return this.getBreadcrumbs(route.firstChild.firstChild, result);
      } else {
        return;
      }
    }

    const label = route.routeConfig
      ? this.translate.translate(
          `Routing.${route?.routeConfig?.data?.['label']}`
        )
      : '';
    const breadcrumb = new Breadcrumb();
    breadcrumb.label = label;
    breadcrumb.isActive = false;

    breadcrumb.path = result.path;
    breadcrumb.queryParams = result.queryParams;
    breadcrumb.pathParamList = result.pathParamList;

    if (breadcrumb.path != '/') {
      this.breadcrumbs.push(breadcrumb);
      if (route.firstChild) {
        if (route?.firstChild?.routeConfig?.data)
          return this.getBreadcrumbs(route.firstChild, result);
        else if (route.firstChild.firstChild)
          return this.getBreadcrumbs(route.firstChild.firstChild, result);
      }
    }
  }

  findPath(route: ActivatedRoute): string {
    if (route) {
      let path = route?.snapshot?.url.map((segment) => segment.path).join('/');
      let url = '/' + (route.routeConfig ? path : '');
      if (route.parent) return this.findPath(route.parent) + url;
      return '';
    } else {
      return '';
    }
  }

  openPageWithBreadcrumb(index: number) {
    let navigationExtras: NavigationExtras = {};
    if (this.breadcrumbs[index].queryParams) {
      navigationExtras = {
        queryParams: this.breadcrumbs[index].queryParams,
      };
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

  getPathAndParams(route: ActivatedRoute, pathParams: any): PathParams {
    let thisPath: string = '';
    thisPath = this.findPath(route).replace(pathParams.path, '');
    let matParams: any = route?.snapshot?.url.map(
      (segment) => segment.parameters
    );
    if (
      matParams?.length > 0 &&
      Object.getOwnPropertyNames(matParams[0]).length > 0
    ) {
      if (pathParams.pathParamList.length == 0) {
        pathParams.path.split('/').forEach((element: any) => {
          if (!isNullOrWhiteSpace(element))
            pathParams.pathParamList.push(element);
        });
      }
      thisPath.split('/').forEach((element) => {
        if (!isNullOrWhiteSpace(element))
          pathParams.pathParamList.push(element);
      });
      let params: any = {};
      for (let item of matParams) {
        for (let prop of Object.keys(item)) {
          params[prop] = item[prop];
        }
      }
      pathParams.pathParamList.push(params);
    }

    if (route?.snapshot?.queryParamMap.keys.length > 0) {
      pathParams.queryParams = {};
      for (let key of route?.snapshot?.queryParamMap.keys) {
        pathParams.queryParams[key] = route?.snapshot?.queryParamMap.get(key);
      }
    }
    pathParams.path += thisPath;
    return pathParams;
  }
}
