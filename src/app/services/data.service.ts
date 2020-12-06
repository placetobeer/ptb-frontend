import {Injectable} from '@angular/core';
import {Group} from '../entities/group.model';
import {HttpGroupServiceService} from './httpServices/http-group-service.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  userGroups: Group[];
  selectedGroup: Group;
  private userId = 1;

  constructor(private httGroupService: HttpGroupServiceService) {
    this.loadUserGroups();
  }

  loadUserGroups(): void {
    this.httGroupService.loadGroupsByUserId(this.userId).subscribe(groups => {
      this.userGroups = groups;
      this.selectedGroup = groups[0];
    });
  }

}
