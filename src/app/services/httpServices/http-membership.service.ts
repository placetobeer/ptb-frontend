import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Group} from '../../entities/group.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {User} from '../../entities/user.model';
import {GroupsMembership} from '../../entities/groupsMembership.model';

@Injectable({
  providedIn: 'root'
})
export class HttpMembershipService {

  constructor(private http: HttpClient) { }

  loadUserMembershipsByGroupId(groupId): Observable<GroupsMembership[]> {
    return this.http.get<GroupsMembership[]>('http://localhost:8080/memberships', {params: new HttpParams().set('groupId', String(groupId))});
  }
}
