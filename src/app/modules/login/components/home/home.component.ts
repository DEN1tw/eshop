import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  TUI_DEFAULT_MATCHER,
  tuiReplayedValueChangesFrom,
} from '@taiga-ui/cdk';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';
import { filter, map, takeUntil } from 'rxjs/operators';
import { BaseComponent, Nullable, User } from '@shared';
import { UserModel } from '@shared';
import { LoginService } from '../../login.service';
import { Observable } from 'rxjs';
import { SpinnerService } from '@core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeLoginComponent extends BaseComponent implements OnInit {
  @ViewChild(`avatarTpl`) private readonly avatar: PolymorpheusContent = ``;
  allUsers: UserModel[] = [];

  private readonly user = new FormControl(``);
  readonly userForm = new FormGroup({
    user: this.user,
  });

  selectedUser: Nullable<User> = null;

  readonly users$: Observable<User[]> = tuiReplayedValueChangesFrom<string>(
    this.user
  ).pipe(
    map(value => {
      const filtered = this.allUsers?.filter(user =>
        TUI_DEFAULT_MATCHER(user, value)
      );

      if (
        filtered.length !== 1 ||
        String(filtered[0]).toLowerCase() !== value.toLowerCase()
      ) {
        return filtered;
      }

      this.onSelected(filtered[0]);

      return [];
    })
  );

  get isUserSelected(): boolean {
    return (
      this.selectedUser !== null &&
      this.selectedUser.toString().toLowerCase() ===
        this.userForm.get(`user`)!.value?.toLowerCase()
    );
  }

  get content(): PolymorpheusContent {
    return this.avatar && this.isUserSelected ? this.avatar : ``;
  }

  constructor(
    private loginService: LoginService,
    private spinnerService: SpinnerService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.fillAllUsers();
    this.handleAuth();
  }

  fillAllUsers(): void {
    this.spinnerService.show();
    this.loginService.getUsers().subscribe({
      next: res => {
        this.allUsers = res.map(user => new UserModel(user));
      },
      complete: () => {
        this.spinnerService.hide();
        this.cdr.markForCheck();
      },
    });
  }

  handleAuth(): void {
    this.loginService.authedRole$
      .pipe(
        filter(res => !!res),
        map(_ => this.router.navigate(['/products'])),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  onSelected(user: User): void {
    this.selectedUser = user;
  }

  auth(): void {
    this.loginService.auth(this.selectedUser);
  }

  trackByFn(index: number, el: User): number {
    return el.id;
  }
}
