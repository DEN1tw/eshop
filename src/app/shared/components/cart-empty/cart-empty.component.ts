import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cart-empty',
  templateUrl: './cart-empty.component.html',
  styleUrls: ['./cart-empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartEmptyComponent {
  constructor() {}
}
