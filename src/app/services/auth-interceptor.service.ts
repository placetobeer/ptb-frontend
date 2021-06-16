import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {exhaustMap, take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  // tslint:disable-next-line:typedef
  intercept(req: HttpRequest<any>, next: HttpHandler){
    return this.authService.currentUser.pipe(
      take(1),
      exhaustMap(currentUser => {
        if (!currentUser) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', currentUser.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
