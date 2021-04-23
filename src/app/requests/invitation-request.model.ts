import {User} from '../entities/user.model';

export class Invitation {
  groupId: number;
  emitter: User;
  email: string;
  role: string;

  constructor(groupId: number, emitter: User, email: string, role: string) {
    this.groupId = groupId;
    this.email = email;
    this.role = role;
    this.emitter = emitter;
  }
}
