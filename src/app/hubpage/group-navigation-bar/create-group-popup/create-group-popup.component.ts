import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {InvitationService} from '../../../services/invitation.service';
import {HttpGroupService} from "../../../services/httpServices/http-group.service";
import {Router} from "@angular/router";
import {GroupService} from '../../../services/group.service';
import {AccountService} from '../../../services/account.service';
import {ErrorService} from '../../../services/error.service';
import {MembershipService} from "../../../services/membership.service";
import {RoutingService} from "../../../services/routing.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-create-group-popup',
  templateUrl: './create-group-popup.component.html',
  styleUrls: ['./create-group-popup.component.css']
})
export class CreateGroupPopupComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) form: NgForm;
  ownerId = this.accountService.user.id;
  showInvitations;
  private subscriptions: Subscription[] = [];

  constructor(private accountService: AccountService, private httpGroupService: HttpGroupService,
              private errorService: ErrorService, private groupService: GroupService,
              private invitationService: InvitationService, private router: Router, private membershipService: MembershipService,
              private routingService: RoutingService) {}

  ngOnInit(): void {
    this.invitationService.clearGroupInvitations();
    this.showInvitations = true;
  }

  onSubmit(): void {
    this.createGroup(this.ownerId, this.form.value.groupName);
    this.form.reset();
  }

  createGroup(currentUserId: number, groupName: string): void {
    const subscription = this.httpGroupService.createGroupByUserIdAndGroupName(currentUserId, groupName)
      .subscribe({
        next: group => {
          this.groupService.addGroup(group);
          this.groupService.selectGroup(group);
          this.membershipService.loadGroupMemberships();
          this.router.navigate(['/hubpage/' + group.id]);
          this.sendInvitationList(group.id);
        },
        error: error => {
          this.errorService.handleError(error);
        }
      });
    this.subscriptions.push(subscription);
  }

  sendInvitationList(groupId: number): void {
    this.invitationService.sendInvitationRequest(groupId);
    this.invitationService.removeAllInvitations();
  }

  onCancel(): void {
    this.form.reset();
    this.invitationService.removeAllInvitations();
    this.routingService.navigateToHubpage();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
