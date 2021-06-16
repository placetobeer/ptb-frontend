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
    const mockUserMembership: GroupsMembership[] = Array(
      new GroupsMembership(1, new User(1, 'Patrick', "patrick@mail.com", "", new Date()), GroupRole.OWNER),
      new GroupsMembership(2, new User(2, 'Bea', "bea@mail.com", "", new Date()), GroupRole.ADMIN),
      new GroupsMembership(3, new User(3, 'Lucie', "lucie@mail.com", "", new Date()), GroupRole.ADMIN),
      new GroupsMembership(4, new User(4, 'Katja', "katja@mail.com", "", new Date()), GroupRole.MEMBER),
      new GroupsMembership(5, new User(5, 'Tom', "tom@mail.com", "", new Date()), GroupRole.MEMBER));
    return new Observable(observer => observer.next(mockUserMembership));
  }
}
