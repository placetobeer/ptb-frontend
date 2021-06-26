import {User} from '../entities/user.model';
import {Invitation} from '../entities/invitation.model';

export class InvitationRequest {
  groupId: number;
  emitter: User;
  invitationList: Invitation[] = [];

  constructor(groupId: number, emitter: User, invitationList: Invitation[]) {
    this.groupId = groupId;
    this.emitter = emitter;
    this.invitationList = invitationList;
  }
}
