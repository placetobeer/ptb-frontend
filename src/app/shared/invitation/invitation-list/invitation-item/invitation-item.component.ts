import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../core/model/entities/user.model';
import {GroupRole} from '../../../../core/model/entities/groupRole.enum';
import {HttpInvitationService} from '../../../../core/httpServices/http-invitation.service';
import {InvitationResponse} from '../../../../core/model/entities/invitationResponse.model';
import {UserInvitationService} from '../../../../core/services/user-invitation.service';

@Component({
  selector: 'app-invitation-item',
  templateUrl: './invitation-item.component.html',
  styleUrls: ['./invitation-item.component.css']
})
export class InvitationItemComponent implements OnInit {
  @Input() emitter: string;
  @Input() groupName: string;
  @Input() role: GroupRole;
  @Input() invitationResponse: InvitationResponse;
  constructor(private userInvitationService: UserInvitationService) { }

  ngOnInit(): void {
  }
  acceptInvitation(): void{
    this.userInvitationService.acceptInvitationClick(this.invitationResponse);
  }
  declineInvitation(): void{
    this.userInvitationService.declineInvitationClick(this.invitationResponse);
  }
}
