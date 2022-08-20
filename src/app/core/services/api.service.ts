import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cart, IProductsRequest, Product, User } from '@shared';
import { map } from 'rxjs/operators';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${API_URL}/users`).pipe(
      map(users => {
        return users.map(user => {
          return {
            ...user,
            /*
              This is done like that because users' avatars aren't accessible from AWS
              <?xml version="1.0" encoding="UTF-8"?>
              <Error>
                <Code>PermanentRedirect</Code>
                <Message>The bucket you are attempting to access must be addressed using the specified endpoint. Please send all future requests to this endpoint.</Message>
                <Endpoint>uifaces.s3.amazonaws.com</Endpoint>
                <Bucket>uifaces</Bucket>
                <RequestId>8GHP2G2ZAMNMQNW2</RequestId>
                <HostId>ncuLPWDRShPkJQiQUmNEQL5youOQFVK2EJpT3Oq4vun/EIc4Dxn3EqGFevGpC0ivygNVcQ5hAcE=</HostId>
              </Error>
            */
            avatar:
              Math.random() > 0.5
                ? '/assets/cartoon-avatar.png'
                : '/assets/denis.jpeg',
          };
        });
      })
    );
  }

  getProducts(req: IProductsRequest | {} = {}): Observable<Product[]> {
    let params = new HttpParams({ fromObject: { ...req } });
    return this._http.get<Product[]>(`${API_URL}/products`, { params });
  }

  getProductById(id: number): Observable<Product> {
    return this._http.get<Product>(`${API_URL}/products/${id}`);
  }

  getCartById(id: number): Observable<Cart> {
    return this._http.get<Cart>(`${API_URL}/carts/${id}`);
  }

  updateCartById(id: number, cart: Cart): Observable<Cart> {
    return this._http.put<Cart>(`${API_URL}/carts/${id}`, cart);
  }
}
