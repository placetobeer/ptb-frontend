import { Injectable } from '@angular/core';
import {User} from '../model/entities/user.model';
import {GroupService} from "./group.service";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  user: User = new User(4, 'Patrick', 'patrick@mail.com', "", new Date());

  constructor() { }

  setNewUser(user: User): void{
    this.user = user;
  }
}
