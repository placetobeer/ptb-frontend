import { Component, OnInit } from '@angular/core';
import {InvitationResponse} from '../../../entities/invitationResponse.model';
import {UserInvitationService} from '../../../services/user-invitation.service';
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.component.html',
  styleUrls: ['./invitation-list.component.css']
})
export class InvitationListComponent implements OnInit {

  constructor(public userInvitationService: UserInvitationService, private accountService: AccountService) { }

  public pendingInvitations: InvitationResponse[];
  private currentUserId = this.accountService.user.id;

  ngOnInit(): void {}

}
