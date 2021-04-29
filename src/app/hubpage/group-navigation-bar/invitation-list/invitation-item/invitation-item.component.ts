import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../entities/user.model';
import {GroupRole} from '../../../../entities/groupRole.enum';
import {HttpInvitationService} from '../../../../services/httpServices/http-invitation.service';
import {InvitationResponse} from '../../../../entities/invitationResponse.model';
import {UserInvitationService} from '../../../../services/user-invitation.service';

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
