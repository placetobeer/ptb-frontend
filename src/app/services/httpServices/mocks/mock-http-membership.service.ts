import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {GroupsMembership} from '../../../entities/groupsMembership.model';
import {User} from '../../../entities/user.model';
import {GroupRole} from '../../../entities/groupRole.enum';

@Injectable({
  providedIn: 'root'
})
export class MockHttpMembershipService {

  constructor() {
  }

  loadUserMembershipsByGroupId(groupId: number): Observable<GroupsMembership[]> {
    const mockUserMembership: GroupsMembership[] = Array(new GroupsMembership(new User(1, 'Patrick'), GroupRole.OWNER),
      new GroupsMembership(new User(2, 'Bea'), GroupRole.ADMIN),
      new GroupsMembership(new User(3, 'Lucie'), GroupRole.ADMIN),
      new GroupsMembership(new User(4, 'Katja'), GroupRole.MEMBER),
      new GroupsMembership(new User(5, 'Tom'), GroupRole.MEMBER));
    return new Observable(observer => observer.next(mockUserMembership));
  }
}
