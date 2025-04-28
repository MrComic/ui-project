export class PageQuery {
  page: number = 1;
  pageSize: number = 10;
  needTotalCount: boolean;
  sortBy: string = '';
  sortAscending: boolean = true;

  constructor() {
    this.needTotalCount = true;
  }
}
