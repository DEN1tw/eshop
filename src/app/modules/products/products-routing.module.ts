import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeProductsPageComponent } from './pages/home/home.component';
import { ContainerProductsComponent } from './components/container/container.component';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    component: ContainerProductsComponent,
    children: [
      {
        path: '',
        component: HomeProductsPageComponent,
        pathMatch: 'full',
      },
      {
        path: 'search',
        component: HomeProductsPageComponent,
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(PRODUCTS_ROUTES)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
