import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageComponent } from './components/page/page.component';
import { DiscountPipe } from './pipes/discount.pipe';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartEmptyComponent } from './components/cart-empty/cart-empty.component';
import {
  TuiAvatarModule,
  TuiCarouselModule,
  TuiInputCountModule,
  TuiInputModule,
  TuiIslandModule,
  TuiPaginationModule,
} from '@taiga-ui/kit';
import { TuiMoneyModule } from '@taiga-ui/addon-commerce';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { TuiLetModule } from '@taiga-ui/cdk';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    PageComponent,
    CartComponent,
    CartItemComponent,
    CartEmptyComponent,
    DiscountPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiIslandModule,
    TuiMoneyModule,
    TuiInputCountModule,
    TuiLoaderModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    PageComponent,
    CartComponent,
    DiscountPipe,
    TuiButtonModule,
    TuiLetModule,
    TuiAvatarModule,
    TuiDataListModule,
    TuiTextfieldControllerModule,
    TuiInputModule,
    TuiIslandModule,
    TuiMoneyModule,
    TuiCarouselModule,
    TuiPaginationModule,
    TuiInputCountModule,
    TuiLoaderModule,
    ReactiveFormsModule,
    FormsModule,
    InfiniteScrollModule,
  ],
})
export class SharedModule {}
