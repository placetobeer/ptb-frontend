import {Component, Input, OnInit} from '@angular/core';
import {PopoverInterface} from "../popover.interface";
import {HttpMembershipService} from "../../../services/httpServices/http-membership.service";
import {PopupHelperService} from "../../popup-helper.service";
import {MembershipService} from "../../../services/membership.service";
import {ErrorService} from "../../../services/error.service";
import {PopoverItem} from "../popover-item";
import {PopoverComponent} from "../popover.component";

@Component({
  selector: 'app-admin-popover',
  templateUrl: './admin-popover.component.html'
})
export class AdminPopoverComponent implements OnInit, PopoverInterface {
  @Input() userMembership: any;
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
          this.deleteMembership();
        }
      }
    });
    this.closePopover();
  }

  private deleteMembership(): void {
    this.httpMembershipService.deleteMembershipById(this.userMembership.membershipId)
      .subscribe(
        {
          next: response => {
            this.membershipService.removeMembershipFromList(this.userMembership);
          },
          error: error => {
            this.errorService.handleError(error);
          }
        }
      );
  }

  private closePopover(): void {
    this.popoverComponentRef.removeComponent();
  }
}
