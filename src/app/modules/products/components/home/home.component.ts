import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ProductsService } from '@core';
import {
  BaseComponent,
  IProductsQuery,
  Product,
  ProductsQueryModel,
  ProductsQueryReason,
} from '@shared';
import { BehaviorSubject, concatMap, skip, tap } from 'rxjs';
import { SpinnerService } from '@core';
import { filter, map, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';

const PAGE_INITIAL_INDEX = 1;
const PAGE_SIZE = 30;
const INFINITE_SCROLL_THROTTLE_TIME = 7e2;
const INFINITE_SCROLL_DISTANCE = 1;

@Component({
  selector: 'app-products-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeProductsComponent extends BaseComponent implements OnInit {
  products: Product[] = [];
  throttle = INFINITE_SCROLL_THROTTLE_TIME;
  scrollDistance = INFINITE_SCROLL_DISTANCE;
  private _query$ = new BehaviorSubject<IProductsQuery>({
    pageIndex: PAGE_INITIAL_INDEX,
    pageSize: PAGE_SIZE,
    searchText: ``,
    reason: `TEXT`,
  });
  private _query = this._query$.asObservable();
  private scroll$ = new BehaviorSubject<IInfiniteScrollEvent>({
    currentScrollPosition: 0,
  });

  constructor(
    private productsService: ProductsService,
    private spinnerService: SpinnerService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit() {
    this.onSearchTextChanges();
    this.onScrollChanges();
    this.observeQueryAndFillProducts();
  }

  onScrollDown(event: IInfiniteScrollEvent): void {
    this.scroll$.next(event);
  }

  trackByFn(index: number, el: Product): number {
    return el.id;
  }

  private observeQueryAndFillProducts(): void {
    this._query
      .pipe(
        tap(_ => {
          this.spinnerService.show();
        }),
        concatMap(res => {
          return this.productsService.getProducts(
            new ProductsQueryModel(res).productsRequest
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: products => {
          this.fillProducts(products);
        },
      });
  }

  private onSearchTextChanges(): void {
    this.route.queryParamMap
      .pipe(
        map(queryParamMap => queryParamMap.get('q') ?? ``),
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        this._query$.next(
          new ProductsQueryModel({
            pageIndex: PAGE_INITIAL_INDEX,
            pageSize: PAGE_SIZE,
            searchText: res,
            reason: `TEXT`,
          })
        );
      });
  }

  private onScrollChanges(): void {
    this.scroll$
      .pipe(
        skip(1),
        filter(_ => !(this.products.length % PAGE_SIZE)),
        takeUntil(this.destroy$)
      )
      .subscribe(_ => {
        this._query$.next(
          new ProductsQueryModel({
            ...this._query$.getValue(),
            pageIndex: this._query$.getValue().pageIndex + 1,
            reason: `SCROLL`,
          })
        );
      });
  }

  private fillProducts(products: Product[]): void {
    const scrolled = this.isScrolled(this._query$.getValue().reason);
    if (scrolled) {
      this.products.push(...products);
    } else {
      this.products = products;
    }
    this.spinnerService.hide();
    this.cdr.markForCheck();
  }

  private isScrolled(reason: ProductsQueryReason): boolean {
    return reason === 'SCROLL';
  }
}
