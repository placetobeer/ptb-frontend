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

  constructor(private httpGroupService: HttpGroupService, private httpMembershipService: HttpMembershipService) {
    this.loadUserGroups();
  }

  loadUserGroups(): void {
    this.httpGroupService.loadGroupsByUserId(this.userId).subscribe({
      next: groups => {
        this.userGroups = groups;

        this.nonSelectedGroups = groups.filter(group => group !== this.selectedGroup);
      },
      error: error => {
        this.handleError(error);
      }
    });
  }

  selectGroup(group: Group): void {
    if (!this.userMembershipMap.has(group.id)) {
      this.httpMembershipService.loadUserMembershipsByGroupId(group.id)
        .subscribe({
          next: userMemberships => {
            this.userMembershipMap.set(group.id, userMemberships);
          },
          error: error => {
            this.handleError(error);
          }
        });
    }
    this.selectedGroup = group;
    this.nonSelectedGroups = this.userGroups.filter(obj => obj !== this.selectedGroup);
  }

  handleError(error: any): void {
    console.error('There was an error!', error);
  }
}
