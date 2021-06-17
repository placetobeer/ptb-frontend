import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Group} from '../../entities/group.model';
import {Observable} from 'rxjs';
import {InvitationRequest} from "../../requests/invitation-request.model";

@Injectable({
  providedIn: 'root'
})
export class HttpGroupService{
  constructor(private http: HttpClient) {
  }

  loadGroupsByUserId(userId: number): Observable<Group[]> {
    return this.http.get<Group[]>('/api/groups', {params: new HttpParams().set('userId', String(userId))});
  }

  createGroupByUserIdAndGroupName(userId: number, groupName: string): Observable<Group> {
    return this.http.post<Group>('/api/groups', groupName,
      { params: new HttpParams().set('userId', String(userId)), headers: new HttpHeaders({
          'Content-Type': 'application/json;charset=UTF-8',
        })});
  }

  setGroupNameByGroupId(groupId: number, groupName: string): Observable<any> {
    return this.http.put('/api/groups/' + groupId + '/name', groupName, { headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
      })});
  }

  deleteGroupByGroupId(groupId: number): Observable<any> {
    return this.http.delete('/api/groups/' + groupId);
  }
}
