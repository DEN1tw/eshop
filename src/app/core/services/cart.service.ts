import { Injectable } from '@angular/core';
import { Observable, switchMap, zip } from 'rxjs';
import { Cart, CartModel, Nullable, UserModel } from '@shared';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private apiService: ApiService,
    private productsService: ProductsService
  ) {}

  getCartByUser(userModel: UserModel): Observable<CartModel> {
    let cart: Nullable<Cart> = null;
    return this.apiService.getCartById(userModel.id).pipe(
      switchMap(res => {
        cart = res;
        const productsReqs = cart.products.map(product => {
          return this.productsService.getProductById(product.id);
        });
        return zip(productsReqs);
      }),
      map(products => new CartModel(cart!, products))
    );
  }

  updateCart(cartModel: CartModel): Observable<Cart> {
    const { id, cart } = cartModel;
    return this.apiService.updateCartById(id, cart);
  }
}
