import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InvitationResponse} from '../../entities/invitationResponse.model';
import {InvitationRequest} from '../../requests/invitation-request.model';
import {Invitation} from "../../entities/invitation.model";
import {GroupInvitation} from "../../entities/groupInvitation.model";

@Injectable({
  providedIn: 'root'
})
export class HttpInvitationService {

  constructor(private http: HttpClient) {
  }

  loadInvitationsByUserId(userId: number): Observable<InvitationResponse[]>{
    return this.http.get<InvitationResponse[]>('http://localhost:8080/invitations/byUser',
      {params: new HttpParams().set('userId', String(userId))});
  }

  answerInvitationByInvitationId(invitationId: number, decision: boolean): Observable<any>{
    return this.http.put('http://localhost:8080/invitations/' + invitationId + '/answer', decision, { headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
      })});
  }

  sendInvitations(invitationRequest: InvitationRequest): Observable<any> {
    return this.http.post('http://localhost:8080/invitations', invitationRequest, { headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
      })});
  }

  loadInvitationsByGroupId(groupId: number): Observable<GroupInvitation[]>{
    return this.http.get<GroupInvitation[]>('http://localhost:8080/invitations/byGroup',
      {params: new HttpParams().set('groupId', String(groupId))});
  }
}
