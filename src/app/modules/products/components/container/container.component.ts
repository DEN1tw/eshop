import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-products-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerProductsComponent {
  constructor() {}
}
