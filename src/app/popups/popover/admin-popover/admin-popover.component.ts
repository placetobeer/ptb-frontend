import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {PopoverInterface} from "../popover.interface";
import {HttpMembershipService} from "../../../services/httpServices/http-membership.service";
import {PopupHelperService} from "../../popup-helper.service";
import {MembershipService} from "../../../services/membership.service";
import {ErrorService} from "../../../services/error.service";
import {PopoverComponent} from "../popover.component";
import {GroupsMembership} from "../../../entities/groupsMembership.model";

@Component({
  selector: 'app-admin-popover',
  templateUrl: './admin-popover.component.html'
})
export class AdminPopoverComponent implements OnInit, PopoverInterface {
  @Input() userMembership: GroupsMembership;
  @Input() popoverComponentRef: PopoverComponent;

  constructor(private httpMembershipService: HttpMembershipService, private popuphelperService: PopupHelperService,
              private membershipService: MembershipService, private errorService: ErrorService) { }

  ngOnInit(): void {
  }

  onKickMember(): void {
    this.popuphelperService.openConfirmation('Do you really want to kick the member?');
    this.popuphelperService.confirmationSubject.subscribe({
      next: confirmation => {
        if (confirmation){
          console.log(this.userMembership);
          this.deleteMembership();
        }
      }
    });
  }

  private deleteMembership(): void {
    console.log(this.userMembership.membershipId);
    this.httpMembershipService.deleteMembershipById(this.userMembership.membershipId)
      .subscribe(
        {
          next: response => {
            this.membershipService.removeMembershipFromList(this.userMembership);
            this.closePopover();
          },
          error: error => {
            this.errorService.handleError(error);
            this.closePopover();
          }
        }
      );
  }

  private closePopover(): void {
    this.popoverComponentRef.removeComponent();
  }
}
