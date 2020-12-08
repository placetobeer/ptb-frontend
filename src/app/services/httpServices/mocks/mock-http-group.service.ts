import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Group} from '../../../entities/group.model';

@Injectable({
  providedIn: 'root'
})
export class MockHttpGroupService {

  constructor() {
  }

  loadGroupsByUserId(userId: number): Observable<Group[]> {
    const mockGroups: Group[] = Array(new Group(1, 'Bratis Kartoffeln'), new Group(2, 'Hüttengaudis'), new Group(3, 'Coffin Dancer'));
    return new Observable(observer => observer.next(mockGroups));
  }
}
