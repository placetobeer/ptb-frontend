export class Invitation {
  groupId: number;
  email: string;
  role: string;

  constructor(groupId: number, email: string, role: string) {
    this.groupId = groupId;
    this.email = email;
    this.role = role;
  }
}
