import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CartAppService, CartService } from '@core';
import { CartModel, CartProductsModel } from '../../models';
import { Nullable } from '../../types';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent implements OnInit {
  cart: Nullable<CartModel> = null;

  constructor(
    private cartAppService: CartAppService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cartAppService.cart$.subscribe(res => {
      this.cart = res;
      this.cdr.markForCheck();
    });
  }

  handleProductQuantityChange(data: { id: number; quantity: number }): void {
    const cartModel = CartModel.fromExistingCartModel(this.cart!, [data]);
    this.cartService.updateCart(cartModel).subscribe(_ => {
      this.cartAppService.fillCart(cartModel);
    });
  }

  trackByFn(index: number, el: CartProductsModel): number {
    return el.id;
  }
}
