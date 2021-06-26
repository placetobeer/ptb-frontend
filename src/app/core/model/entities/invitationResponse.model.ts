import {User} from './user.model';
import {Group} from './group.model';
import {GroupRole} from './groupRole.enum';

export class InvitationResponse {
  id: number;
  group: Group;
  emitter: User;
  role: GroupRole;
  constructor(id: number, group: Group, emitter: User, role: GroupRole) {
    this.id = id;
    this.group = group;
    this.emitter = emitter;
    this.role = role;
  }
}
