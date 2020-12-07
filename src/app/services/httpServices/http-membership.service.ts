import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Group} from '../../entities/group.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../../entities/user.model';
import {UserMembership} from '../../entities/userMembership.model';

@Injectable({
  providedIn: 'root'
})
export class HttpMembershipService {

  constructor(private http: HttpClient) { }

  loadUserMembershipsByGroupId(groupId): Observable<UserMembership[]> {
    return this.http.get<UserMembership[]>('http://localhost:8080/memberships', {params: new HttpParams().set('groupId', String(groupId))});
  }
}
