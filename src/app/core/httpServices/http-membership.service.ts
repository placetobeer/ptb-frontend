import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Group} from '../model/entities/group.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../model/entities/user.model';
import {GroupsMembership} from '../model/entities/groupsMembership.model';
import {group} from "@angular/animations";
import {GroupRole} from "../model/entities/groupRole.enum";

@Injectable({
  providedIn: 'root'
})
export class HttpMembershipService {

  constructor(private http: HttpClient) { }

  loadUserMembershipsByGroupId(groupId): Observable<GroupsMembership[]> {
    return this.http.get<GroupsMembership[]>('/api/memberships',
      {params: new HttpParams().set('groupId', String(groupId))});
  }

  loadUserMembershipByUserIdAndGroupId(userId, groupId): Observable<GroupsMembership> {
    return this.http.get<GroupsMembership>('/api/memberships/' + userId,
      {params: new HttpParams().set('groupId', String(groupId))});
  }

  deleteMembershipById(membershipId): Observable<any> {
    return this.http.delete('/api/memberships/' + membershipId);
  }

  setRole(membershipId: number, role: string): Observable<any> {
    return this.http.put<GroupsMembership>('/api/memberships/' + membershipId + '/role', role,
      {headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
    })});
  }
}
