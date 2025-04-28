export class Breadcrumb {
  label: string = '';
  params: string = '';
  path?: string;
  isActive: boolean = false;
  pathParamList?: Array<any> = [];
  queryParams?: any = undefined;
}

export class PathParams {
  path?: string;
  pathParamList?: Array<any> = [];
  queryParams?: any = undefined;
}
