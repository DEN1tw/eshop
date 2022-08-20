import { ProductsQueryReason } from '../types';
import { IProductsRequest } from './products-request.interface';

export interface IProductsQuery {
  searchText?: string;
  pageIndex: number;
  pageSize: number;
  reason: ProductsQueryReason;
  readonly productsRequest?: IProductsRequest;
}
