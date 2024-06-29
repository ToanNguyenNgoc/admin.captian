export interface Response<T> {
  context: T;
  message: any;
  status: number
}
export interface ResponsePagination<T> {
  current_page: number;
  data: T;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
  currentPage:number;
  currentItemCount:number;

}
export interface PageRequest{
  page?:number;
  limit?:number
}

export * from './Discount'
export * from './Ticket'