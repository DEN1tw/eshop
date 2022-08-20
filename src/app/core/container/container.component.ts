import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './container.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerComponent {
  constructor() {}
}
