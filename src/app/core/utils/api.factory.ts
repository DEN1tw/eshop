import { defer, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService, CartAppService, CartService } from '../services';

export function ApiFactory(
  authService: AuthService,
  cartAppService: CartAppService,
  cartService: CartService
): () => Observable<boolean> {
  return (): Observable<boolean> => {
    observeAuthAndFillCart(authService, cartAppService, cartService);
    return of(true);
  };
}

function observeAuthAndFillCart(
  authService: AuthService,
  cartAppService: CartAppService,
  cartService: CartService
): void {
  authService.user$
    .pipe(
      tap(_ => cartAppService.emptyCart()),
      switchMap(user => {
        return defer(() => {
          return !user ? of(null) : cartService.getCartByUser(user);
        });
      })
    )
    .subscribe({
      next: cart => {
        if (cart) {
          cartAppService.fillCart(cart);
        }
      },
    });
}
