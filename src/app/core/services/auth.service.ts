import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AuthRole, Nullable, UserModel } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user$ = new BehaviorSubject<Nullable<UserModel>>(null);

  get user$(): Observable<Nullable<UserModel>> {
    return this._user$.asObservable();
  }

  get authedRole$(): Observable<AuthRole> {
    return this.user$.pipe(map(res => res?.role ?? null));
  }

  auth(userName: Nullable<UserModel>): void {
    this._user$.next(userName);
  }
}
