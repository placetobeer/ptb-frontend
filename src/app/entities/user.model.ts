export class User {
  id: number;
  name: string;
  email: string;
  private token: string;
  private tokenExpirationDate: Date;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.email = "";
    this.token = "";
    this.tokenExpirationDate = new Date();
  }

  /*constructor(id: number, name: string, email: email) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.token = "";
  }*/
}
