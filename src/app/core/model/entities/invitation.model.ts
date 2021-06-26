export class Invitation {
  email: string;
  grantAdmin: boolean;

  constructor(email: string, grantAdmin: boolean) {
    this.email = email;
    this.grantAdmin = grantAdmin;
  }
}
