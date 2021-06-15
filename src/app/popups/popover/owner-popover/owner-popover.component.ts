import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GroupsMembership} from "../../../entities/groupsMembership.model";
import {PopoverInterface} from "../popover.interface";
import {GroupRole} from "../../../entities/groupRole.enum";
import {PopoverComponent} from "../popover.component";
import {HttpMembershipService} from "../../../services/httpServices/http-membership.service";
import {MembershipService} from "../../../services/membership.service";
import {ErrorService} from "../../../services/error.service";
import {PopupHelperService} from "../../popup-helper.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-owner-popover',
  templateUrl: './owner-popover.component.html'
})
export class OwnerPopoverComponent implements OnInit, PopoverInterface, OnDestroy {
  @Input() data: any;
  @Input() popoverComponentRef: PopoverComponent;
  private subscriptions: Subscription[] = [];
  adminMessage;
  grantAdmin;

  constructor(private httpMembershipService: HttpMembershipService, private membershipService: MembershipService,
              private errorService: ErrorService, private popupHelperService: PopupHelperService) {}

  ngOnInit(): void {
    if (this.data.role === GroupRole.ADMIN) {
      this.adminMessage = "Revoke admin role";
      this.grantAdmin = false;
    }
    if (this.data.role === GroupRole.MEMBER) {
      this.adminMessage = "Grant admin role";
      this.grantAdmin = true;
    }
  }

  onKickMember(): void {
    this.kickMember(this.data);
  }

  onChangeAdminRole(): void {
    this.grantAdmin ? this.setRole(GroupRole.ADMIN) : this.setRole(GroupRole.MEMBER);
  }

  private setRole(role: GroupRole): void {
    const subscription = this.httpMembershipService.setRole(this.data.membershipId, JSON.stringify(role))
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
    this.subscriptions.push(subscription);
  }

  kickMember(userMembership: GroupsMembership): void{
    this.popupHelperService.openConfirmation('Do you really want to kick the member?');
    const subscription = this.popupHelperService.confirmationSubject.subscribe({
      next: confirmation => {
        if (confirmation){
          console.log(userMembership);
          this.deleteMembership(userMembership);
        }
      }
    });
    this.subscriptions.push(subscription);
  }

  deleteMembership(userMembership: GroupsMembership): void {
    const subscription = this.httpMembershipService.deleteMembershipById(userMembership.membershipId)
      .subscribe(
        {
          next: response => {
            this.membershipService.removeMembershipFromList(userMembership);
            this.popoverComponentRef.removeComponent();
          },
          error: error => {
            this.errorService.handleError(error);
            this.popoverComponentRef.removeComponent();
          }
        }
      );
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onCancel(): void {
    this.popoverComponentRef.removeComponent();
  }
}
