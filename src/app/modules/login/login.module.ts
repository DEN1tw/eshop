import { NgModule } from '@angular/core';
import { HomeLoginPageComponent } from './pages/home/home.component';
import { CommonModule } from '@angular/common';
import { LoginService } from './login.service';
import { LoginRoutingModule } from './login-routing.module';
import { HomeLoginComponent } from './components/home/home.component';
import { SharedModule } from '@shared';

@NgModule({
  declarations: [HomeLoginPageComponent, HomeLoginComponent],
  imports: [CommonModule, LoginRoutingModule, SharedModule],
  exports: [HomeLoginPageComponent],
  providers: [LoginService],
})
export class LoginModule {}
