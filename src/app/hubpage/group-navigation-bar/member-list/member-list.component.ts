import {Component, Input, OnInit} from '@angular/core';
import {InvitationRequest} from '../../../requests/invitation-request.model';
import {GroupRole} from '../../../entities/groupRole.enum';
import {User} from '../../../entities/user.model';
import {InvitationService} from "../../../services/invitation.service";
import {AccountService} from "../../../services/account.service";
import {MembershipService} from "../../../services/membership.service";
import {GroupService} from "../../../services/group.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  role = GroupRole;
  owner: User = this.accountService.user;
  showInvitations;

  constructor(public invitationService: InvitationService, public membershipService: MembershipService,
              public groupService: GroupService, private accountService: AccountService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.showInvitations = data.showInvitations;
    });
    this.getOwner();
  }

  private getOwner(): void {}
}
