import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {InvitationService} from '../../../../core/services/invitation.service';
import {HttpGroupService} from "../../../../core/httpServices/http-group.service";
import {Router} from "@angular/router";
import {GroupService} from '../../../../core/services/group.service';
import {AccountService} from '../../../../core/services/account.service';
import {ErrorService} from '../../../../core/services/error.service';
import {MembershipService} from "../../../../core/services/membership.service";
import {RoutingService} from "../../../../core/services/routing.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-create-group-popup',
  templateUrl: './create-group-popup.component.html',
  styleUrls: ['./create-group-popup.component.css']
})
export class CreateGroupPopupComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) form: NgForm;
  showInvitations;
  newGroup;
  private subscriptions: Subscription[] = [];

  constructor(private accountService: AccountService, private httpGroupService: HttpGroupService,
              private errorService: ErrorService, private groupService: GroupService,
              private invitationService: InvitationService, private router: Router, private membershipService: MembershipService,
              private routingService: RoutingService) {}

  ngOnInit(): void {
    this.invitationService.clearGroupInvitations();
    this.showInvitations = true;
    this.newGroup = true;
  }

  onSubmit(): void {
    this.createGroup(this.accountService.user.id, this.form.value.groupName);
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
