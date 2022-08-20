import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { CartAppService, CartService } from '@core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { BaseComponent } from '../base/base.component';
import { CartProductsModel } from '../../models';
import { Nullable } from '../../types';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent
  extends BaseComponent
  implements OnInit, OnChanges
{
  _product: Nullable<CartProductsModel> = null;

  @Input()
  set product(val: Nullable<CartProductsModel>) {
    this.quantityCtrl.setValue(val!.quantity, { emitEvent: false });
    this._product = val;
  }

  get product(): Nullable<CartProductsModel> {
    return this._product;
  }

  @Output() quantityChange: EventEmitter<{ id: number; quantity: number }> =
    new EventEmitter();

  quantityCtrl: FormControl = new FormControl(0);
  isLoading: boolean = false;

  constructor(
    private cartAppService: CartAppService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.quantityCtrl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(value => {
        this.isLoading = true;
        this.cdr.markForCheck();
        this.quantityChange.emit({
          id: this.product!.id,
          quantity: value,
        });
      });
  }

  ngOnChanges(change: SimpleChanges) {
    const currentValue = change['product'].currentValue;
    const previousValue = change['product'].previousValue;
    if (previousValue && currentValue !== previousValue) {
      this.isLoading = false;
      this.cdr.markForCheck();
    }
  }

  add(): void {
    this.quantityCtrl.setValue(1);
  }
}
