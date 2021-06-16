import { Injectable } from '@angular/core';
import {User} from '../entities/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  user: User = new User(4, 'Patrick', 'patrick.mail@gmail.com', "", new Date());

  constructor() { }

  setNewUser(user: User): void{
    this.user = user;
  }
}
