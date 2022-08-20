import { Injectable } from '@angular/core';
import { ApiService } from '@core';
import { Observable } from 'rxjs';
import { Product, IProductsRequest } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiService: ApiService) {}

  getProducts(req?: IProductsRequest): Observable<Product[]> {
    return this.apiService.getProducts(req);
  }

  getProductById(id: number): Observable<Product> {
    return this.apiService.getProductById(id);
  }
}
