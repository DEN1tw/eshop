import { NgModule } from '@angular/core';
import { HomeProductsPageComponent } from './pages/home/home.component';
import { CommonModule } from '@angular/common';
import { ProductsService } from '@core';
import { ProductsRoutingModule } from './products-routing.module';
import { HomeProductsComponent } from './components/home/home.component';
import { ContainerProductsComponent } from './components/container/container.component';
import { SharedModule } from '@shared';
import { CardProductComponent } from './components/card/card.component';
import { SearchBarProductsComponent } from './components/search-bar/search-bar.component';

@NgModule({
  declarations: [
    HomeProductsPageComponent,
    HomeProductsComponent,
    ContainerProductsComponent,
    CardProductComponent,
    SearchBarProductsComponent,
  ],
  imports: [CommonModule, ProductsRoutingModule, SharedModule],
  exports: [HomeProductsPageComponent],
  providers: [ProductsService],
})
export class ProductsModule {}
