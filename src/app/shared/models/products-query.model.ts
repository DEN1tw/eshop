import { ProductsQueryReason } from '../types';
import { IProductsQuery, IProductsRequest } from '../interfaces';

export class ProductsQueryModel implements IProductsQuery {
  searchText?: string;
  pageIndex: number;
  pageSize: number;
  reason: ProductsQueryReason;

  get productsRequest(): IProductsRequest {
    return {
      ...(this.searchText && { q: this.searchText }),
      ...(this.pageIndex && { _page: this.pageIndex }),
      ...(this.pageSize && { _limit: this.pageSize }),
    };
  }

  constructor(data: IProductsQuery) {
    this.searchText = data.searchText;
    this.pageIndex = data.pageIndex;
    this.pageSize = data.pageSize;
    this.reason = data.reason;
  }
}
