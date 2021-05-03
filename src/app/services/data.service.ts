import {Injectable} from '@angular/core';
import {Group} from '../entities/group.model';
import {HttpGroupService} from './httpServices/http-group.service';
import {HttpMembershipService} from './httpServices/http-membership.service';
import {PopupHelperService} from '../popups/popup-helper.service';
import {HttpErrorResponse} from '@angular/common/http';
import {GroupsMembership} from '../entities/groupsMembership.model';
import {GroupRole} from '../entities/groupRole.enum';
import {InvitationRequest} from '../requests/invitation-request.model';
import {InvitationService} from './invitation.service';
import {User} from '../entities/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userGroups: Group[];
  nonSelectedGroups: Group[];
  selectedGroup: Group;
  userMembershipMap: Map<number, GroupsMembership[]> = new Map();
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
    this.selectedGroup = group;
    this.nonSelectedGroups = this.userGroups.filter(obj => obj !== this.selectedGroup);
    if (this.selectedGroup !== null) {
      this.checkForMembershipFetch(group);
    }
  }

  checkForMembershipFetch(group: Group): void {
    if (!this.userMembershipMap.has(group.id)) {
      this.fetchMemberships(group);
    }
  }

  fetchMemberships(group: Group): void {
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

  handleError(error: HttpErrorResponse): void {
    this.popupHelperService.openError(error.message + '\n' + '\n' + error.error);
    console.error('There was an error!', error);
  }

  createGroup(currentUserId: number, groupName: string): void{
    // TODO wrap in Promise -> subscribe in create-group-popup to promise for invitationRequest; next: resolve; error: reject
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

  setActiveGroupName(group: Group, newGroupName: string): void {
    this.httpGroupService.setGroupNameByGroupId(group.id, newGroupName)
      .subscribe({
        next: response => {
          group.name = newGroupName;
        },
        error: error => {
          this.handleError(error);
        }
      });
  }

  deleteGroup(toDeleteGroup: Group): void {
    this.httpGroupService.deleteGroupByGroupId(toDeleteGroup.id)
      .subscribe({
        next: response => {
            this.userGroups = this.userGroups.filter(group => group !== toDeleteGroup);
            this.selectGroup(null);
        },
        error: error => {
          this.handleError(error);
        }
      });
  }

  getUsersMembershipOfSelectedGroup(): GroupsMembership {
    // todo this is a mock
    return new GroupsMembership(null, GroupRole.OWNER);
  }
}
