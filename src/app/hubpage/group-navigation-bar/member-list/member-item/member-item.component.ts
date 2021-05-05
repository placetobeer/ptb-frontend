import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {InvitationRequest} from '../../../../requests/invitation-request.model';
import {InvitationService} from '../../../../services/invitation.service';
import {GroupRole} from '../../../../entities/groupRole.enum';
import {Invitation} from "../../../../entities/invitation.model";

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.css']
})
export class MemberItemComponent implements OnInit {
  @Input() invitation: Invitation;
  role = GroupRole;

  constructor(private invitationService: InvitationService) { }

  ngOnInit(): void {
  }

  onDeleteInvitation(): void {
    this.invitationService.invitations = this.invitationService.invitations.filter(element => element !== this.invitation);
  }
}
