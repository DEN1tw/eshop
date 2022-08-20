import { Injectable } from '@angular/core';
import { ApiService, AuthService } from '@core';
import { Observable } from 'rxjs';
import { AuthRole, Nullable, User } from '@shared';
import { UserModel } from '@shared';

@Injectable()
export class LoginService {
  get authedRole$(): Observable<AuthRole> {
    return this.authService.authedRole$;
  }

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  getUsers(): Observable<User[]> {
    return this.apiService.getUsers();
  }

  auth(user: Nullable<UserModel>): void {
    this.authService.auth(user);
  }
}
