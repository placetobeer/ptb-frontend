import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Group} from '../../entities/group.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpGroupService {

  constructor(private http: HttpClient) {
  }

  loadGroupsByUserId(userId): Observable<Group[]> {
    return this.http.get<Group[]>('http://localhost:8080/groups', {params: new HttpParams().set('userId', String(userId))});
  }

}
