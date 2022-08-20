import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'appDiscount' })
export class DiscountPipe implements PipeTransform {
  constructor() {}

  transform(value: string | number): string {
    return `-${value}%`;
  }
}
