import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Invitation} from '../../../../requests/invitation-request.model';
import {InvitationService} from '../../../../services/invitation.service';
import {GroupRole} from '../../../../entities/groupRole.enum';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.css']
})
export class MemberItemComponent implements OnInit {
  @Input() email: string;
  @Input() grantAdmin: boolean;
  @Input() index: number;
  role = GroupRole;

  constructor(private invitationService: InvitationService) { }

  ngOnInit(): void {
  }

  onDeleteInvitation(index: number): void {
    this.invitationService.invitations.splice(index, 1);
  }
}
