import {Component, Input, OnInit} from '@angular/core';
import {GroupsMembership} from "../../../entities/groupsMembership.model";
import {PopoverInterface} from "../popover.interface";
import {GroupRole} from "../../../entities/groupRole.enum";
import {PopoverComponent} from "../popover.component";
import {HttpMembershipService} from "../../../services/httpServices/http-membership.service";
import {MembershipService} from "../../../services/membership.service";
import {ErrorService} from "../../../services/error.service";

@Component({
  selector: 'app-owner-popover',
  templateUrl: './owner-popover.component.html'
})
export class OwnerPopoverComponent implements OnInit, PopoverInterface {
  @Input() userMembership: GroupsMembership;
  @Input() popoverComponentRef: PopoverComponent;
  adminMessage;
  grantAdmin;

  constructor(private httpMembershipService: HttpMembershipService, private membershipService: MembershipService,
              private errorService: ErrorService) {}

  ngOnInit(): void {
    if (this.userMembership.role === GroupRole.ADMIN) {
      this.adminMessage = "Revoke admin role";
      this.grantAdmin = false;
    }
    if (this.userMembership.role === GroupRole.MEMBER) {
      this.adminMessage = "Grant admin role";
      this.grantAdmin = true;
    }
  }

  onKickMember(): void {
    this.popoverComponentRef.kickMember(this.userMembership);
  }

  onChangeAdminRole(): void {
    this.grantAdmin ? this.setRole(GroupRole.ADMIN) : this.setRole(GroupRole.MEMBER);
  }

  private setRole(role: GroupRole): void {
    this.httpMembershipService.setRole(this.userMembership.membershipId, JSON.stringify(role))
      .subscribe(
        {
          next: response => {
            this.membershipService.loadGroupMemberships();
            this.popoverComponentRef.removeComponent();
          },
          error: error => {
            this.errorService.handleError(error);
            this.popoverComponentRef.removeComponent();
          }
        }
      );
  }
}
