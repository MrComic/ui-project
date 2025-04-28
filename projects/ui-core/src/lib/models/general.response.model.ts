export interface FastEndpointsResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  errors?: ErrorDetail[];
  pagination?: Pagination;
  timestamp?: string;
  path?: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface ErrorDetail {
  code: string;
  message: string;
  field?: string;
  generalErrors?: string[];
}
