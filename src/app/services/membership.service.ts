import { Injectable } from '@angular/core';
import {Group} from "../entities/group.model";
import {HttpMembershipService} from "./httpServices/http-membership.service";
import {ErrorService} from "./error.service";
import {GroupsMembership} from "../entities/groupsMembership.model";

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  userMembershipMap: Map<number, GroupsMembership[]> = new Map();

  constructor(private httpMembershipService: HttpMembershipService, private errorService: ErrorService) { }

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
          this.errorService.handleError(error);
        }
      });
  }
}
