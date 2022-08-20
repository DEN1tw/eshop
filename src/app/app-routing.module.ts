import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerComponent } from '@core';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then(m => m.LoginModule),
  },
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: 'products',
        loadChildren: () =>
          import('./modules/products/products.module').then(
            m => m.ProductsModule
          ),
      },
      {
        path: '**',
        redirectTo: 'products',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'products',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
