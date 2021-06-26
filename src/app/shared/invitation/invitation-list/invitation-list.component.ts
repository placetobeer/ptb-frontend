import { Component, OnInit } from '@angular/core';
import {InvitationResponse} from '../../../core/model/entities/invitationResponse.model';
import {UserInvitationService} from '../../../core/services/user-invitation.service';

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.component.html',
  styleUrls: ['./invitation-list.component.css']
})
export class InvitationListComponent implements OnInit {

  constructor(public userInvitationService: UserInvitationService) { }

  public pendingInvitations: InvitationResponse[];

  ngOnInit(): void {}

}
