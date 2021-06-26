import {User} from "./user.model";

export class UserResponse {
  id: number;
  name: string;
  email: string;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}
