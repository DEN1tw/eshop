import { Product } from '../types/product.type';

export class CartProductsModel {
  readonly id: number;
  quantity: number;
  readonly productFull?: Product;

  constructor(data: { id: number; quantity: number }, productFull: Product) {
    this.id = data.id;
    this.quantity = data.quantity;
    this.productFull = productFull;
  }
}
