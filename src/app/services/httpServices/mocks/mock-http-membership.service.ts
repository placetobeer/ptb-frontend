import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserMembership} from '../../../entities/userMembership.model';
import {User} from '../../../entities/user.model';

@Injectable({
  providedIn: 'root'
})
export class MockHttpMembershipService {

  constructor() {
  }

  loadUserMembershipsByGroupId(groupId: number): Observable<UserMembership[]> {
    const mockUserMembership: UserMembership[] = Array(new UserMembership(new User(1, 'Patrick'), 'OWNER'),
      new UserMembership(new User(2, 'Bea'), 'ADMIN'),
      new UserMembership(new User(3, 'Lucie'), 'ADMIN'),
      new UserMembership(new User(4, 'Katja'), 'MEMBER'),
      new UserMembership(new User(5, 'Tom'), 'MEMBER'));
    return new Observable(observer => observer.next(mockUserMembership));
  }
}
