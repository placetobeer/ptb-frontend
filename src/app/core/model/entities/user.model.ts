export class User {
  id: number;
  name: string;
  email: string;
  token: string;
  private tokenExpirationDate: Date;

  constructor(id: number, name: string, email: string, token: string, tokenExpirationDate: Date) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.token = token;
    this.tokenExpirationDate = tokenExpirationDate;
  }

  /*constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.email = "";
    this.token = "";
  }*/
}
