import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '@core';
import { BaseComponent, Nullable } from '@shared';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserShortModel } from './model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends BaseComponent {
  get user$(): Observable<Nullable<UserShortModel>> {
    return this.authService.user$.pipe(
      map(user => {
        return user ? new UserShortModel(user) : null;
      })
    );
  }

  constructor(private authService: AuthService) {
    super();
  }

  logout(): void {
    this.authService.auth(null);
  }
}
