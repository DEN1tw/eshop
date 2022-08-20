import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Nullable, Product } from '@shared';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardProductComponent {
  @Input() product: Nullable<Product> = null;
  picsIndex = 0;

  constructor() {}

  trackByFn(index: number, el: string): number {
    return index;
  }
}
