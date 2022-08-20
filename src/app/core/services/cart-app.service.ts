import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartModel, Nullable } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class CartAppService {
  private _cart$ = new BehaviorSubject<Nullable<CartModel>>(null);

  get cart$(): Observable<Nullable<CartModel>> {
    return this._cart$.asObservable();
  }

  emptyCart(): void {
    this.fillCart(null);
  }

  fillCart(data: Nullable<CartModel>): void {
    this._cart$.next(data);
  }
}
