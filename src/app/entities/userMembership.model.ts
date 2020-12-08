import {User} from './user.model';

export class UserMembership {
  user: User;
  role: string;

  constructor(user: User, role: string) {
    this.user = user;
    this.role = role;
  }
}
