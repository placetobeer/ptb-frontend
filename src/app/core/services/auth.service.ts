import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../model/entities/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "./account.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser = new BehaviorSubject<User>(null);

  public authenticate(id: number, email: string, name: string, token: string, expiresIn: number): void{
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user =  new User(id, name, email, token, expirationDate);
    this.currentUser.next(user);
    this.accountService.setNewUser(user);
    this.router.navigate(['/hubpage']);
    // localStorage.setItem('P2BToken', user.token);
    localStorage.setItem('P2BUserData', JSON.stringify(user));
  }

  public autoAuthenticate(): void{
    const userData: {
      id: string;
      name: string,
      email: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('P2BUserData'));
    /*if (localStorage.getItem('P2BToken') != null) {
      const token = localStorage.getItem('P2BToken');
    }*/
    if (!userData){
      return;
    }
    const loadedUser = new User(
      Number(userData.id),
      userData.name,
      userData.email,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.currentUser.next(loadedUser);
    }
  }

  constructor(private route: ActivatedRoute, private router: Router, private accountService: AccountService) { }


}
