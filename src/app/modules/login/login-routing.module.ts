import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLoginPageComponent } from './pages/home/home.component';

export const LOGIN_ROUTES: Routes = [
  {
    path: '',
    component: HomeLoginPageComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(LOGIN_ROUTES)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
