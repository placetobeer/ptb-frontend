import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Group} from '../../entities/group.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpGroupService{
  constructor(private http: HttpClient) {
  }

  loadGroupsByUserId(userId: number): Observable<Group[]> {
    return this.http.get<Group[]>('http://localhost:8080/groups', {params: new HttpParams().set('userId', String(userId))});
  }

  createGroupByUserIdAndGroupName(userId: number, groupName: string): Observable<Group> {
    return this.http.post<Group>('http://localhost:8080/groups', null,
      {params: new HttpParams().set('userId', String(userId)).set('groupName', String(groupName))});
  }

  setGroupNameByGroupId(groupId: number, groupName: string): Observable<any> {
    return this.http.put('http://localhost:8080/groups/' + groupId + '/name', '"' + groupName + '"', { headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=UTF-8',
      })});
  }

  deleteGroupByGroupId(groupId: number): Observable<any> {
    return this.http.delete('http://localhost:8080/groups/' + groupId);
  }

}
