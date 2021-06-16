import {GroupRole} from './groupRole.enum';

export class GroupInvitation {
  id: number;
  mail: string;
  recipientName: string;
  role: GroupRole;
  grantAdmin: boolean;
  constructor(id: number, mail: string, recipientName: string, role: GroupRole) {
    this.id = id;
    this.mail = mail;
    this.recipientName = recipientName;
    this.role = role;
    if (this.role === GroupRole.ADMIN){
      this.grantAdmin = true;
    }
  }
}
