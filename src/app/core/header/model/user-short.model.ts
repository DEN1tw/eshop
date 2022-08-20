import { Nullable, User } from '@shared';

export class UserShortModel {
  firstName: Nullable<string>;
  lastName: Nullable<string>;
  avatar: Nullable<string>;

  constructor(user: Nullable<User>) {
    this.firstName = user?.name?.firstName ?? null;
    this.lastName = user?.name?.lastName ?? null;
    this.avatar = user?.avatar ?? null;
  }

  toString(): string {
    return `${this.firstName ?? ''} ${this.lastName ?? ''}`.trim();
  }
}
