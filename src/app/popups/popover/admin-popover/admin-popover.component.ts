import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {PopoverInterface} from "../popover.interface";
import {HttpMembershipService} from "../../../services/httpServices/http-membership.service";
import {PopupHelperService} from "../../popup-helper.service";
import {MembershipService} from "../../../services/membership.service";
import {ErrorService} from "../../../services/error.service";
import {PopoverComponent} from "../popover.component";
import {GroupsMembership} from "../../../entities/groupsMembership.model";
import {Subscription} from "rxjs";
import {List} from "postcss/lib/list";

@Component({
  selector: 'app-admin-popover',
  templateUrl: './admin-popover.component.html'
})
export class AdminPopoverComponent implements OnInit, PopoverInterface, OnDestroy {
  @Input() userMembership: GroupsMembership;
  @Input() popoverComponentRef: PopoverComponent;
  private subscriptions: Subscription[] = [];

  constructor(private httpMembershipService: HttpMembershipService, private popupHelperService: PopupHelperService,
              private membershipService: MembershipService, private errorService: ErrorService) { }

  ngOnInit(): void {
  }

  onKickMember(): void {
    this.kickMember(this.userMembership);
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
