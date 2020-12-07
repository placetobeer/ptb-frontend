import {Injectable} from '@angular/core';
import {Group} from '../entities/group.model';
import {HttpGroupService} from './httpServices/http-group.service';
import {HttpMembershipService} from './httpServices/http-membership.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  userGroups: Group[];
  nonSelectedGroups: Group[];
  selectedGroup: Group;
  userMembershipMap = new Map();
  private userId = 4;

  constructor(private httGroupService: HttpGroupService, private httpMembershipService: HttpMembershipService) {
    this.loadUserGroups();
  }

  loadUserGroups(): void {
    this.httGroupService.loadGroupsByUserId(this.userId).subscribe(groups => {
      this.userGroups = groups;

      this.nonSelectedGroups = groups.filter(group => group !== this.selectedGroup);
    });
  }

  selectGroup(group: Group): void {
    if (!this.userMembershipMap.has(group.id)){
      this.httpMembershipService.loadUserMembershipsByGroupId(group.id)
        .subscribe(userMemberhips => this.userMembershipMap.set(group.id, userMemberhips));
    }
    this.selectedGroup = group;
    this.nonSelectedGroups = this.userGroups.filter(obj => obj !== this.selectedGroup);
  }
}
