import { User, UserRole } from '@shared';

export class UserModel {
  id: number;
  name: {
    firstName: string;
    lastName: string;
  };
  phone: string;
  avatar: string;
  email: string;
  address: {
    country: string;
    city: string;
    zip: string;
    street: string;
  };
  orders: {
    id: number;
    products: {
      id: number;
      quantity: number;
    }[];
  };
  role: UserRole;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.phone = user.phone;
    this.avatar = user.avatar;
    this.email = user.email;
    this.address = user.address;
    this.orders = user.orders;
    this.role = user.role;
  }

  toString(): string {
    return `${this.name.firstName} ${this.name.lastName}`;
  }
}
