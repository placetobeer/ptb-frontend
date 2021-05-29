import {Component, Input, OnInit} from '@angular/core';
import {InvitationRequest} from '../../../requests/invitation-request.model';
import {GroupRole} from '../../../entities/groupRole.enum';
import {User} from '../../../entities/user.model';
import {InvitationService} from "../../../services/invitation.service";
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  role = GroupRole;
  owner: User = this.accountService.user;

  constructor(public invitationService: InvitationService, private accountService: AccountService) { }

  ngOnInit(): void {
  }

}
