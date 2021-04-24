import {User} from '../entities/user.model';

export class Invitation {
  groupId: number;
  emitter: User;
  email: string;
  grantAdmin: boolean;

  constructor(groupId: number, emitter: User, email: string, grantAdmin: boolean) {
    this.groupId = groupId;
    this.email = email;
    this.grantAdmin = grantAdmin;
    this.emitter = emitter;
  }
}
