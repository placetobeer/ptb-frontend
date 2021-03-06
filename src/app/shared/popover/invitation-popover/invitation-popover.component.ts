import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {GroupsMembership} from '../../../core/model/entities/groupsMembership.model';
import {PopoverComponent} from '../popover.component';
import {Subscription} from 'rxjs';
import {HttpMembershipService} from '../../../core/httpServices/http-membership.service';
import {PopupHelperService} from '../../../core/services/popup-helper.service';
import {MembershipService} from '../../../core/services/membership.service';
import {ErrorService} from '../../../core/services/error.service';
import {UserInvitationService} from "../../../core/services/user-invitation.service";
import {InvitationResponse} from "../../../core/model/entities/invitationResponse.model";
import {Group} from "../../../core/model/entities/group.model";
import {User} from "../../../core/model/entities/user.model";
import {GroupRole} from "../../../core/model/entities/groupRole.enum";
import {InvitationService} from "../../../core/services/invitation.service";
import {GroupService} from "../../../core/services/group.service";
import {HttpInvitationService} from "../../../core/httpServices/http-invitation.service";

@Component({
  selector: 'app-invitation-popover',
  templateUrl: './invitation-popover.component.html',
  styleUrls: ['./invitation-popover.component.css']
})
export class InvitationPopoverComponent implements OnInit, OnDestroy {
  @Input() data: any;
  @Input() popoverComponentRef: PopoverComponent;
  invitationId: number;
  private subscriptions: Subscription[] = [];

  constructor(private httpInvitationService: HttpInvitationService, private popupHelperService: PopupHelperService,
              private membershipService: MembershipService, private errorService: ErrorService,
              private userInvitationService: UserInvitationService, private invitationService: InvitationService,
              private groupService: GroupService) { }

  ngOnInit(): void {
  }

  onRevokeInvitation(): void{
    this.invitationId = this.data;
    this.popupHelperService.openConfirmation('Do you really want to delete this Invitation?');
    const subscription = this.popupHelperService.confirmationSubject.subscribe({
      next: confirmation => {
        if (confirmation){
          console.log(this.invitationId);
          this.deleteInvitation(this.invitationId);
        }
      }
    });
    this.subscriptions.push(subscription);
  }

  deleteInvitation(invitationId: number): void {
    console.log(invitationId);
    const subscription = this.httpInvitationService.answerInvitationByInvitationId(
      this.invitationId, false).subscribe(
      {
        next: response => {
          this.invitationService.loadGroupInvitations(this.groupService.currentGroup.id);
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
