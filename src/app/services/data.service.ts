import {Injectable} from '@angular/core';
import {Group} from '../entities/group.model';
import {HttpGroupService} from './httpServices/http-group.service';
import {HttpMembershipService} from './httpServices/http-membership.service';
import {PopupHelperService} from '../popups/popup-helper.service';
import {HttpErrorResponse} from '@angular/common/http';
import {GroupsMembership} from '../entities/groupsMembership.model';
import {GroupRole} from '../entities/groupRole.enum';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  userGroups: Group[];
  nonSelectedGroups: Group[];
  selectedGroup: Group;
  userId = 4;

  constructor(
    private httpGroupService: HttpGroupService,
    private httpMembershipService: HttpMembershipService,
    private popupHelperService: PopupHelperService) {
    // this.loadUserGroups();
  }

  handleError(error: HttpErrorResponse): void {
    this.popupHelperService.openError(error.message + '\n' + '\n' + error.error);
    console.error('There was an error!', error);
  }

  getUsersMembershipOfSelectedGroup(): GroupsMembership {
    // todo this is a mock
    return new GroupsMembership(null, GroupRole.OWNER);
  }
}
