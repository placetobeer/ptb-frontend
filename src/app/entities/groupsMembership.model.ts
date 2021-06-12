import {User} from './user.model';
import {GroupRole} from './groupRole.enum';

export class GroupsMembership {
  membershipId: number;
  user: User;
  role: GroupRole;

  constructor(id: number, user: User, role: GroupRole) {
    this.membershipId = id;
    this.user = user;
    this.role = role;
  }
}
