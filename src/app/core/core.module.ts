import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { ContainerComponent } from './container/container.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { TuiAlertModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiFactory } from './utils';
import { AuthService, CartAppService, CartService } from './services';

@NgModule({
  declarations: [ContainerComponent, HeaderComponent],
  imports: [
    CommonModule,
    OverlayModule,
    HttpClientModule,
    SpinnerComponent,
    RouterModule,
    TuiAvatarModule,
  ],
  exports: [
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: ApiFactory,
      deps: [AuthService, CartAppService, CartService],
      multi: true,
    },
  ],
})
export class CoreModule {}
