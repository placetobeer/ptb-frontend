import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "../entities/user.model";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser = new BehaviorSubject<User>(null);

  public authenticate(user: User): void{
    this.currentUser.next(user);
    this.router.navigate(['/hubpage']);
  }

  constructor(private route: ActivatedRoute, private router: Router) { }


}
