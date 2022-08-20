import { Cart } from '../types/card.type';
import { CartProductsModel, Product } from '@shared';

export class CartModel implements Cart {
  id: number;
  products: CartProductsModel[];

  get cart(): Cart {
    return {
      id: this.id,
      products: this.products.map(product => {
        return {
          id: product.id,
          quantity: product.quantity,
        };
      }),
    };
  }

  constructor(cart: Cart, productsFull: Product[]) {
    this.id = cart.id;
    this.products = cart.products.map(product => {
      const productFull = productsFull.find(p => p.id === product.id);
      return new CartProductsModel(product, productFull!);
    });
  }

  updateQuantity(data?: { id: number; quantity: number }[]) {}

  static fromExistingCartModel(
    cartModel: CartModel,
    data?: { id: number; quantity: number }[]
  ): CartModel {
    const productsFull = cartModel.products.reduce(
      (accum: Product[], curr, index) => {
        accum.push(curr.productFull!);
        return accum;
      },
      []
    );
    const products = cartModel.cart.products.map(product => {
      const found = data?.find(d => d.id === product.id);
      return {
        id: product.id,
        quantity: found?.quantity ?? product.quantity,
      };
    });
    const cart = {
      id: cartModel.id,
      products,
    };
    return new this(cart, productsFull);
  }
}
