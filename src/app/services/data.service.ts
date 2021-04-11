import {Injectable} from '@angular/core';
import {Group} from '../entities/group.model';
import {HttpGroupService} from './httpServices/http-group.service';
import {HttpMembershipService} from './httpServices/http-membership.service';
import {User} from '../entities/user.model';
import {PopupService} from '../popups/popup.service';
import {PopupHelperService} from '../popups/popup-helper.service';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userGroups: Group[];
  nonSelectedGroups: Group[];
  selectedGroup: Group;
  userMembershipMap = new Map();
  userId = 4;

  constructor(
    private httpGroupService: HttpGroupService,
    private httpMembershipService: HttpMembershipService,
    private popupHelperService: PopupHelperService) {
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
  handleError(error: HttpErrorResponse): void {
    this.popupHelperService.openError(error.message + '\n' + '\n' + error.error);
    console.error('There was an error!', error);
  }

  createGroup(currentUserId: number, groupName: string): void{
    this.httpGroupService.createGroupByUserIdAndGroupName(currentUserId, groupName)
      .subscribe({
        next: group => {
          this.userGroups.push(group);
          this.selectGroup(group);
        },
        error: error => {
          this.handleError(error);
        }
      });
  }

  setActiveGroupName(newGroupName: string): void {
    this.httpGroupService.setGroupNameByGroupId(this.selectedGroup.id, newGroupName)
      .subscribe({
        next: response => {
          this.selectedGroup.name = newGroupName;
        },
        error: error => {
          this.handleError(error);
        }
      });
  }
}
