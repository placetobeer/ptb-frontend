import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {GroupsMembership} from '../../../entities/groupsMembership.model';
import {User} from '../../../entities/user.model';

@Injectable({
  providedIn: 'root'
})
export class MockHttpMembershipService {

  constructor() {
  }

  loadUserMembershipsByGroupId(groupId: number): Observable<GroupsMembership[]> {
    const mockUserMembership: GroupsMembership[] = Array(new GroupsMembership(new User(1, 'Patrick'), 'OWNER'),
      new GroupsMembership(new User(2, 'Bea'), 'ADMIN'),
      new GroupsMembership(new User(3, 'Lucie'), 'ADMIN'),
      new GroupsMembership(new User(4, 'Katja'), 'MEMBER'),
      new GroupsMembership(new User(5, 'Tom'), 'MEMBER'));
    return new Observable(observer => observer.next(mockUserMembership));
  }
}
