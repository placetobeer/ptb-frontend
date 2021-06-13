import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Group} from '../../entities/group.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../../entities/user.model';
import {GroupsMembership} from '../../entities/groupsMembership.model';
import {group} from "@angular/animations";
import {GroupRole} from "../../entities/groupRole.enum";

@Injectable({
  providedIn: 'root'
})
export class HttpMembershipService {

  constructor(private http: HttpClient) { }

  loadUserMembershipsByGroupId(groupId): Observable<GroupsMembership[]> {
    return this.http.get<GroupsMembership[]>('http://localhost:8080/memberships',
      {params: new HttpParams().set('groupId', String(groupId))});
  }

  loadUserMembershipByUserIdAndGroupId(userId, groupId): Observable<GroupsMembership> {
    return this.http.get<GroupsMembership>('http://localhost:8080/memberships/' + userId,
      {params: new HttpParams().set('groupId', String(groupId))});
  }

  deleteMembershipById(membershipId): Observable<any> {
    return this.http.delete('http://localhost:8080/memberships/' + membershipId);
  }

  setRole(membershipId: number, role: string): Observable<any> {
    return this.http.put<GroupsMembership>('http://localhost:8080/memberships/' + membershipId + '/role', role,
      {headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
    })});
  }
}
