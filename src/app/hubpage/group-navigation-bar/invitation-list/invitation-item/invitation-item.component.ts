import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../entities/user.model';
import {GroupRole} from '../../../../entities/groupRole.enum';
import {HttpInvitationService} from '../../../../services/httpServices/http-invitation.service';
import {InvitationResponse} from '../../../../entities/invitationResponse.model';

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
  constructor(public httpInvitationService: HttpInvitationService) { }

  ngOnInit(): void {
  }

  acceptInvitationClick(): void {
    this.httpInvitationService.answerInvitationByInvitationId(this.invitationResponse.id, true);
  }
  declineInvitationClick(): void {
    this.httpInvitationService.answerInvitationByInvitationId(this.invitationResponse.id, false);
  }
}
