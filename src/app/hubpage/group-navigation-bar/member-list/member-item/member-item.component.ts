import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {InvitationRequest} from '../../../../requests/invitation-request.model';
import {InvitationService} from '../../../../services/invitation.service';
import {GroupRole} from '../../../../entities/groupRole.enum';
import {Invitation} from "../../../../entities/invitation.model";
import {GroupsMembership} from "../../../../entities/groupsMembership.model";
import {MembershipService} from "../../../../services/membership.service";

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.css']
})
export class MemberItemComponent implements OnInit {
  @Input() invitation: Invitation;
  @Input() membership: GroupsMembership;
  @Input() showInvitations;
  role = GroupRole;
  userNotOwner;

  constructor(public invitationService: InvitationService, public membershipService: MembershipService) { }

  ngOnInit(): void {
    this.userNotOwner = this.membership.role !== GroupRole.OWNER;
  }

  onDeleteInvitation(): void {
    this.invitationService.removeInvitation(this.invitation);
  }
}
