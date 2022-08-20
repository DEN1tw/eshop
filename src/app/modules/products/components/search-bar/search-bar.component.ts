import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Nullable } from '@shared';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarProductsComponent implements OnInit {
  searchText: string = ``;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.onSearchTextChanges();
  }

  redirectAndSearch(searchControl: Nullable<AbstractControl>): void {
    const searchQuery = searchControl?.value;
    if (searchQuery) {
      this.router.navigate([`products/search`], {
        queryParams: {
          q: searchQuery,
        },
      });
    } else {
      this.router.navigate([`products`]);
    }
  }

  private onSearchTextChanges(): void {
    this.route.queryParamMap.pipe(map(res => res.get('q'))).subscribe(res => {
      this.searchText = res ?? ``;
      this.cdr.markForCheck();
    });
  }
}
