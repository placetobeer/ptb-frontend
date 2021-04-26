import {User} from './user.model';
import {GroupRole} from './groupRole.enum';

export class GroupsMembership {
  user: User;
  role: GroupRole;

  constructor(user: User, role: GroupRole) {
    this.user = user;
    this.role = role;
  }
}
